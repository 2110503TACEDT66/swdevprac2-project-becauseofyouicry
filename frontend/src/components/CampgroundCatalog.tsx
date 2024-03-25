'use client'
import Card from "./Card"
import Link from "next/link"


export default function CampgroundCatalog({campgroundsJson}:{campgroundsJson:CampgroundJson}) {

    return (
        <>
            <div style={{margin:"20px",display:"flex",flexDirection:"row", flexWrap:"wrap",justifyContent: "space-around", alignContent:"space-around", padding:"20px"}}>
                {
                    campgroundsJson.data.map((campgroundItem:CampgroundItem)=>(
                        <Link href={`/hospital/${campgroundItem.id}`} className="w-1/5">
                        <Card campgroundName={campgroundItem.name} imgSrc={campgroundItem.picture}/>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}