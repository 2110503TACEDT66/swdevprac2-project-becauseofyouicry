export default async function getCampgrounds() {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch("http://localhost:4000/api/v1/campgrounds")
    if(!response.ok){
        throw new Error("Failed to fetch campgrounds")
    }

    return await response.json()

}