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
    },

    productCategory: {
      type: String,
      enum: ProductCategory,
    },

    productFlavor: {
      type: String,
      enum: ProductFlavor,
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
      min: 0,
      max: 100,
    },

    discountPrice: {
      type: Number,
    },

    priceAfterDiscount: {
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
