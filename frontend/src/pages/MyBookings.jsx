import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import useBookingStore from '../store/bookingStore';
import BookingCard from '../components/bookings/BookingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Layout from '../components/layout/Layout';

const MyBookings = () => {
  const { bookings, loading, fetchMyBookings, cancelBooking } = useBookingStore();
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'cancelled'

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  const handleCancelBooking = async (id) => {
    await cancelBooking(id);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const groupBookingsByDate = () => {
    const grouped = {};
    filteredBookings.forEach((booking) => {
      const date = booking.event.formattedDate;
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(booking);
    });
    return grouped;
  };

  const renderEmptyState = () => (
    <div className="text-center py-16">
      <CalendarIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">No bookings found</h3>
      <p className="text-gray-500">You haven't booked any events yet.</p>
    </div>
  );

  const renderListView = () => {
    if (filteredBookings.length === 0) return renderEmptyState();
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
        ))}
      </div>
    );
  };

  const renderCalendarView = () => {
    const groupedBookings = groupBookingsByDate();
    const dates = Object.keys(groupedBookings).sort();

    if (dates.length === 0) return renderEmptyState();

    return (
      <div className="space-y-8">
        {dates.map((date) => (
          <div key={date}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary-600" /> {date}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedBookings[date].map((booking) => (
                <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your event bookings</p>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-3xl p-6 mb-8 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition ${
              view === 'list' ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <List className="w-5 h-5" /> List
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition ${
              view === 'calendar' ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CalendarIcon className="w-5 h-5" /> Calendar
          </button>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
          >
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Display */}
      {loading ? <LoadingSpinner /> : view === 'list' ? renderListView() : renderCalendarView()}
    </Layout>
  );
};

export default MyBookings;
