import { product, ProductData } from '@/interface/porducts.interface'
import React, { Suspense } from 'react'
import ProductCard from './_component/ProductCard/ProductCard'
import MainSlider from './_component/MainSlider/MainSlider'
import { Homeloading } from './_component/Homeloading/Homeloading'

export default async function Home() {
const res =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
const data:ProductData =await res.json()
const productlist:product[]=data.data
  return (
<>
    <MainSlider/>
    <h1>welcome page</h1>
    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5'>
      
      <Suspense fallback={<Homeloading/>}>
        {productlist.map((product)=>{
        return <ProductCard key={product._id} item={product} />
      })}
      </Suspense>
    </div>
</>
  )
}
