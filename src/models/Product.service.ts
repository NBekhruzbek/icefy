import Errors, { HttpCode, Message } from "../libs/Errors";
import { Product, ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  /** SPA */

  /** BSSR */
  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      const { productPrice, discountPercent, discountPrice } = input;
      if (discountPercent) {
        input.priceAfterDiscount =
          productPrice - (productPrice * discountPercent) / 100;
      } else if (discountPrice) {
        input.priceAfterDiscount = productPrice - discountPrice;
      }
      const result = await this.productModel.create(input);
      return result.toObject() as Product;
    } catch (err) {
      console.log("ERROR, model: createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ProductService;
