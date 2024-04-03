import { Category } from "./category";

export interface Product {
  id?: number;
  name: string;
  image?: string;
  imageFile?: File | null | string;
  priceLast?: number;
  categoryId: number;
  category?: Category;
}
