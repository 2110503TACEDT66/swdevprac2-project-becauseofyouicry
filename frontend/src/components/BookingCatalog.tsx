import React, { useState, useEffect } from 'react';
import { BookingsJson, BookingJson } from '../../interface';
import CampgroundCatalog2 from '@/app/booking/campgroundCatalog2';
import updateBooking from '@/libs/updateBooking';
import { CampgroundJson } from '../../interface';
import { useSession } from 'next-auth/react';
import getCampgrounds from '@/libs/getCampgrounds';
import deleteBooking from '@/libs/deleteBooking';

export default function BookingCatalog({ bookingJson }: { bookingJson: BookingsJson }) {
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
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  if (!selectedCampground) return null;

  return (
    <div
      style={{
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-around',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: '10px',
      }}
    >
      {bookings.map((bookingItem: BookingJson) => (
        <div key={bookingItem._id} className="relative">
          {editMode === bookingItem._id ? (
            <div>
              <CampgroundCatalog2
                campgroundJson={selectedCampground}
                onCampgroundChange={(value: string) => setSelectedCampgroundid(value)}
              />
              <input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="text-black"
              />
              <button className="text-black" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="text-black" onClick={() => handleSave(bookingItem._id)}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <div className="text-black">campground : {bookingItem.campground.name}</div>
              <div className="text-black">date : {bookingItem.Date}</div>
              <div className="text-black">createdAt : {bookingItem.createdAt}</div>
              <button className="text-black" onClick={() => handleEditModeToggle(bookingItem._id)}>
                Update Booking
              </button>
              <button className="text-black" onClick={() => handleDelete(bookingItem._id)}>
                Delete Booking
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
