import React, { useState, useEffect } from 'react';
import { BookingsJson, BookingJson } from '../../interface';
import CampgroundCatalog2 from '@/app/booking/campgroundCatalog2';
import updateBooking from '@/libs/updateBooking';
import { CampgroundJson } from '../../interface';
import { useSession } from 'next-auth/react';
import getCampgrounds from '@/libs/getCampgrounds';
import deleteBooking from '@/libs/deleteBooking';
import ImageBox from './ImageBox'; // Import ImageBox component

export default function BookingCatalog({ bookingJson , userRole}: { bookingJson: BookingsJson , userRole:string}) {
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [selectedCampgroundid, setSelectedCampgroundid] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCampground, setSelectedCampground] = useState<CampgroundJson | null>(null);
  const [bookings, setBookings] = useState<BookingJson[]>([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const fetchedCampgrounds = await getCampgrounds();
        setSelectedCampground(fetchedCampgrounds);
      } catch (error) {
        console.error('Error fetching campgrounds:', error);
      }
    };
    fetchCampgrounds();
  }, []);

  useEffect(() => {
    setBookings(bookingJson.data);
  }, [bookingJson]);

  const handleEditModeToggle = (bookingId: string) => {
    setEditMode(bookingId === editMode ? null : bookingId);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
  };

  const handleSave = async (bookingId: string) => {
    if (selectedCampgroundid && selectedDate) {
      try {
        if (!session || !session.user.token) {
          console.error('Session or user token not available');
          return;
        }
        
        await updateBooking(bookingId, selectedCampgroundid, selectedDate, session.user.token);
        console.log('Booking updated successfully');
        setEditMode(null); // Exit edit mode after saving
        // Refresh
      window.location.reload();
      } catch (error) {
        console.error('Error updating booking:', error);
      }
    } else {
      console.error('Incomplete form data');
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      if (!session || !session.user.token) {
        console.error('Session or user token not available');
        return;
      }
      
      await deleteBooking(bookingId, session.user.token);
      console.log('Booking deleted successfully');

      // Remove the deleted booking from the state
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
      // Refresh
      window.location.reload();

    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  if (!selectedCampground) return null;

  return (
    <div className="m-5 grid grid-cols-1 gap-5">
    {bookings.map((bookingItem: BookingJson) => (
      <div key={bookingItem._id} className="relative border border-gray-200 p-4 rounded-lg shadow-md bg-green-100 flex items-center">
        {editMode === bookingItem._id ? (
          <div className="flex flex-col">
            <CampgroundCatalog2
              campgroundJson={selectedCampground}
              onCampgroundChange={(value: string) => setSelectedCampgroundid(value)}
            />
            <input
              type="date"
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="text-black mt-2"
            />
            <div className="flex mt-2">
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSave(bookingItem._id)}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-lg font-bold text-black">Campground: {bookingItem.campground.name}</div>
            <div className="text-black">Booking Date: {new Date(bookingItem.Date).toLocaleDateString()}</div>
            <div className="text-black">Created At: {new Date(bookingItem.createdAt).toLocaleDateString()}</div>
            {userRole === 'admin' && (
              <div className="text-black">Booked by: {bookingItem.user}</div>
            )}
            <div className="flex mt-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEditModeToggle(bookingItem._id)}>
                Edit Booking
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(bookingItem._id)}>
                Delete Booking
              </button>
            </div>
          </div>
        )}
        <div className="w-32 ml-auto">
          <ImageBox imgSrc={`/img/${bookingItem.campground.name} CARD.jpg`} /> {/* Use ImageBox with campground name */}
        </div>
      </div>
    ))}
  </div>
  
  );
}
