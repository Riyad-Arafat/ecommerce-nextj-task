/* eslint-disable no-unused-vars */
import { IProduct } from "./product";

export type ICartContext = {
  cartItems: IProduct[];
  addItemToCart: (item: IProduct) => void;
  removeItemFromCart: (item: IProduct) => void;
};
