import React from 'react';

interface BookingCatalogProps {
  bookingJson: BookingJson;
}

interface Campground {
  _id: string;
  name: string;
  address: string;
  telephone_number: string;
  id: string;
}

interface Booking {
  _id: string;
  campground: Campground;
  user: string;
  Date: string;
  createdAt: string;
  __v: number;
}

interface BookingJson {
  success: boolean;
  count: number;
  data: Booking[];
}

const BookingCatalog: React.FC<BookingCatalogProps> = ({ bookingJson }) => {
    return (
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          alignContent: "space-around",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {bookingJson.data.map((bookingItem: Booking) => (
          <div key={bookingItem._id}>
            <div>campground : {bookingItem.campground.name}</div>
            <div>user : {bookingItem.user}</div>
            <div>date : {bookingItem.Date}</div>
            <div>createdAt : {bookingItem.createdAt}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default BookingCatalog;
