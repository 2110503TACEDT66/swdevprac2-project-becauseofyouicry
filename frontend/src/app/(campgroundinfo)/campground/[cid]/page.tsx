import Image from "next/image";
import getCampground from "@/libs/getCampground";
import { Link } from "@mui/material";
import getCampgroundLocation from "@/libs/getCampgroundLocation";
import getCampgroundWeather from "@/libs/getCampgroundWeather";

export default async function CampgoundDetailPage( {params} : {params: {cid:string}}) {
    
   
    const campgroundDetail = await getCampground(params.cid);

    const campgroundLocation = await getCampgroundLocation(params.cid);
    const campgroundWeather = await getCampgroundWeather(params.cid);
    
    

    
 
    return (
        <main className="text-center p-5">
             <div className="flex justify-end mb-5">
                <Link href="/">
                    <button className="bg-yellow-950 hover:bg-lime-200 hover:text-emerald-800 text-white font-bold py-2 px-4 rounded">
                        back
                    </button>
                </Link>
            </div>
            <div className="flex flex-row my-5 bg-slate-50 bg-opacity-50 rounded-lg">
                <Image src={ `/img/${campgroundDetail.data.name} CARD.jpg` } 
                alt="hospitalimage"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left pt-3 font-bold text-emerald-800">{campgroundDetail.data.name}
                
                <div className="text-md mx-5 pt-3">Address : {campgroundDetail.data.address}</div>
                <div className="text-md mx-5 ">Telephone : {campgroundDetail.data.telephone_number}</div>
                <div className="text-md mx-5 ">Current Weather : {campgroundWeather.data.weather[0].description}</div>
                <div className="text-md mx-5 ">Current Temperature : {campgroundWeather.data.main.temp} °C </div>
            
                <div className='pt-8  pb-3'>
                <Link href={campgroundLocation.googleMapsUrl}>
                    <button className="bg-emerald-800 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
                        GoogleMapLink
                    </button>
                </Link>
                </div>

                </div>
            
            </div>
        </main>
    )
}
