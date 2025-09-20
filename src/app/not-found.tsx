import React from 'react'
import img from "../../public/images/404 (2).png"
import Image from 'next/image'
export default function notfound() {
  return (
    <div className='flex justify-center items-center'>
      <Image src={img} alt='404' width={1000} height={1000}   className='object-cover ' />
    </div>
  )
}
