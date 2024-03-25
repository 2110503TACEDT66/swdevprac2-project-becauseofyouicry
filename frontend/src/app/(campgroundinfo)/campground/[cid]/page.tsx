import Image from "next/image";
import getCampground from "@/libs/getCampground";

export default async function CampgoundDetailPage( {params} : {params: {hid:string}}) {
    
    const campgroundDetail = await getCampground(params.hid);
 
    return (
        <main className="text-center p-5">
            <div className="flex flex-row my-5">
                <Image src={ campgroundDetail.data.picture } 
                alt="hospitalimage"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">{campgroundDetail.data.name}
                <div className="text-md mx-5 ">Address: {campgroundDetail.data.address}</div>
                <div className="text-md mx-5 ">District: {campgroundDetail.data.district}</div>
                <div className="text-md mx-5 ">Province: {campgroundDetail.data.province}</div>
                <div className="text-md mx-5 ">Postal Code: {campgroundDetail.data.postalcode}</div>
                <div className="text-md mx-5 ">Telephone: {campgroundDetail.data.tel}</div>
                </div>
            
            </div>
        </main>
    )
}
