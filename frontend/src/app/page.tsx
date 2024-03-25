import Image from 'next/image'
import styles from './page.module.css'
import Banner from '@/components/Banner'
import ProductCard from '@/components/Card'
import CardPanel from '@/components/CardPanel'

export default function Home() {
  return (
    <main>
      <Banner/>
      <div style={{margin:"20px",display:"flex" , flexDirection : "row" , alignContent : "space-around",justifyContent:"space-around",flexWrap:"wrap"}}>
        <CardPanel/>
      </div>
    </main>
  )
}
