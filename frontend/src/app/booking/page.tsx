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
  const [error, setError] = useState<string | null>(null);
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
        if (selectedCampgroundid && selectedDate) {
          const bookings = await getExistingBookings(selectedCampgroundid, selectedDate);
          setExistingBookings(bookings);

          localStorage.setItem('existingBookings', JSON.stringify(bookings));
        }
      } catch (error) {
        console.error("Error fetching existing bookings:", error);
      }
    };

    fetchExistingBookings();

    const intervalId = setInterval(fetchExistingBookings,10);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);

  }, [selectedCampgroundid, selectedDate]);

    

  
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
        setError("This place is already booked for the selected date. Please choose a different date or campground.");
        setShowAlert(true);
        setLoading(false);
        return;
      }

      await createBooking(
        selectedCampgroundid,
        session.user._id,
        selectedDate.toISOString(),
        new Date().toISOString(),
        session.user.token
      );
      setError(null);
      setAlertMessage("Booking created successfully");
    } catch (error) {
      setError(`${error}`);
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
    <main className="w-full flex flex-col items-center space-y-4 relative">
      {session && session.user.token ? (
        <>
          <div className="w-full max-w-lg space-y-2 mt-8 relative" style={{ backgroundColor: "#576453" }}>
            <div className="flex justify-center">
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
              className="w-full"
              style={{ backgroundColor: "#576453" }}
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book"}
            </Button>
          </div>
          {showAlert && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
              <Alert severity={error ? "error" : "success"}>{alertMessage}</Alert>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
