"use client";

import { AddProductToWishlist, removeProductFromWishlist } from "@/WishlistAction/WishlistAction";
import { WishlistContext } from "@/providers/WishlistProvider";
import { useContext, useState, useEffect } from "react";
import { toast } from "sonner";


export default function WishlistBtn({ id }: { id: string }) {
  const { setWishlistItemsCount, refreshWishlist, wishlist } = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [_, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [id, wishlist,checkWishlistStatus]);

  async function checkWishlistStatus() {
    try {
      const isProductInWishlist = wishlist.some(
        (item) => item._id === id
      );
      setIsInWishlist(isProductInWishlist);
    } catch {
      setIsInWishlist(false);
    }
  }

  async function toggleWishlist(id: string) {
    setLoading(true);
    try {
      if (isInWishlist) {
        const data = await removeProductFromWishlist(id);
        if (data.status == "success") {
          toast.success("Product removed from wishlist", { 
            position: "top-center", 
            duration: 2000 
          });
          setIsInWishlist(false);
          console.log(data.data);
          setWishlistItemsCount(data.data.length);
          
          await refreshWishlist();
        }
      } else {
        const data = await AddProductToWishlist(id);
        console.log(data);
        if (data.status == "success") {
          toast.success("Product added to wishlist", { 
            position: "top-center", 
            duration: 2000 
          });
          setIsInWishlist(true);
          await refreshWishlist();
        } else {
          toast.error("Failed to add to wishlist", { position: "top-center" });
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Please login to use wishlist", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id);
      }}
      
      className={`p-2 rounded-full transition-colors duration-200 bg-white shadow-md ${
        isInWishlist 
          ? "text-red-500 hover:text-red-600" 
          : "text-gray-400 hover:text-red-500"
      } `}
    >
      <i className={`fa-solid fa-heart ${isInWishlist ? "text-red-500" : ""}`}></i>
    </button>
  );
}
