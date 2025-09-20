"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GetUserToken } from "../GetUserToken";
import { getcartdata } from "../CardAction/CardAction";
import { CartData } from "../interface/cart.interface";

interface CartContextType {
  cartItemsCount: number;
  setCartItemsCount: Dispatch<SetStateAction<number>>;
  cartId: string;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cartId: "",
  setCartItemsCount: () => {},
  cartItemsCount: 0,
  refreshCart: async () => {},
});

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartId, setcartId] = useState("0");
  const [cartItemsCount, setCartItemsCount] = useState(0);

  async function getcart() {
    const token = await GetUserToken();
    console.log(token);
    if (token) {
      console.log("getting cart");
      const data: CartData = await getcartdata();
      const sum = data.data.products.reduce(
        (total, item) => (total += item.count),
        0
      );
      setCartItemsCount(sum);
      setcartId(data.cartId);
    }
  }

  const refreshCart = async () => {
    await getcart();
  };

  useEffect(() => {
    console.log("Start cart provider");
    getcart();
  }, []); 

  return (
    <CartContext.Provider
      value={{ 
        cartItemsCount, 
        setCartItemsCount, 
        cartId,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
