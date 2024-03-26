export default async function getCampgroundLocation(cid:String) {
    
    const response = await fetch(`http://localhost:4000/api/v1/campgrounds/${cid}/Location`)
    
    console.log("hihi");

    console.log(response);
    if(!response.ok){
        throw new Error("Failed to fetch campgroundlocation")
    }

    return await response.json()

}