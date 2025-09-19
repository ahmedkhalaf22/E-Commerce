"use client";

import { AddProductToCart } from "@/CardAction/CardAction";
import { Button } from "@/components/ui/button";
import { CountContext } from "@/CountProvider";
import { useContext } from "react";
import { toast } from "sonner";

export default function AddCartBtn({ id }: { id: string }) {
  const { setCartItemsCount } = useContext(CountContext);
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
      } else {
        toast.error("wrong id", { position: "top-center" });
      }
    } catch (err) {
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
