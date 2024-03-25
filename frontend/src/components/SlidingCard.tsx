'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'

import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import Card from './Card';

export default async function SlidingCard() {

  const campgrounds = await getCampgrounds();
  console.log(campgrounds.data)
  
  
    return(
      <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
    {
     campgrounds.data.map((campgroundItem:CampgroundItem)=>(
      <SwiperSlide>
        <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
          <Card campgroundName={campgroundItem.name} imgSrc={`/img/${campgroundItem.name}.jpg`}></Card>
       
        </Suspense>
      </SwiperSlide>
     )) 
     }
      
    
    </Swiper>
    )
}