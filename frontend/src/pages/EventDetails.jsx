import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Ticket, X } from 'lucide-react';
import useEventStore from '../store/eventStore';
import useBookingStore from '../store/bookingStore';
import useAuthStore from '../store/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Layout from '../components/layout/Layout';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentEvent, loading, fetchEvent } = useEventStore();
  const { createBooking } = useBookingStore();
  const { isAuthenticated } = useAuthStore();
  const [seats, setSeats] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    fetchEvent(id);
  }, [id, fetchEvent]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }
    if (currentEvent.status !== 'Upcoming') {
      toast.error('Can only book upcoming events');
      return;
    }
    if (currentEvent.availableSeats < seats) {
      toast.error('Not enough seats available');
      return;
    }

    setIsBooking(true);
    try {
      await createBooking({ eventId: id, seats });
      toast.success('Booking successful!');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setIsBooking(false);
    }
  };

  if (loading || !currentEvent) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return 'bg-green-100 text-green-800';
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      {/* Back Button */}
      <button
        onClick={() => navigate('/events')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          {currentEvent.imageUrl ? (
            <img
              src={currentEvent.imageUrl}
              alt={currentEvent.title}
              className="w-full h-96 object-cover rounded-xl shadow-md"
            />
          ) : (
            <div className="w-full h-96 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
              <Calendar className="w-24 h-24 text-white opacity-50" />
            </div>
          )}

          {/* Title and Status */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{currentEvent.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentEvent.status)}`}>
              {currentEvent.status}
            </span>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Event</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{currentEvent.description}</p>
          </div>

          {/* Event Details */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
            <div className="space-y-4">
              <DetailItem icon={<Calendar className="w-5 h-5 text-primary-600" />} label="Date" value={currentEvent.formattedDate} />
              <DetailItem icon={<Clock className="w-5 h-5 text-primary-600" />} label="Time" value={`${currentEvent.startTime} - ${currentEvent.endTime}`} />
              <DetailItem icon={<MapPin className="w-5 h-5 text-primary-600" />} label="Location" value={currentEvent.location} subValue={currentEvent.locationType} />
              <DetailItem icon={<Users className="w-5 h-5 text-primary-600" />} label="Capacity" value={`${currentEvent.availableSeats} available out of ${currentEvent.capacity}`} />
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Book Your Tickets</h2>

            {currentEvent.status === 'Upcoming' && currentEvent.availableSeats > 0 ? (
              <>
                <div>
                  <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-2">Seats (Max 2)</label>
                  <select
                    id="seats"
                    value={seats}
                    onChange={(e) => setSeats(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value={1}>1 Seat</option>
                    <option value={2}>2 Seats</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between text-gray-600"><span>Seats:</span><span className="font-semibold">{seats}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Available:</span><span className="font-semibold">{currentEvent.availableSeats}</span></div>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="w-full bg-primary-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-700 transition"
                >
                  {isBooking ? <LoadingSpinner size="sm" /> : <>
                    <Ticket className="w-4 h-4" /> Book Now
                  </>}
                </button>

                {!isAuthenticated && (
                  <p className="text-xs text-gray-500 text-center mt-2">Please login to book tickets</p>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                {currentEvent.status === 'Completed' ? <p className="text-gray-600 mb-2">This event has ended</p> :
                currentEvent.availableSeats === 0 ? <p className="text-gray-600 mb-2">Event is fully booked</p> :
                <p className="text-gray-600 mb-2">Booking not available</p>}
                <button onClick={() => navigate('/events')} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition">Browse Other Events</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Reusable detail row component
const DetailItem = ({ icon, label, value, subValue }) => (
  <div className="flex items-start gap-3">
    {icon}
    <div>
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-gray-600">{value}</p>
      {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
    </div>
  </div>
);

export default EventDetails;
