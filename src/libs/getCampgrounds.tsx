import { CampgroundJson } from "../../interface";

export default async function getCampgrounds() {

    await new Promise<CampgroundJson>((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds`)
    if(!response.ok){
        throw new Error("Failed to fetch campgrounds")
    }

    return await response.json()

}