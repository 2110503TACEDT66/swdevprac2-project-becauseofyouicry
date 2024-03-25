export default async function getCampground(cid:String) {
    
    const response = await fetch(`http://localhost:4000/api/v1/campgrounds/${cid}`)
    if(!response.ok){
        throw new Error("Failed to fetch hospitals")
    }

    return await response.json()

}