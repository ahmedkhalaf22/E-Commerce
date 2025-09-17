'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";


export default function Productdetailslider({images}:{images:string[]}) {
      const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000
  };
  return (
    <div>
              <Slider {...settings}>
      {images.map((image)=>{
        return <div key={image}>
        <Image src={image} alt="img1" className="w-full object-cover h-96" width={1000} height={1000}/>
      </div>
      })}


    </Slider>
    </div>
  )
}
