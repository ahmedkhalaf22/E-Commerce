'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
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
    <div className="grid grid-cols-12 m-5 mx-auto ">
      <div className="col-span-9">
        <Slider {...settings}>
      <div>
        <Image src="/images/slider-image-1.jpeg" alt="img1" className="w-full object-cover h-96" width={1000} height={1000}/>
      </div>
      <div>
        <Image src="/images/slider-image-2.jpeg" alt="img2" className="w-full object-cover h-96" width={1000} height={1000}/>
      </div>
      <div>
        <Image src="/images/slider-image-3.jpeg" alt="img3" className="w-full object-cover h-96" width={1000} height={1000}/>
      </div>

    </Slider>
      </div>
      <div className="col-span-3 ">
            <Image src="/images/blog-img-1.jpeg" alt="blog 1" className="h-48 object-cover" width={1000} height={1000}/>
            <Image src="/images/blog-img-2.jpeg" alt="blog 1" className="h-48 object-cover" width={1000} height={1000}/>
      </div>
    </div>
  );
}