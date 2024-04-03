import { Market } from "./market";
import { Product } from "./product";

export interface ProductShoppingList {
  id?: number;
  quantity: number;
  priceUnit: number;
  addInCart: boolean;
  productId: number;
  product?: Product;
}

export interface ShoppingList {
  id?: number;
  date?: Date;
  total: number;
  products: ProductShoppingList[];
  marketId: number;
  market?: Market;
}
