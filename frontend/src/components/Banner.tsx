"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './banner.module.css'
import Image from 'next/image';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';

//import { useSession } from 'next-auth/react';

export default function Banner () {
    const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const [opacity, setOpacity] = useState<number>(1);
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
            return;
        }
        setOpacity(0.9); // Fade out when changing image
        const timeout = setTimeout(() => {
            setOpacity(1); // Fade in after changing image
        }, 300); // Adjust the duration of transition as needed
        return () => clearTimeout(timeout);
    }, [index]);

    function showNextImage() {
        setIndex(index => {
            if(index === covers.length - 1 ) return 0
            return index + 1
        })
    }

    function showPrevImage() {
        setIndex(index => {
            if(index === 0 ) return covers.length - 1
            return index - 1
        })
    }
    

    return (
        <div style={{ width:"100%", height:"100%", position:"relative"}}>
        <div className={styles.banner}>
            <Image src={covers[index]}
                alt='cover'
                fill={true}
                priority
                objectFit='cover'
                style={{ opacity: opacity, transition: 'opacity 0.5s ease-in-out' }} />

                <div className={styles.bannerText}>
                    <h1 className='text-4xl font-bold'>Campground Booking</h1>
                    <h3 className='text-xl font-serif font-bold'>Let's your journey begin here</h3>
                </div>
        </div>
               <button onClick={showPrevImage} className={styles.slidebutton}  style={{left: 0}}>
                <ArrowBigLeftDash/>
               </button>
               <button onClick={showNextImage} className={styles.slidebutton} style={{right: 0}}>
                <ArrowBigRightDash/>
               </button>
        </div>
    );
}

