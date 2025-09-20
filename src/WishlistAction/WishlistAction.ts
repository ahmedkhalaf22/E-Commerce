"use server";

import { GetUserToken } from "@/GetUserToken";
import { WishlistData } from "@/interface/wishlist.interface";

export async function getWishlistData() {
  const token = await GetUserToken();
  if (!token) {
    throw new Error("INVALID TOKEN");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      headers: {
        token: token,
      },
    }
  );
  const data: WishlistData = await res.json();
  return data;
}

export async function AddProductToWishlist(id: string) {
  const token: any = await GetUserToken();
  if (!token) {
    throw new Error("INVALID TOKEN");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "post",
      body: JSON.stringify({
        productId: id,
      }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function removeProductFromWishlist(id: string) {
  const token: any = await GetUserToken();
  if (!token) {
    throw new Error("INVALID TOKEN");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
    {
      method: "delete",
      headers: {
        token: token,
      },
    }
  );
  const data = await res.json();
  return data;
}
