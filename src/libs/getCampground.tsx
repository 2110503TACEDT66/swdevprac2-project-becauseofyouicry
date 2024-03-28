export default async function getCampground(cid:String) {
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds/${cid}`)
    
    console.log("hihi");

    console.log(response);
    if(!response.ok){
        throw new Error("Failed to fetch campground")
    }

    return await response.json()

}