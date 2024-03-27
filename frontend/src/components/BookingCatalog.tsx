import React from 'react';
import { BookingsJson } from '../../interface';
import ImageBox from './ImageBox'; 

interface BookingCatalogProps {
  bookingJson: BookingsJson;
}

const BookingCatalog: React.FC<BookingCatalogProps> = ({ bookingJson }) => {
  return (
    <div className="m-5 grid grid-cols-1 gap-5">
      {bookingJson.data.map((bookingItem) => (
        <div
          key={bookingItem._id}
          className="border border-gray-200 p-4 rounded-lg shadow-md bg-green-100 flex items-center"
        >
          <div className="flex-grow">
            <p className="text-lg font-bold text-black">Campground: {bookingItem.campground.name}</p>
            <p className="text-black">Booking Date: {new Date(bookingItem.Date).toLocaleDateString()}</p>
            <p className="text-black">Created At: {new Date(bookingItem.createdAt).toLocaleDateString()}</p>
          </div>
          
          <div className="w-32">
            <ImageBox imgSrc={`/img/${bookingItem.campground.name} CARD.jpg`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingCatalog;
