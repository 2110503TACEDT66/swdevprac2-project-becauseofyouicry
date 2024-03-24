import Image from "next/image";

export default function ProductCard({campgroundName, imgSrc}: {campgroundName: string, imgSrc: string}) {
    return (
        <div className="w-1/6 h-[300px] rounded-lg shadow-lg mt-20">
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc} alt="Product Picture" fill={true} className="object-cover rounded-t-lg"/>
            </div>
            <div className="w-full h-[30%] p-[10px] text-black bg-gray-300 rounded-b-lg">{campgroundName}</div>
        </div>
    )
}
