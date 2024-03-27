import React from 'react';
import { CampgroundJson } from '../../interface';
import { BookingJson } from '../../interface';
import { BookingsJson } from '../../interface';
export default function BookingCatalog({ bookingJson }: { bookingJson : BookingsJson}) {
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
        {bookingJson.data.map((bookingItem: BookingJson) => (
          <div key={bookingItem._id}>
            <div text-black>campground : {bookingItem.campground.name}</div>
            <div text-black>user : {bookingItem.user}</div>
            <div text-black>date : {bookingItem.Date}</div>
            <div text-black>createdAt : {bookingItem.createdAt}</div>
          </div>
        ))}
      </div>
    );
  };