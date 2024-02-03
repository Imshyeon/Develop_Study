import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  onAddCart: () => {},
  onDeleteCart: () => {},
  cartItems: [],
});
