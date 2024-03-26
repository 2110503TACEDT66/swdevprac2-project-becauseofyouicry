"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import createBooking from '@/libs/createBooking';
import LocationDateReserve from '@/components/LocationDateReserve';
import { TextField, Button, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import CampgroundCatalog2 from './campgroundCatalog2';
import getCampgrounds from '@/libs/getCampgrounds';
import { CampgroundJson } from '../../../interface';
const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  &.MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
  & label {
    color: white;
  }
`;

export default function Bookings() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCampground, setSelectedCampground] = useState<CampgroundJson|null>(null);
  const [selectedCampgroundid, setSelectedCampgroundid] = useState<string>("");
  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const fetchedCampgrounds = await getCampgrounds();
        setSelectedCampground(fetchedCampgrounds);
      } catch (error) {
      }
    };
    fetchCampgrounds();
  })
  if(!selectedCampground) return null;
  // const campgrounds = await getCampgrounds();
  const handleBooking = async () => {
    try {
      setLoading(true);
      if (!session || !session.user.token) {
        console.error('Session or user token not available');
        return;
      }
      // Assuming you want to select the first campground by default if available
      await createBooking(
        selectedCampgroundid,
        session.user._id,
        selectedDate.toISOString(),
        new Date().toISOString(),
        session.user.token
      );
      console.log('Booking created successfully');
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <main className="w-full flex flex-col items-center space-y-4">
      {session && session.user.token ? (
        <>
          <div className="w-full max-w-lg space-y-2 mt-8" style={{ backgroundColor: '#576453' }}>
            <CampgroundCatalog2 campgroundJson={selectedCampground} onCampgroundChange={(value:string) => {setSelectedCampgroundid(value)}}/>
            <LocationDateReserve 
              onDateSelect={setSelectedDate}
            />
          </div>
          <div className="w-full max-w-lg space-y-2">
            <Button
              variant="contained"
              className="w-full"
              style={{ backgroundColor: '#576453' }}
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book'}
            </Button>
          </div>
        </>
      ) : (
        <p>Loading...</p> 
      )}
    </main>
  );
}
