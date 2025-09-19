"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountContext } from "@/CountProvider";
import { cashPaymentActions } from "@/PaymentActions/Paymentcash";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";
import { toast } from "sonner";

export default function Payment() {
  const { cartId, setCartItemsCount } = useContext(CountContext);
  const details = useRef("");
  const phone = useRef("");
  const city = useRef("");
  const router = useRouter();

  async function cashpayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };

    console.log(cartId, "cartID");

    try {
      const data = await cashPaymentActions(cartId, values);
      toast.success("payment success");
      // window.location.reload()
      setCartItemsCount(0);
      setTimeout(() => {
        router.push("/allorders");
      }, 2000);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="mb-10 text-center text-3xl font-bold ">payment</h1>

      <div>
        <label htmlFor="details">details</label>
        <Input ref={details} className="mb-4" type="text" id="details" />

        <label htmlFor="phone">phone</label>
        <Input ref={phone} className="mb-4" type="tel" id="phone" />

        <label htmlFor="city">city</label>
        <Input ref={city} className="mb-4" type="text" id="city" />

        <Button onClick={cashpayment}>pay now</Button>

      </div>
    </div>
  );
}
