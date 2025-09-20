"use server"

import { GetUserToken } from "@/GetUserToken"

export async function checkoutPaymemts(cartid:string,shippingdata:{details:string,phone:string,city:string}){
    const token= await GetUserToken()
    if (token){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartid}?url=${process.env.NEXT_URL}`,{
            method:"post",
            body:JSON.stringify({
                
    "shippingAddress":shippingdata

                
            }),
            headers:{
                "content-type":"application/json",
                token:token
            }

        })
        const data= await res.json()
        return data
    }
 }