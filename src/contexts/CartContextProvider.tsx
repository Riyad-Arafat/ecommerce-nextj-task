import React, { createContext, useCallback, useState } from "react";
import { IProduct } from "../typings/product";
import { ICartContext } from "../typings/cart";

export const CartContext = createContext<ICartContext>({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
});

const CartContextProvider = (props: React.PropsWithChildren) => {
  // initialize your cart items state with an empty array
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  // create a function to add an item to the cart
  const addItemToCart = useCallback(
    (item: IProduct) => {
      setCartItems([...cartItems, item]);
    },
    [cartItems]
  );

  // create a function to remove an item from the cart
  const removeItemFromCart = useCallback(
    (item: IProduct) => {
      const filteredItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(filteredItems);
    },
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
