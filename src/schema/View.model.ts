import mongoose, { Schema } from "mongoose";
import { ViewGroup } from "../libs/enums/view.enum";
// Schema first & Code first
const viewSchema = new Schema(
  {
    viewGroup: {
      type: String,
      enum: ViewGroup,
      required: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    viewRefId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }, // updatedAt, createdAt
);

export default mongoose.model("View", viewSchema);
