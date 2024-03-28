
export default async function updateBooking(_id : string,campground: string,date: Date,token: string) {
    try {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();

        // Construct a new Date object with only the date components
        const formattedDate = new Date(year, month - 1, day);
        const response = await fetch(`http://localhost:4000/api/v1/bookings/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                campground: campground,
                Date: formattedDate, 
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        
        
        return await response.json();
    } catch (error : unknown) {
        const err = error as any ;
        throw new Error(err.message || "Failed to update booking");
    }
}
