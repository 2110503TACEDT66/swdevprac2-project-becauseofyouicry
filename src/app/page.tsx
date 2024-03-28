'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Banner from '@/components/Banner'
import ProductCard from '@/components/Card'
import SlidingCard from '@/components/SlidingCard'
import getCampgrounds from '@/libs/getCampgrounds'
import { Suspense, useEffect, useState } from "react"
import { LinearProgress } from "@mui/material"

export default function Home() {
  const [campgrounds, setCampgrounds] = useState(null);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      const data = await getCampgrounds();
      setCampgrounds(data);
    };
    fetchCampgrounds();
  }, []);

  if (!campgrounds) {
    return (
      <main>
        <Banner/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
          <h1 className='text-xl font-bold text-emerald-800 font-sans'>- available campgrounds here -</h1>
        </div>
        <div className="flex justify-center items-center">
  <div className="flex flex-col items-center">
    <p className="text-emerald-900 mt-4 mb-4">Loading...<LinearProgress color="success" /></p>
  </div>
</div>
      </main>
    );
  }

  return (
    <main>
      <Banner/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <h1 className='text-xl font-bold text-emerald-800 font-sans'>- available campgrounds here -</h1>
      </div>
      <div className='flex row p-10'>
        <Suspense fallback={<p className='text-emerald-900 items-center'>Loading...<LinearProgress/></p>}>
          <SlidingCard campgroundJson={campgrounds}/>
        </Suspense>
      </div>
    </main>
  );
}
