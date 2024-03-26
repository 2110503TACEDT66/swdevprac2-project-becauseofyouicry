import { CampgroundJson } from "../../interface";

export default async function getCampgrounds() {

    await new Promise<CampgroundJson>((resolve) => setTimeout(resolve, 1000));

    const response = await fetch("http://localhost:4000/api/v1/campgrounds")
    if(!response.ok){
        throw new Error("Failed to fetch hospitals")
    }

    return await response.json()

}