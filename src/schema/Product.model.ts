import mongoose, { Schema } from "mongoose";
import {
  ProductCategory,
  ProductFlavor,
  ProductSize,
  ProductStatus,
} from "../libs/enums/product.enum";

const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PAUSE,
    },

    productName: {
      type: String,
      required: true,
    },

    productDesc: {
      type: String,
      required: true,
    },

    productCategory: {
      type: String,
      enum: ProductCategory,
      required: true,
    },

    productFlavor: {
      type: String,
      enum: ProductFlavor,
      required: true,
    },

    productSize: {
      type: String,
      enum: ProductSize,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    discountPercent: {
      type: Number,
    },

    discountPrice: {
      type: Number,
    },

    productLeftCount: {
      type: Number,
      required: true,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }, // createdAt, updatedAt
);

productSchema.index(
  {
    productName: 1,
    productSize: 1,
    productCategory: 1,
    productFlavor: 1,
  },
  { unique: true },
);

export default mongoose.model("Product", productSchema);
