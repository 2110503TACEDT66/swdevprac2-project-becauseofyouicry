import Image from 'next/image'
import styles from './page.module.css'
import Banner from '@/components/Banner'
import ProductCard from '@/components/ProductCard'
export default function Home() {
  return (
    <main>
      <Banner/>
      <div style={{margin:"20px",display:"flex" , flexDirection : "row" , alignContent : "space-around",justifyContent:"space-around",flexWrap:"wrap"}}>
        <ProductCard campgroundName='campground 1' imgSrc='/img/campground.jpg'/>
        <ProductCard campgroundName='campground 2' imgSrc='/img/campground.jpg'/>
        <ProductCard campgroundName='campground 3' imgSrc='/img/campground.jpg'/>
        <ProductCard campgroundName='campground 4' imgSrc='/img/campground.jpg'/>
      </div>
    </main>
  )
}
