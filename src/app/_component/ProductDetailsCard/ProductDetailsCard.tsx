import { Button } from '@/components/ui/button'
import { Data } from '@/interface/productdetails.interafce'
import Image from 'next/image'
import React from 'react'
import Productdetailslider from '../Productdetailslider/Productdetailslider'


export default function ProductDetailsCard({item}:{item:Data}) {
    const{imageCover,title,ratingsAverage,price,category:{name} ,_id,description ,images}=item
  return (
    <div className='w-4/5 mx-auto my-10'>
      <div className='grid grid-cols-12 items-center gap-24  '>
        <div className='col-span-4'>
            <Productdetailslider images={images} />
        </div>
        <div className='col-span-8'>
            <h1 className='my-5'>{title}</h1>
            <p className='my-5 text-ring font-sm'>{description}</p>
            <h5 className='text-main'>{name}</h5>
            <div className='flex justify-between items-center'>
    <span className='my-5'>{price} EGP</span>
    <span><i className='fa-solid fa-star rating-color'></i> {ratingsAverage}</span>

  </div>
  <Button className='bg-main rounded-2xl w-full'>add to cart</Button>
        </div >
      </div>
    </div>
  )
}
