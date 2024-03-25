"use client"
import React, { useState } from 'react';
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function LocationDateReserve() {
  const [reserveDate, setReserveDate] = useState(new Date());

  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-full px-10 py-8 flex flex-row justify-center w-[80%] ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          className='text-black p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-roboto-bold'
          displayStaticWrapperAs="desktop"
        />
      </LocalizationProvider>
    </div>
  );
}
