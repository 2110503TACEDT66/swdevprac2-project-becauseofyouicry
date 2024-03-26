// createBooking.tsx
export default async function createBooking(
    campgroundId: string,
    userId: string,
    date: string, 
    createdAt: string,
    token: string
) {
    try {
        const response = await fetch(`http://localhost:4000/api/v1/campgrounds/${campgroundId}/bookings/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                campgroundId: campgroundId,
                user: userId,
                Date: date, // Corrected property name
                createdAt: createdAt // No need to convert createdAt to ISO string format
            })
        });

        if (!response.ok) {
            // If response is not OK, throw an error with the error message from the backend
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error : unknown) {
        const err = error as any ;
        // Throw a JavaScript error with the message received from the backend
        throw new Error(err.message || "Failed to create booking");
    }
}
