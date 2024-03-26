'use client'
import React, { useEffect, useState } from 'react';
import getBookings from '@/libs/getBookings';

const GetMePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo(); // Assuming this function fetches user info from your backend
        setUserInfo(user);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Your Information</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <p className="text-gray-900 text-lg">{}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Telephone:</label>
          <p className="text-gray-900 text-lg">{}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Your Bookings:</h2>
          {/* Assuming you have logic here to display user's bookings */}
          {/* For example: */}
          {/* <ul>
              {userInfo.bookings.map((booking: any) => (
                <li key={booking.id}>
                  {booking.campgroundName} - {booking.date}
                </li>
              ))}
            </ul> */}
        </div>
      </div>
    </div>
  );
};

export default GetMePage;
