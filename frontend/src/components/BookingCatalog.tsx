import React, { useState, useEffect } from "react";
import { BookingsJson, BookingJson } from "../../interface";
import CampgroundCatalog2 from "@/app/booking/campgroundCatalog2";
import updateBooking from "@/libs/updateBooking";
import { CampgroundJson } from "../../interface";
import { useSession } from "next-auth/react";
import getCampgrounds from "@/libs/getCampgrounds";
import deleteBooking from "@/libs/deleteBooking";
import ImageBox from "./ImageBox"; // Import ImageBox component
import getExistingBookings from "@/libs/getExistingBooking";
import Alert from "@mui/material/Alert"; // Import Alert component from Material UI
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BookingCatalog({
  bookingJson,
  userRole,
}: {
  bookingJson: BookingsJson;
  userRole: string;
}) {
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [selectedCampgroundid, setSelectedCampgroundid] = useState<
    string | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCampground, setSelectedCampground] =
    useState<CampgroundJson | null>(null);
  const [bookings, setBookings] = useState<BookingJson[]>([]);
  const [isError, setIsError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingBookings, setExistingBookings] = useState([]);
  const [isHovered, setIsHovered] = useState<string | null>(null); // Modified to track individual div hover state

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const fetchedCampgrounds = await getCampgrounds();
        setSelectedCampground(fetchedCampgrounds);
      } catch (error) {
        console.error("Error fetching campgrounds:", error);
      }
    };
    fetchCampgrounds();
  }, []);

  useEffect(() => {
    const fetchExistingBookings = async () => {
      try {
        if (selectedCampgroundid && selectedDate && session?.user.token) {
          const bookings = await getExistingBookings(
            selectedCampgroundid,
            selectedDate,
            session.user.token
          );
          setExistingBookings(bookings);
          localStorage.setItem("existingBookings", JSON.stringify(bookings));
        }
      } catch (error) {
        console.error("Error fetching existing bookings:", error);
      }
    };
    fetchExistingBookings();
  }, [selectedCampgroundid, selectedDate, session?.user.token]);

  useEffect(() => {
    setBookings(bookingJson.data);
  }, [bookingJson]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleEditModeToggle = (bookingId: string) => {
    setEditMode(bookingId === editMode ? null : bookingId);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
  };

  const handleSave = async (bookingId: string) => {
    try {
      setLoading(true);
      if (!session || !session.user.token) {
        console.error("Session or user token not available");
        return;
      }

      if (existingBookings.length > 0) {
        setIsError(true);
        setAlertMessage(
          "This place is already booked for the selected date. Please choose a different date or campground."
        );
        setShowAlert(true);
        setLoading(false);
        return;
      }

      if (!selectedCampgroundid) {
        setIsError(true);
        setAlertMessage("Please select a campground to book");
        setShowAlert(true);
        setLoading(false);
        return;
      }

      if (!selectedDate) {
        setIsError(true);
        setAlertMessage("Please select a date to book");
        setShowAlert(true);
        setLoading(false);
        return;
      }

      if (new Date(selectedDate) < new Date()) {
        setIsError(true);
        setAlertMessage("Cannot book with a date in the past");
        setShowAlert(true);
        setLoading(false);
        return;
      }

      await updateBooking(
        bookingId,
        selectedCampgroundid,
        selectedDate,
        session.user.token
      );
      window.location.reload();
    } catch (error) {
      setIsError(true);
      setAlertMessage(` ${error}`);
      setShowAlert(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      if (!session || !session.user.token) {
        console.error("Session or user token not available");
        return;
      }

      await deleteBooking(bookingId, session.user.token);
      console.log("Booking deleted successfully");

      // Remove the deleted booking from the state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      setIsError(true);
      setAlertMessage(`Error deleting booking: ${error}`);
      setShowAlert(true);
      console.error("Error deleting booking:", error);
    }
  };

  if (!selectedCampground) return null;
  // if(bookings.length == 0) {
  //   return(
  //     <div className="text-black text-center text-lg">
  //       empty
  //     </div>
  //   )
  // }

  return (
    <div className="relative m-5 grid grid-cols-1 gap-5">
      {bookings.map((bookingItem: BookingJson) => (
        <div
          key={bookingItem._id}
          className="relative border border-gray-200 p-4 rounded-lg shadow-md bg-green-100 flex items-center"
          onMouseEnter={() => setIsHovered(bookingItem._id)}
          onMouseLeave={() => setIsHovered(null)}
        >
          {editMode === bookingItem._id ? (
            <div className="flex flex-col">
              <CampgroundCatalog2
                campgroundJson={selectedCampground}
                onCampgroundChange={(value: string) =>
                  setSelectedCampgroundid(value)
                }
              />
              <input
                type="date"
                value={
                  selectedDate ? selectedDate.toISOString().split("T")[0] : ""
                }
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="text-black mt-2"
              />
              <div className="flex mt-2">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSave(bookingItem._id)}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="text-lg font-bold text-black flex items-center">
                <span>Campground: {bookingItem.campground.name}</span>
                {isHovered === bookingItem._id && (
                  <span className="flex mt-2 ml-4">
                    <ModeEditIcon
                      className="cursor-pointer mr-2"
                      onClick={() => handleEditModeToggle(bookingItem._id)}
                    />
                    <DeleteIcon
                      className="cursor-pointer  mr-2"
                      onClick={() => handleDelete(bookingItem._id)}
                    />
                  </span>
                )}
              </div>

              <div className="text-black">
                Booking Date: {new Date(bookingItem.Date).toLocaleDateString()}
              </div>

              <div className="text-black">
                Created At:{" "}
                {new Date(bookingItem.createdAt).toLocaleDateString()}
              </div>
              {userRole === "admin" && (
                <div className="text-black">Booked by: {bookingItem.user}</div>
              )}
            </div>
          )}
          <div className="w-32 ml-auto">
            <ImageBox imgSrc={`/img/${bookingItem.campground.name} CARD.jpg`} />
          </div>
        </div>
      ))}
      {showAlert && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <Alert severity="error">{alertMessage}</Alert>
          </div>
        </>
      )}
    </div>
  );
}
