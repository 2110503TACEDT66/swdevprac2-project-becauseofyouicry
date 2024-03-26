"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import createBooking from "@/libs/createBooking";
import LocationDateReserve from "@/components/LocationDateReserve";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import getCampgrounds from "@/libs/getCampgrounds";// Import getCampgrounds function

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
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date
  const [options, setOptions] = useState([]); // State to store campground options
  const [loadingOptions, setLoadingOptions] = useState(false); // State to manage loading state for options

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        setLoadingOptions(true);
        const campgrounds = await getCampgrounds(); // Fetch campgrounds from backend
        setOptions(campgrounds.map((campground:any) => ({ name: campground.name }))); // Set campground options
      } catch (error) {
        console.error("Error fetching campgrounds:", error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchCampgrounds();
  }, []); // Fetch campgrounds on component mount

  const handleBooking = async () => {
    try {
      setLoading(true);
      if (!session || !session.user.token) {
        console.error("Session or user token not available");
        return;
      }

      await createBooking(
        "66026c08c8c2524b221e7ca1",
        session.user._id,
        selectedDate.toISOString(), // Use ISO string format for selected date
        new Date().toISOString(), // Use ISO string format for createdAt
        session.user.token
      );
      console.log("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex flex-col items-center space-y-4">
      {session && session.user.token ? (
        <>
          <div
            className="w-full max-w-lg space-y-2 mt-8"
            style={{ backgroundColor: "#576453" }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              loading={loadingOptions}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Campground" />}
            />
            <LocationDateReserve
              onDateSelect={setSelectedDate} // Pass setSelectedDate as prop
            />
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
