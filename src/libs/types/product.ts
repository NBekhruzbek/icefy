import { ObjectId } from "mongoose";
import {
  ProductCategory,
  ProductFlavor,
  ProductSize,
  ProductStatus,
} from "../enums/product.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productName: string;
  productDesc?: string;
  productCategory: ProductCategory;
  productFlavor: ProductFlavor;
  productSize: ProductSize;
  productPrice: number;
  discountPercent?: number;
  discountPrice?: number;
  priceAfterDiscount?: number;
  productLeftCount: number;
  productImages?: string[];
  productViews: number;
}

export interface ProductInput {
  productStatus?: ProductStatus;
  productName: string;
  productDesc?: string;
  productCategory?: ProductCategory;
  productFlavor?: ProductFlavor;
  productSize?: ProductSize;
  productPrice: number;
  discountPercent?: number;
  discountPrice?: number;
  priceAfterDiscount?: number;
  productLeftCount: number;
  productImages?: string[];
}
