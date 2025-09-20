"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GetUserToken } from "../GetUserToken";
import { getWishlistData } from "../WishlistAction/WishlistAction";
import { ProductProduct, WishlistData } from "../interface/wishlist.interface";

interface WishlistContextType {
  wishlistItemsCount: number;
  setWishlistItemsCount:  Dispatch<SetStateAction<number>>;
  wishlist: ProductProduct[];
  refreshWishlist: ()=> Promise<void>;
}

export const WishlistContext =  createContext<WishlistContextType>({
  setWishlistItemsCount: () => {},
  wishlistItemsCount: 0,
  wishlist: [],
  refreshWishlist: async () => {},
});

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0);
  const [wishlist, setWishlist] = useState<ProductProduct[]>([]);

  async function getWishlist() {
    const token = await GetUserToken();
    if (token) {
      try {
        console.log("getting wishlist");
        const data: WishlistData = await getWishlistData();

        console.log(data);
        setWishlistItemsCount(data.count);
        setWishlist(data.data);
      } catch (err) {
        console.log(err);
        console.log("Wishlist not available");
        setWishlistItemsCount(0);
        setWishlist([]);
      }
    }
  }

  const refreshWishlist = async () => {
    await getWishlist();
  };

  useEffect(() => {
    console.log("Start wishlist provider");
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ 
        wishlistItemsCount,
        setWishlistItemsCount,
        wishlist,
        refreshWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
