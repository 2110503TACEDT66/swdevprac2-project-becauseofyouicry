import Image from 'next/image'
import styles from './page.module.css'
import Banner from '@/components/Banner'
import ProductCard from '@/components/Card'
import SlidingCard from '@/components/SlidingCard'
import getCampgrounds from '@/libs/getCampgrounds'

export default async function Home() {

  const campgrounds = await getCampgrounds();

  return (
    <main>
      <Banner/>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <h1 className='text-xl font-bold text-emerald-800 font-sans'>- available campgrounds here -</h1>
      </div>
      
      {/* <div style={{margin:"20px",display:"flex" , flexDirection : "row" , alignContent : "space-around",justifyContent:"space-around",flexWrap:"wrap"}}>
        <CardPanel/>
      </div> */}
      <div className='flex row p-10'>
        <SlidingCard/>
      </div>
    </main>
  )
}
