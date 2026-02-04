import { Request, Response } from "express";
import Errors, { HttpCode } from "../libs/Errors";
import { T } from "../libs/types/common";
import LikeService from "../models/Like.service";
import { ExtendedRequest } from "../libs/types/member";
import { LikeInput } from "../libs/types/like";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { LikeGroup } from "../libs/enums/like.enum";

const likeService = new LikeService();

const likeController: T = {};

likeController.likeToggle = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("likeToggle");
    const memberId = shapeIntoMongooseObjectId(req.member?._id);
    const productId = shapeIntoMongooseObjectId(req.params.id);
    const input: LikeInput = {
      memberId: memberId,
      likeRefId: productId,
      likeGroup: LikeGroup.PRODUCT,
    };

    const result = await likeService.likeToggle(input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("ERROR, likeToggle", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default likeController;
