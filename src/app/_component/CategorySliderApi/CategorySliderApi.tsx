import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider'

export default async function CategorySliderApi() {

    let res= await fetch("https://ecommerce.routemisr.com/api/v1/categories")
    let {data}= await res.json()
    return data
}
