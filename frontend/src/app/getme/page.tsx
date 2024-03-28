"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";
import getUserProfile from "@/libs/getUserProfile";
import BookingCatalog from "@/components/BookingCatalog";
import { UserJson } from "../../../interface";
import { BookingsJson } from "../../../interface";
import Link from "next/link";
import { Button } from "@mui/material";

import styled from "styled-components";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

// Styled Button for Logout
const StyledButton = styled(Button)`
  && {
    color: #fff;
    background-color: #f43f5e; /* Red */
    &:hover {
      background-color: #d32f2f; /* Darker Red */
    }
  }
`;

export default function UserProfile() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserJson | null>(null);
  const [bookings, setBookings] = useState<BookingsJson>({
    success: false,
    count: 0,
    data: [],
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session && session.user.token) {
        try {
          const profile = await getUserProfile(session.user.token);
          setUserProfile(profile.data as UserJson);

          const bookingData = await getBookings(session.user.token);
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

  return (
    <div className="bg-[#576453] min-h-screen py-8">
      <div className="container mx-auto">
        {session && userProfile ? (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-left text-white pl-6">
              {userProfile.name} Information
            </h1>
            <div className="bg-[#fffbeb] p-6 rounded-lg shadow-md relative">
              {" "}
              {/* Add relative position */}
              <div className="mb-4">
                <p className="text-lg font-bold mb-2 text-gray-700">
                  Email: {userProfile.email}
                </p>
                <p className="text-lg font-bold mb-2 text-gray-700">
                  Telephone: {userProfile.telephone}
                </p>
                <p className="text-lg font-bold mb-2 text-gray-700">
                  Role: {userProfile.role}
                </p>
                <p className="text-lg font-bold mb-2 text-gray-700">
                  Member since: {formattedDate}
                </p>
                <div className="absolute top-0 right-0 mt-4 mr-6">
                  {" "}
                  {/* Position Logout button */}
                  <Link href="/api/auth/signout">
                    <StyledButton>log out</StyledButton>
                  </Link>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold mb-2 text-black">
                  Your Bookings :
                </span>
                <Suspense
                  fallback={
                    <p className="text-emerald-900 items-center">
                      Loading...
                      <LinearProgress />
                    </p>
                  }
                >
                  {bookings.data.length === 0 ? (
                    <span className=" text-black text-xl font-bold"> empty</span>
                  ) : (
                    // Render your content here when bookItems.length is not 0
                    <BookingCatalog bookingJson={bookings} userRole={userProfile.role}/>
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
