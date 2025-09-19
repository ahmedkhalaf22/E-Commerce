"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GetUserToken } from "./GetUserToken";
import { getcartdata } from "./CardAction/CardAction";
import { CartData } from "./interface/cart.interface";
import { cart } from "@/interface/cart.interface";

interface CountContextType {
  cartItemsCount: number;
  setCartItemsCount: Dispatch<SetStateAction<number>>;
  cartId: string;
}

export const CountContext = createContext<CountContextType>({
  cartId: "",
  setCartItemsCount: () => {},
  cartItemsCount: 0,
});

export default function CountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartId, setcartId] = useState("0");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  async function getcart() {
    const token: any = await GetUserToken();
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
  useEffect(() => {
    console.log("Start cart provider");
    getcart();
  }, [cartItemsCount]);

  return (
    <CountContext.Provider
      value={{ cartItemsCount, setCartItemsCount, cartId }}
    >
      {children}
    </CountContext.Provider>
  );
}
