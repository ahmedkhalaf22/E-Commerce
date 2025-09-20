import { Input } from '@/components/ui/input'
import React from 'react'
import amazon from "../../../../public/images/amazon3.png"
import american  from "../../../../public/images/american express.png"
import master  from "../../../../public/images/mastercard.jpg"
import paypal  from "../../../../public/images/paypal.jpeg"
import apple  from "../../../../public/images/apple.jpeg"
import google  from "../../../../public/images/google5.png"
import Image from 'next/image'

export default function Footer() {
  return (
    <div className='bg-gray-200 p-5 '>
      <h1 className='pt-3 text-2xl'>Get the FreshCart app</h1>
      <p className='text-1xl text-gray-400'>we will send you a link ,open it in your phone to download the app</p>
      <div className='flex justify-between items-center '>
        <Input className='bg-white w-3/4 m-3' type="text" placeholder='Email...' />
        <button className='text-white bg-main  px-5 py-2 rounded-sm cursor-pointer'>share app link </button>
      </div>
      <hr  className='border border-gray-300 my-3'/>
      <div className='flex justify-between items-center p-2'>
        <div className='flex justify-start items-center p-2'>
          payment partners
          <Image className='mr-2' src={amazon} alt="amazon" width={50} height={50} />
          <Image className='mr-2' src={american } alt="american express" width={80} height={80} />
          <Image className='mr-2' src={master } alt="mastercard" width={40} height={40} />
          <Image className='mr-2' src={paypal } alt="paypal" width={40} height={40} />
        </div>
        <div className='flex justify-start items-center p-2'> 
          Get deliveries with fresh cart
          <Image className='mr-2 ml-2' src={apple} alt="apple" width={50} height={50} />
          <Image className='mr-2' src={google } alt="google" width={50} height={50} />          
        </div>
      </div>
      <hr  className='border border-gray-300 my-3'/>
    </div>
  )
}
