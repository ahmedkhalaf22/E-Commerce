import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider';
import CategorySliderApi from '../CategorySliderApi/CategorySliderApi';

export default async function CategorySliderData() {
    const data=await CategorySliderApi()
  return (
    <div>
      <CategorySlider categorylist={data}/>
    </div>
  )
}
