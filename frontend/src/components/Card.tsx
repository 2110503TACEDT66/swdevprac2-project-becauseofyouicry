'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import { useState } from 'react';
import { Rating } from '@mui/material';

export default function Card( {hospitalName, imgSrc, onRating} : {hospitalName:string, imgSrc:string, onRating?:Function}) {

    const [rating, setValue] = useState<number|null>(5)

    return (
        <InteractiveCard contentName={hospitalName}>
            <div className='w-full h-[60%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Hospital Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[20%] p-[10px] text-sky-600 flex flex-col'>
                {hospitalName}
            </div>

            {
            onRating? <div className='w-full h-[20%] p-[10px] text-sky-600 flex flex-col' onClick={(e)=>{e.stopPropagation(); onRating(hospitalName, rating)}}>
            <Rating
                id={hospitalName +' '+'Rating'}
                name={hospitalName +' '+'Rating'}
                data-testid={hospitalName +' '+'Rating'}
                value={rating}
                onChange={(event, newValue) => {
                setValue(newValue);
                onRating(hospitalName, newValue)
                }}/>
            </div> : ''
            }
        </InteractiveCard>
    );
}