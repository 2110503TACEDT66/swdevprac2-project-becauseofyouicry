export default async function getExistingBookings(campgroundId:String, date:Date, token:string) {
    // Construct the URL with campgroundId and date parameters
    const url = `http://localhost:4000/api/v1/bookings?campground=${campgroundId}&date=${date}`;
    
    const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    
    // Check if the response is successful
    if (!response.ok) {
        throw new Error("Failed to fetch existing bookings");
    }

    // Parse the JSON response and return it
    return await response.json();
}
