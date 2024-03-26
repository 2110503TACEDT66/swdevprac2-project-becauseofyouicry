export default async function getCampgroundWeather(cid:String) {
    
    const response = await fetch(`http://localhost:4000/api/v1/campgrounds/${cid}/Weather`)
    
    console.log("hihi");

    console.log(response);
    if(!response.ok){
        throw new Error("Failed to fetch campgroundWeather")
    }

    return await response.json()

}