"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { categorysl } from "@/interface/categoryslider.interface";
type Props = {
  categorylist: categorysl[];
};

export default function CategorySlider({ categorylist }: Props) {
  console.log(categorylist);

  return (
    <div className="w-[100%] mx-auto pt-5 pb-10">
      <h1 className="text-4xl py-5">shop popular category</h1>
      <Swiper
        spaceBetween={0}
        slidesPerView={6}
        modules={[Autoplay]}
        autoplay={{ delay: 1000 }}
      >
        {categorylist.map((category: categorysl) => {
          return (
            <SwiperSlide key={category._id}>
              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover"
              />
              <p className="text-center text-lg font-bold text-main">
                {category.name}
              </p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
