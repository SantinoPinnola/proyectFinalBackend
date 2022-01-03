import { Schema } from 'mongoose';

export type productReference = Schema.Types.ObjectId | string;

export interface CartI {
  _id: string;
  userId: productReference;
  products: ProductCart[];
  street : string;
  streetNumber : Number;
  codPostal : Number;
  piso? : string;
  state : string;
}

export interface ProductCart {
  _id: string;
  amount: number;
  price: number;
}

export interface CartBaseClass {
  get(id: string): Promise<CartI>;
  createCart(userId: string): Promise<CartI>;
  addProduct(cartId: string, product: ProductCart): Promise<CartI>;
  deleteProduct(cartId: string, product: ProductCart): Promise<CartI>;
}