import { T } from "../libs/types/common";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  Product,
  ProductInput,
  ProductInquiry,
  ProducUpdatetInput,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { ProductStatus } from "../libs/enums/product.enum";
import { Types } from "mongoose";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  /** SPA */
  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    const match: T = { productStatus: ProductStatus.PROCESS };
    if (inquiry.productCategory) {
      match.productCategory = inquiry.productCategory;
    }
    if (inquiry.search) {
      match.search = inquiry.search;
    }

    const sort: T =
      inquiry.order === "productPrice"
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };

    const result = await this.productModel.aggregate([
      { $match: match },
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

    let result = await this.productModel
      .findOne({
        _id: productId,
        productStatus: ProductStatus.PROCESS,
      })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    // TODO: If authenticated users => first => view log creation;

    return result.toObject() as Product;
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
