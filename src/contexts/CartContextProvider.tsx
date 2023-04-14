import React, { createContext, useCallback, useState } from "react";
import { IProduct } from "../typings/product";
import { ICartContext } from "../typings/cart";

export const CartContext = createContext<ICartContext>({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateItemInCart: () => {},
  isProductInCart: () => undefined,
});

const CartContextProvider = (props: React.PropsWithChildren) => {
  // initialize your cart items state with an empty array
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  // create a function to add an item to the cart
  const addItemToCart = useCallback((item: IProduct) => {
    setCartItems((prevItems) => [...prevItems, item]);
  }, []);

  // create a function to update an item in the cart
  const updateItemInCart = useCallback(
    (item: IProduct) => {
      // check if the item is already in the cart and update item
      const isItemInCart = cartItems.some(
        (cartItem) => cartItem.id === item.id
      );
      if (isItemInCart) {
        const updatedCartItems = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) return item;
          return cartItem;
        });
        setCartItems(updatedCartItems);
      }
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

  const isProductInCart = useCallback(
    (item: IProduct) => cartItems.find((cartItem) => cartItem.id === item.id),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemInCart,
        isProductInCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
