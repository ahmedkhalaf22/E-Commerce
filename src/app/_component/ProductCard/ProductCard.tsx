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
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AddCartBtn from './AddCartBtn'

export default function ProductCard({item}:{item:product}) {
    const{imageCover,title,ratingsAverage,price,category:{name} ,_id}=item
  return (
    <div>
      <Card>
<Link href={"/products/"+_id}>
  <CardHeader>
<Image src={imageCover} alt={title} width={200} height={100} className=' object-cover w-full rounded-2xl'/>
  </CardHeader>
  <CardContent>
    <CardTitle className='text-main'>{name}</CardTitle>
    <CardTitle>{title.split(" ").slice(0,2).join(" ")}</CardTitle>
      <div className='flex justify-between items-center'>
    <span>{price} EGP</span>
    <span><i className='fa-solid fa-star rating-color'></i> {ratingsAverage}</span>

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
