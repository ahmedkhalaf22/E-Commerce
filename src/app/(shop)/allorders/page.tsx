import { GetUserToken } from "@/GetUserToken";
import { CartItem, order, orders, OrdersResponse } from "@/interface/userorders.interface";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import React from "react";

export default async function AllOrders() {
  const token = await GetUserToken();

  type TokenPayload = {
    id: string;
  };

  const { id } = jwtDecode<TokenPayload>(token);

  if (!token) {
    throw new Error("login first");
  }
  const { data }: OrdersResponse = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  );

  console.log(data);

  return (
    <div className="w-[80%] mx-auto">
      <div className="orders "></div>

      {data.map((order: order, index: number) => {
        return (
          <div className="p-5 bg-slate-300 mb-5" key={index}>
            <div className="flex">
              {order.cartItems.map((Item: CartItem, index: number) => {
                return (
                  <div className="w-1/6 me-3 " key={index}>
                    <Image
                      src={Item.product.imageCover}
                      alt={Item.product.title}
                      width={200}
                      height={200}
                      className="w-full rounded-2xl"
                    />
                    <h3 className="line-clamp-1"> {Item.product.title}</h3>
                  </div>
                );
              })}
            </div>
            <h2 className="pt-3 font-bold">
              {" "}
              payment Method Type :{" "}
              <span className="text-main">{order.paymentMethodType}</span>
            </h2>
            <h2 className="pt-3 font-bold">
              {" "}
              total Order Price :{" "}
              <span className="text-main">{order.totalOrderPrice} EGP</span>
            </h2>
            <h2 className="pt-3 font-bold">
              {" "}
              created At :{" "}
              <span className="text-main">
                {new Date(order.createdAt).toLocaleString()}{" "}
              </span>
            </h2>
          </div>
        );
      })}
    </div>
  );
}
