export default function getBookings() {

    const response = await fetch(`http://localhost:4000/api/v1/bookings`);
    
    // Check if the response is successful
    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    // Parse the JSON response and return it
    return await response.json();
}
