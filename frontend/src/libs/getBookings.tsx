export default async function getBookings(token: string) {
  const response = await fetch(`http://localhost:4000/api/v1/bookings`, {
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
