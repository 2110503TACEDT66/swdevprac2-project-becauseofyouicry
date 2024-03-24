export default async function getHospital(hid:String) {
    
    const response = await fetch(`https://vaccine-app-backend.vercel.app/api/v1/hospitals/${hid}`)
    if(!response.ok){
        throw new Error("Failed to fetch hospitals")
    }

    return await response.json()

}