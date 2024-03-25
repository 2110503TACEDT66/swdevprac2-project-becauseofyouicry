'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper.min.css';
import 'swiper/css'

export default async function SlidingCard() {
  
    return(
        <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
    )
}