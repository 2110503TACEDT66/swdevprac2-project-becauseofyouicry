// UserProfile.tsx
"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import getBookings from '@/libs/getBookings'; // Assuming it returns a Promise<BookingJson>
import getUserProfile from '@/libs/getUserProfile';
import BookingCatalog from './bookingCatalog';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  // Add any other fields you expect
}
interface BookingJson {
  success: boolean;
  count: number;
  data: Booking[];
}

interface Booking {
  _id: string;
  campground: Campground;
  user: string;
  Date: string;
  createdAt: string;
  __v: number;
}
interface Campground {
  _id: string;
  name: string;
  address: string;
  telephone_number: string;
  id: string;
}
export default function UserProfile() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<BookingJson | null>(null); // Initialize bookings state

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session && session.user.token) {
        try {
          const profile = await getUserProfile(session.user.token);
          setUserProfile(profile.data as UserProfile); // Type assertion

          // Fetch bookings after user profile is retrieved (optional)
          const bookingData = await getBookings(); // Assuming token is needed for bookings as well
          setBookings(bookingData);
        } catch (error) {
          console.error('Error fetching user profile or bookings:', error);
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  return (
    <div className="container mx-auto mt-8">
      {session && userProfile ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{userProfile.name} Information</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email: {userProfile.email}</label>
            </div>
            {/* Omit displaying password */}
            <div>
              <h2 className="text-xl font-bold mb-2 text-black">Your Bookings:</h2>
              {/* Conditionally render BookingCatalog based on bookings availability */}
              {bookings ? (
                <BookingCatalog bookingJson={bookings} />
              ) : (
                <p>Loading bookings...</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
