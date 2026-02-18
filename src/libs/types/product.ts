import { Types, ObjectId } from "mongoose";
import {
  ProductCategory,
  ProductFlavor,
  ProductSize,
  ProductStatus,
} from "../enums/product.enum";

export interface Product {
  _id: Types.ObjectId;
  productStatus: ProductStatus;
  productName: string;
  productDesc?: string;
  productCategory: ProductCategory;
  productFlavor: ProductFlavor;
  productSize: ProductSize;
  productPrice: number;
  discountPercent?: number;
  priceAfterDiscount?: number;
  productLeftCount: number;
  productImages?: string[];
  isLiked?: boolean;
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
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
  priceAfterDiscount?: number;
  productLeftCount: number;
  productImages?: string[];
}

export interface ProducUpdatetInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productName?: string;
  productDesc?: string;
  productCategory?: ProductCategory;
  productFlavor?: ProductFlavor;
  productSize?: ProductSize;
  productPrice?: number;
  discountPercent?: number;
  priceAfterDiscount?: number;
  productLeftCount?: number;
  productImages?: string[];
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCategory?: ProductCategory;
  productFlavor?: ProductFlavor;
  search?: string;
}

export interface LikedProductInquiry {
  page: number;
  limit: number;
}

export interface StatisticModifier {
  _id: Types.ObjectId;
  targetKey: string;
  modifier: number;
}
