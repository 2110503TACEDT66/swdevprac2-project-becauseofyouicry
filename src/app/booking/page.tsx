"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/createBooking";
import LocationDateReserve from "@/components/LocationDateReserve";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import CampgroundCatalog2 from "./campgroundCatalog2";
import getCampgrounds from "@/libs/getCampgrounds";
import { CampgroundJson } from "../../../interface";
import Alert from '@mui/material/Alert';
import getExistingBookings from "@/libs/getExistingBooking";

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
  const [selectedCampground, setSelectedCampground] =
    useState<CampgroundJson | null>(null);
  const [selectedCampgroundid, setSelectedCampgroundid] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [existingBookings, setExistingBookings] = useState([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const fetchedCampgrounds = await getCampgrounds();
        setSelectedCampground(fetchedCampgrounds);
      } catch (error) {}
    };
    fetchCampgrounds();
  }, []);

  useEffect(() => {
    const fetchExistingBookings = async () => {
      try {
        if (selectedCampgroundid && selectedDate && session?.user.token) {
          const bookings = await getExistingBookings(selectedCampgroundid, selectedDate, session.user.token);
          setExistingBookings(bookings);

          localStorage.setItem('existingBookings', JSON.stringify(bookings));
        }
      } catch (error) {
        console.error("Error fetching existing bookings:", error);
      }
    };

    fetchExistingBookings();

  }, [selectedCampgroundid, selectedDate, session?.user.token]);

    
  console.log(`THIS IS SELECTED ID : "${selectedCampgroundid}"`)
  
  if (!selectedCampground) {
    return null;
  }

  const handleBooking = async () => {
    try {
      setLoading(true);
      if (!session || !session.user.token) {
        console.error("Session or user token not available");
        return;
      }
      
      if (existingBookings.length > 0) {
        setIsError(true);
        setAlertMessage("This place is already booked for the selected date. Please choose a different date or campground.");
        setShowAlert(true);
        setLoading(false);
        return;
      }

      if (selectedCampgroundid=="") {
        setIsError(true);
        console.log(`THIS IS ID :"${selectedCampgroundid}`)
        setAlertMessage("Please select a campground to book");
        setShowAlert(true);
        setLoading(false);
        return;
      }

      await createBooking(
        selectedCampgroundid,
        session.user._id,
        selectedDate,
        new Date().toISOString(),
        session.user.token
      );
      setIsError(false);
      setAlertMessage("Booking created successfully");
    } catch (error) {
      setIsError(true);
      setAlertMessage(`${error}`);
    } finally {
      setShowAlert(true);
      setLoading(false);
      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage("");
      }, 3000);
    }
  };

  return (
    <main className="w-full flex flex-col items-center space-y-4 relative" style={{ backgroundImage: `url('/img/bookingbg.jpg')`, backgroundSize: 'cover', height: '100vh', width: '100vw'}}>
      {session && session.user.token ? (
        <>
          <div className="m-1 pt-8 text-lg font-bold text-white">Campground Booking</div>
          <div className="w-full max-w-lg space-y-2 mt-8 relative rounded-lg" style={{ backgroundColor: "#f0fdf4" }}>
            <div className="flex justify-center pt-2">
              <CampgroundCatalog2
                campgroundJson={selectedCampground}
                onCampgroundChange={(value: string) => {
                  setSelectedCampgroundid(value);
                }}
              />
            </div>
            <LocationDateReserve onDateSelect={setSelectedDate} />
          </div>
          <div className="w-full max-w-lg space-y-2">
            <Button
              variant="contained"
              className="w-full text-md font-bold text-emerald-900 hover:text-white bg-[#f0fdf4] hover:bg-emerald-800"
              //style={{ backgroundColor: "#f0fdf4" }}
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book"}
            </Button>
          </div>
          {showAlert && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
              <Alert severity={isError ? "error" : "success"}>{alertMessage}</Alert>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}