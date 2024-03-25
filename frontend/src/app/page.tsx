import Image from 'next/image'
import styles from './page.module.css'
import Banner from '@/components/Banner'
import ProductCard from '@/components/Card'
import CardPanel from '@/components/CardPanel'
import SlidingCard from '@/components/SlidingCard'

export default function Home() {
  return (
    <main>
      <Banner/>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <h1 className='text-xl font-bold'>Browse available campgrounds here</h1>
      </div>
      
      {/* <div style={{margin:"20px",display:"flex" , flexDirection : "row" , alignContent : "space-around",justifyContent:"space-around",flexWrap:"wrap"}}>
        <CardPanel/>
      </div> */}
      <div>
        <SlidingCard/>
      </div>
    </main>
  )
}
