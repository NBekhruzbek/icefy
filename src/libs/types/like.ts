import { Types } from "mongoose";
import { LikeGroup } from "../enums/like.enum";

export interface Like {
  _id: Types.ObjectId;
  likeGroup: LikeGroup;
  memberId: Types.ObjectId;
  likeRefId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface LikeInput {
  memberId: Types.ObjectId;
  likeRefId: Types.ObjectId;
  likeGroup: LikeGroup;
}

export interface LikeToggleResult {
  success: boolean;
  data?: Like;
  action: "created" | "deleted";
}
