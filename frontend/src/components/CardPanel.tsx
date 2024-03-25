'use client'

import Card from "./Card"
import { useReducer } from "react"
import Link from "next/link"
import Swiper from "swiper"

export default function CardPanel() {

    const initiateMap = new Map([
        ['Chulalongkorn Hospital', 5],
        ['Rajavithi Hospital', 5],
        ['Thammasat University Hospital', 5],
        ])

    const ratingReducer = (ratingMap:Map<string,number>, action:{type:string, hospitalName:string ,rating: number }) => {
        switch(action.type) {
            case 'add': {
                return new Map(ratingMap.set(action.hospitalName,action.rating))
            }
            case 'remove' : {
                ratingMap.delete(action.hospitalName)
                return new Map(ratingMap)
            }
            default : return ratingMap;
        }
    }

    const [ratingMap, dispatchRating] = useReducer(ratingReducer,initiateMap);


    //MOCK DATA

    const mockHospitalRepo = [
        {hid:"001",name:"Chulalongkorn Hospital", image: "/img/chula.jpg"},
        {hid:"002",name:"Rajavithi Hospital", image: "/img/rajavithi.jpg"},
        {hid:"003",name:"Thammasat University Hospital", image: "/img/thammasat.jpg"}

    ]

    return (
        <div>
            <div style={{margin:"20px",display:"flex",flexDirection:"row", flexWrap:"wrap",justifyContent: "space-around", alignContent:"space-around", padding:"20px"}}>
                {
                    mockHospitalRepo.map((hospitalItem)=>(
                        <Link href={`/hospital/${hospitalItem.hid}`} className="w-1/5">
                        <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.image}
                            onRating={(hospital:string,rating:number)=> dispatchRating({type:'add', hospitalName:hospitalItem.name, rating:rating})}
                        />
                        </Link>
                    ))
                }
            </div>
            {Array.from(ratingMap).map(([hospital, rating]) => (
                <div key={hospital} data-testid={hospital} onClick={() => dispatchRating({type:'remove', hospitalName:hospital, rating:0})} style={{ cursor: 'pointer' }} className="text-black">
                    {hospital} Rating : {rating}
                </div>
            ))}
        </div>
    )
}