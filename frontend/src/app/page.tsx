import Image from 'next/image'
import styles from './page.module.css'
import Banner from '@/components/Banner'
import ProductCard from '@/components/Card'
import SlidingCard from '@/components/SlidingCard'
import getCampgrounds from '@/libs/getCampgrounds'
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default async function Home() {

  const campgrounds = await getCampgrounds();
  

  return (
    <main>
      <Banner/>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <h1 className='text-xl font-bold text-emerald-800 font-sans'>- available campgrounds here -</h1>
      </div>
      
      <div className='flex row p-10'>
      <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
        <SlidingCard campgroundJson={campgrounds}/>
        </Suspense>
      </div>
    </main>
  )
}
