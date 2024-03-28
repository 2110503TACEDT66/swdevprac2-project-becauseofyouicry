export default async function getBookings(bookingid : string,token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bookingid}`, {
        method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
  
    // Parse the JSON response and return it
    return await response.json();
  }
  