"use client";
import {
  clearCart,
  deleteProduct,
  getcartdata,
  UpdateNumberOfProduct,
} from "@/CardAction/CardAction";
import { Button } from "@/components/ui/button";
import { GetUserToken } from "@/GetUserToken";
import { cart, CartData } from "@/interface/cart.interface";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import CartLoading from "../../_component/cartLoading/CartLoading";
import { toast } from "sonner";
import { CountContext } from "@/CountProvider";
import Link from "next/link";

export default function Cart() {
  const { setCartItemsCount }: any = useContext(CountContext);
  const [cartloading, setcartloading] = useState(true);
  //  const token= await GetUserToken()
  const [cart, setcart] = useState<cart>();
  useEffect(() => {
    getAllDAta();
  }, []);
  async function getAllDAta() {
    setcartloading(true);
    const data: CartData = await getcartdata();
    console.log("cart", data.data);

    setcart(data.data);
    setcartloading(false);
  }

  async function removeProduct(id: string) {
    const data = await deleteProduct(id);

    if (data.status == "success")
      toast.success("prouduct deleted", { position: "top-center" });
    setcart(data.data);
    const sum = data.data.products.reduce(
      (total: number, item: { count: number }) => (total += item.count),
      0
    );
    setCartItemsCount(sum);
  }

  async function clearAll() {
    const data = await clearCart();

    if (data.message == "success") setcart(undefined);
    setCartItemsCount(0);
  }

  async function updateProduct(id: string, count: number) {
    const data = await UpdateNumberOfProduct(id, count);

    if (data.status == "success") setcart(data.data);
    const sum = data.data.products.reduce(
      (total: number, item: { count: number }) => (total += item.count),
      0
    );
    setCartItemsCount(sum);
  }

  return (
    <div>
      <h1 className="text-3xl">shop cart:</h1>
      {cartloading ? (
        <CartLoading />
      ) : (
        <>
          <h3 className="text-1xl text-main">
            Total Cart Price : {cart?.totalCartPrice}
          </h3>

          <Button
            onClick={clearAll}
            className="bg-red-600 rounded-2xl my-3 float-right"
          >
            clear cart
          </Button>

          <Button className=" ms-5 mt-2 ">
            <Link className="!text-white" href={"/Payment"}>
              pay cash
            </Link>
          </Button>
          <Button className="ms-5 mt-2 ">
        <Link className="!text-white" href={"/checkoutsession/" + cart?._id}>pay online</Link>
      </Button>
          <div className="clear-both"></div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark my-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.products.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Image
                          width={100}
                          height={100}
                          src={item.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={item.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              updateProduct(
                                item.product._id,
                                (item.count -= 1)
                              );
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            {item.count == 1 ? (
                              <i className="fa-solid fa-trash"></i>
                            ) : (
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            )}
                          </button>
                          <div>
                            <span>{item.count}</span>
                          </div>
                          <button
                            onClick={() => {
                              updateProduct(
                                item.product._id,
                                (item.count += 1)
                              );
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.price}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          onClick={() => {
                            removeProduct(item.product._id);
                          }}
                          className="bg-red-600 text-white"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      
    </div>
  );
}
