
export default async function createBooking(
    campgroundId: string,
    userId: string,
    date: Date, 
    createdAt: string,
    token: string
) {
    try {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formattedDate = new Date(year, month - 1, day);

        const response = await fetch(`http://localhost:4000/api/v1/campgrounds/${campgroundId}/bookings/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                campgroundId: campgroundId,
                user: userId,
                Date: formattedDate.toISOString(), 
                createdAt: createdAt
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        
        
        return await response.json();
    } catch (error : unknown) {
        const err = error as any ;
        throw new Error(err.message || "Failed to create booking");
    }
}
