// page.tsx
import React from 'react';
import TextBox from '@/components/TextBox';

const UserBookings = () => {
  const mockPhoneNumber = "123-456-7890"; // เบอร์โทร mock

  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <main className="flex-grow bg-light-brown p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-orange-700 rounded-full"></div>
          <div className="ml-4">
            <div className="text-black">email</div>
            <div className="text-black">password</div>
          </div>
        </div>
        <div>
          <div className="text-black mb-2">Available campgrounds:</div>
          <TextBox campgroundName="Andrew Drynan Park" phoneNumber={mockPhoneNumber} />
          <TextBox campgroundName="Chavallee Campground" phoneNumber={mockPhoneNumber} />
        </div>
      </main>
    </div>
  );
};

export default UserBookings;
