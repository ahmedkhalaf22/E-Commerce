"use server"

import { GetUserToken } from "@/GetUserToken"
import { CartData } from "@/interface/cart.interface"
import { error } from "console"

export async function getcartdata(){

    const token:any = await GetUserToken()
        if(!token){
        throw new Error("INVALID TOKEN")
    }
    const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        headers:{
            token:token
        }
    })
    const data:CartData = await res.json()
    return data
    
}


export async function AddProductToCart(id:string) {

    const token:any = await GetUserToken()
        if(!token){
        throw new Error("INVALID TOKEN")
        }
        const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
            method:"post",
            body:JSON.stringify({
                productId:id
            }),
            headers:{
                token:token,
                "Content-Type":"application/json"
            }
        })
        const data= await res.json()
        return data
}


export async function deleteProduct(id:string) {
     const token:any = await GetUserToken()
        if(!token){
        throw new Error("INVALID TOKEN")
        }
        const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
            method:"delete",
            headers:{
                token:token
            }
        })
        const data =await res.json()
        return data
}


export async function clearCart() {
     const token:any = await GetUserToken()
        if(!token){
        throw new Error("INVALID TOKEN")
        }
        const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
            method:"delete",
            headers:{
                token:token
            }
        })
        const data =await res.json()
        return data
}




export async function UpdateNumberOfProduct(id:string ,count:number) {

    const token:any = await GetUserToken()
        if(!token){
        throw new Error("INVALID TOKEN")
        }
        const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
            method:"put",
            body:JSON.stringify({
                count:count
            }),
            headers:{
                token:token,
                "Content-Type":"application/json"
            }
        })
        const data= await res.json()
        return data
}