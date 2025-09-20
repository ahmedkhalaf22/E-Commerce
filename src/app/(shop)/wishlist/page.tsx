"use client";
import {

  removeProductFromWishlist,
  getWishlistData,
} from "@/WishlistAction/WishlistAction";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { WishlistContext } from "@/providers/WishlistProvider";
import Link from "next/link";
import { ProductProduct } from "@/interface/wishlist.interface";





export default function Wishlist() {
  const { setWishlistItemsCount, refreshWishlist } =
    useContext(WishlistContext);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlist, setWishlist] = useState<ProductProduct[]>();

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    setWishlistLoading(true);
    try {
      const data = await getWishlistData();
      console.log("wishlist", data.data);
      setWishlist(data.data);
    } catch (err) {
      console.log(err);
      console.log("Wishlist not available");
      setWishlist(undefined);
    }
    setWishlistLoading(false);
  }

  async function removeProduct(id: string) {
    const data = await removeProductFromWishlist(id);

    if (data.status == "success") {
      toast.success("Product removed from wishlist", {
        position: "top-center",
      });

      await getAllData()


      setWishlistItemsCount(data?.data?.products?.length);

      await refreshWishlist();
    }
  }



  if (wishlistLoading) {
    return (
      <div className='fixed top-0 left-0 w-full h-full bg-gray-400 flex items-center justify-center '>
      <span className="loader"></span>

    </div>
    );
  }

  return (
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {!wishlist || wishlist.length == 0 ? (
        <div className="text-center py-12">
          
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Your wishlist is empty
          </h2>
          
          <Link href="/">
            <Button className="bg-main hover:bg-main/90 cursor-pointer">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {wishlist.length} item in your wishlist

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item: ProductProduct,index) => (
              <div
                key={item._id||index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/products/${item._id}`}>
                  <div className="relative">
                    {item.imageCover && item.imageCover.trim() !== "" ? (
          <Image
            src={item.imageCover}
            alt={item.title || "Product image"}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
        ) : (
          <Image
            src="/placeholder.png"        
            alt="Placeholder"
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
        )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeProduct(item._id);
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                    >
                      <i className="fa-solid fa-heart text-red-500 cursor-pointer"></i>
                    </button>
                  </div>
                </Link>

                <div className="p-4">
                  <h3 className="font-bold  mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-black-600 text-sm mb-2">
                    {item.category?.name}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-main">
                      {item.price} EGP
                    </span>
                    <div className="flex items-center">
                      <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                      <span className="text-sm">{item.ratingsAverage}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/products/${item._id}`} className="flex-1">
                      <Button variant="outline" className="w-full cursor-pointer">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/products/${item._id}`} className="flex-1">
                      <Button className="w-full bg-main hover:bg-main/90 cursor-pointer">
                        Add to Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
