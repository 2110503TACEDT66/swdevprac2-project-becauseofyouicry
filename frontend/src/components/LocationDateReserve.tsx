"use client"
// LocationDateReserve.jsx
// LocationDateReserve.jsx
import React, { useState } from 'react';
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs'; // Import dayjs library

export default function LocationDateReserve({ onDateSelect }: { onDateSelect: (date: Date) => void }) {
  const [reserveDate, setReserveDate] = useState<Date | null>(new Date()); // Initialize with null

  const handleDateSelect = (date: Dayjs | null) => {
  if (date) {
    setReserveDate(date.toDate());
    onDateSelect(date.toDate()); // Convert the Dayjs value to a Date value
  }
};

return (
  <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-full px-10 py-8 flex flex-row justify-center w-[70%] ">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        className='text-black p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-roboto-bold'
        displayStaticWrapperAs="desktop"
        value={reserveDate? dayjs(reserveDate) : null} // Convert Date to Dayjs or pass null
        onChange={handleDateSelect} // Handle date selection
      />
    </LocalizationProvider>
  </div>
);
}

