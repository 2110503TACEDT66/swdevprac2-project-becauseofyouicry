'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/bundle'

import 'swiper/css/pagination';
import './navigation.css'
import './pagination.css'


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
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      pagination={{
        dynamicBullets: true,
        clickable: true,
        //currentClass: 'pagination',
        //el: '.swiper-pagination-custom'
      }}
    
    >
      <div className=''>
    {
     campgrounds.data.map((campgroundItem:CampgroundItem)=>(
      <SwiperSlide >
        <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
          <Card campgroundName={campgroundItem.name} imgSrc={`/img/${campgroundItem.name} CARD.jpg`}></Card>
          
        </Suspense>
      </SwiperSlide>
     )) 
     }
     </div>
      
    </Swiper>
    )
}