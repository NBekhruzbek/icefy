import { T } from "../libs/types/common";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  Product,
  ProductInput,
  ProductInquiry,
  ProducUpdatetInput,
  StatisticModifier,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { ProductStatus } from "../libs/enums/product.enum";
import { Types } from "mongoose";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";
import ViewService from "./View.service";
import LikeModel from "../schema/Like.model";

class ProductService {
  private readonly productModel;
  private readonly likeModel;
  public viewService;

  constructor() {
    this.productModel = ProductModel;
    this.likeModel = LikeModel;
    this.viewService = new ViewService();
  }

  /** SPA */
  public async getProducts(
    memberId: Types.ObjectId,
    inquiry: ProductInquiry,
  ): Promise<Product[]> {
    const match: T = { productStatus: ProductStatus.PROCESS };
    if (inquiry.productCategory) {
      match.productCategory = inquiry.productCategory;
    }
    if (inquiry.productFlavor) {
      match.productFlavor = inquiry.productFlavor;
    }
    if (inquiry.search) {
      match.productName = { $regex: new RegExp(inquiry.search, "i") };
    }

    const sort: T =
      inquiry.order === "productPrice"
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };

    const result = await this.productModel.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "likes", // likes collection nomi
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$likeRefId", "$$productId"] },
                    { $eq: ["$memberId", { $toObjectId: memberId }] },
                  ],
                },
              },
            },
          ],
          as: "memberLike",
        },
      },
      {
        $addFields: {
          isLiked: { $gt: [{ $size: "$memberLike" }, 0] },
        },
      },
      {
        $project: {
          memberLike: 0, // bu fieldni natijada ko'rsatmaslik
        },
      },
      { $sort: sort },
      { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
      { $limit: inquiry.limit * 1 }, // 1ga ko'paytirish orqali raqamga aylantirib olamiz;
    ]);
    return result;
  }

  public async getProduct(
    memberId: Types.ObjectId,
    id: string,
  ): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);
    let isLiked: boolean = false;

    let result = await this.productModel
      .findOne({
        _id: productId,
        productStatus: ProductStatus.PROCESS,
      })
      .lean()
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    // If authenticated users => first => view log creation;
    if (memberId) {
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: productId,
        viewGroup: ViewGroup.PRODUCT,
      };

      const existView = await this.viewService.checkViewExistence(input);

      console.log("exist", existView);
      if (!existView) {
        // Insert New View
        await this.viewService.insertMemberView(input);

        // Increase Counts
        result = await this.productModel
          .findByIdAndUpdate(
            productId,
            { $inc: { productViews: +1 } },
            { new: true },
          )
          .exec();
      }

      let liked = await this.likeModel
        .findOne({
          memberId: memberId,
          likeRefId: productId,
        })
        .lean<Product>()
        .exec();
      if (liked) isLiked = true;
      if (!liked) isLiked = false;
    }

    const finalResult = {
      ...result,
      isLiked: isLiked,
    };

    return finalResult as Product;
  }

  public async productStatsEditor(input: StatisticModifier): Promise<Product> {
    const { _id, targetKey, modifier } = input;
    const result = await this.productModel
      .findByIdAndUpdate(
        { _id: _id },
        { $inc: { [targetKey]: modifier } },
        { new: true },
      )
      .exec();
    return result?.toObject() as Product;
  }

  /** BSSR */
  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if (!result.length)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result as unknown as Product[];
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      const { productPrice, discountPercent } = input;
      if (discountPercent !== undefined) {
        if (discountPercent < 0 || discountPercent > 100)
          throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        input.priceAfterDiscount =
          productPrice - (productPrice * discountPercent) / 100;
      }
      const result = await this.productModel.create(input);
      return result.toObject() as Product;
    } catch (err) {
      console.log("ERROR, model: createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProducUpdatetInput,
  ): Promise<Product> {
    id = shapeIntoMongooseObjectId(id);

    let price: number;
    if (input.productPrice === undefined) {
      const product = await this.productModel.findById(id).exec();
      if (!product)
        throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
      price = product.productPrice;
    } else {
      price = input.productPrice;
    }

    if (input.discountPercent !== undefined) {
      if (input.discountPercent < 0 || input.discountPercent > 100)
        throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
      input.priceAfterDiscount = price - (price * input.discountPercent) / 100;
    }

    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result.toObject() as Product;
  }
}

export default ProductService;
