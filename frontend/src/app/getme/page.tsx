// UserProfile.tsx
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings"; // Assuming it returns a Promise<BookingJson>
import getUserProfile from "@/libs/getUserProfile";
import BookingCatalog from "@/components/BookingCatalog";
import { UserJson } from "../../../interface";
import { BookingsJson } from "../../../interface";

export default function UserProfile() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserJson | null>(null);
  const [bookings, setBookings] = useState<BookingsJson>({ success: false, count: 0, data: [] });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session && session.user.token) {
        try {
          const profile = await getUserProfile(session.user.token);
          setUserProfile(profile.data as UserJson); // Type assertion

          // Fetch bookings after user profile is retrieved (optional)
          const bookingData = await getBookings(session.user.token); // Assuming token is needed for bookings as well
          setBookings(bookingData);
        } catch (error) {
          console.error("Error fetching user profile or bookings:", error);
        }
      }
    };

    fetchUserProfile();
  }, [session]);
  if (!userProfile) return null;

  const formattedDate = new Date(userProfile.createdAt).toLocaleDateString();
  console.log(bookings.count);
  return (
    <div className="container mx-auto mt-8">
      {session && userProfile ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {userProfile.name} Information
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email: {userProfile.email}
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Telephone: {userProfile.telephone}
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role: {userProfile.role}
              </label>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Member since: {formattedDate}
              </label>
            </div>
            {/* Omit displaying password */}
            <div>
              <h2 className="text-xl font-bold mb-2 text-black">
                Your Bookings:
              </h2>
              <BookingCatalog bookingJson={bookings} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
