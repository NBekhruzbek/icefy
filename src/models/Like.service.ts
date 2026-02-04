import Errors from "../libs/Errors";
import { Like, LikeInput, LikeToggleResult } from "../libs/types/like";
import LikeModel from "../schema/Like.model";
import { HttpCode, Message } from "../libs/Errors";
import ProductModel from "../schema/Product.model";
import ProductService from "./Product.service";

class LikeService {
  private readonly likeModel;
  private readonly productService;

  constructor() {
    this.likeModel = LikeModel;
    this.productService = new ProductService();
  }

  public async likeToggle(input: LikeInput): Promise<LikeToggleResult> {
    try {
      const deletedLike = await this.likeModel
        .findOneAndDelete({
          memberId: input.memberId,
          likeRefId: input.likeRefId,
          likeGroup: input.likeGroup,
        })
        .exec();
      if (deletedLike) {
        await this.productService.productStatsEditor({
          _id: input.likeRefId,
          targetKey: "productLikes",
          modifier: -1,
        });
        return {
          success: true,
          action: "deleted",
        };
      } else {
        const createdLike = await this.likeModel.create(input);
        if (!createdLike)
          throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

        await this.productService.productStatsEditor({
          _id: input.likeRefId,
          targetKey: "productLikes",
          modifier: +1,
        });

        return {
          success: true,
          data: createdLike.toObject(),
          action: "created",
        };
      }
    } catch (err) {
      console.log("ERROR, model:deleteMemberLike:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    }
  }
}

export default LikeService;
