import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { product } from '@/interface/porducts.interface'
import Link from 'next/link'
import AddCartBtn from './AddCartBtn'
import WishlistBtn from './WishlistBtn'

export default function ProductCard({item}:{item:product}) {
    const{imageCover,title,ratingsAverage,price,category:{name} ,_id}=item
  return (
    <div>
      <Card className="relative">
        <div className="absolute top-2 right-2 z-10">
          <WishlistBtn id={_id}/>
        </div>
<Link href={"/products/"+_id}>
  <CardHeader>
<Image src={imageCover} alt={title} width={200} height={100} className=' object-cover w-full rounded-2xl'/>
  </CardHeader>
  <CardContent>
    <CardTitle className='text-main py-2'>{name}</CardTitle>
    <CardTitle>{title.split(" ").slice(0,2).join(" ")}</CardTitle>
      <div className='flex justify-between items-center'>
    <span className='text-lg font-bold text-main py-2'>{price} EGP</span>
    <span className='text-lg font-bold '><i className='fa-solid fa-star rating-color'></i> {ratingsAverage}</span>

  </div>
  </CardContent>

</Link>
      <CardFooter>
        <AddCartBtn id={_id}/>

    </CardFooter>
</Card>
    </div>
  )
}
