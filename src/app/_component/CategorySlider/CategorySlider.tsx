"use client"
import React from 'react'
import CategorySliderApi from '../CategorySliderApi/CategorySliderApi'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay} from 'swiper/modules'
import 'swiper/css';
import { categorysl } from '@/interface/categoryslider.interface';
export default function CategorySlider({categorylist}:any) {

 
        console.log(categorylist);
        
    
  return (
    <div className='w-[100%] mx-auto pt-5 pb-10'>
    <h1 className='text-4xl py-5'>shop popular category</h1>
     <Swiper
      spaceBetween={0}
      slidesPerView={6}
      modules={[Autoplay]}
      autoplay={{delay:1000}}

      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {categorylist.map((category:categorysl)=>{
        return <SwiperSlide key={category._id}>
          <img src={category.image} alt={category.name} className='h-48 w-full object-cover' />
          <p className='text-center'>{category.name}</p>
        </SwiperSlide>
      })}
      
    
      
    </Swiper>
    
    
    
    
    </div>
  )
}
