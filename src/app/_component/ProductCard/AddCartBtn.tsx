"use client";

import { AddProductToCart } from "@/CardAction/CardAction";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/providers/CartProvider";
import { useContext } from "react";
import { toast } from "sonner";

export default function AddCartBtn({ id }: { id: string }) {
  const { setCartItemsCount, refreshCart } = useContext(CartContext);
  async function addproduct(id: string) {
    try {
      const data = await AddProductToCart(id);
      if (data.status == "success") {
        toast.success(data.message, { position: "top-center", duration: 2000 });
        const sum = data.data.products.reduce(
          (total: number, item: { count: number }) => (total += item.count),
          0
        );
        setCartItemsCount(sum);
        
        await refreshCart();
      } else {
        toast.error("wrong id", { position: "top-center" });
      }
    } catch  {
      toast.error("Can't  add product to cart without login", {
        position: "top-center",
      });
    }
  }

  return (
    <Button
      onClick={() => addproduct(id)}
      className="cursor-pointer bg-main w-full rounded-3xl"
    >
      add to cart
    </Button>
  );
}
