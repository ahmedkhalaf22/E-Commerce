import React from 'react'
import { Data, Productdetails } from './../../../../interface/productdetails.interafce';
import ProductDetailsCard from '@/app/_component/ProductDetailsCard/ProductDetailsCard';


export default async function page({params}:{params:{id:string}}) {
  const {id}=await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
  const data:Productdetails = await res.json()
  const product:Data =data.data
  
  
  return (
    <div>
      <ProductDetailsCard item={product}/> 
    </div>
  )
}
