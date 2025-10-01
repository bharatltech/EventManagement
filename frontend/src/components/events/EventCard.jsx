import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-700 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Music: 'bg-purple-100 text-purple-700 border border-purple-200',
      Tech: 'bg-blue-100 text-blue-700 border border-blue-200',
      Business: 'bg-green-100 text-green-700 border border-green-200',
      Sports: 'bg-red-100 text-red-700 border border-red-200',
      Arts: 'bg-pink-100 text-pink-700 border border-pink-200',
      Education: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      Other: 'bg-gray-100 text-gray-700 border border-gray-200',
    };
    return colors[category] || colors.Other;
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      {/* Image */}
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <Calendar className="w-16 h-16 text-white opacity-60" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              event.status
            )}`}
          >
            {event.status}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-600 flex-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-600" />
            <span>{event.formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-600" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-600" />
            <span className="truncate">
              {event.location} ({event.locationType})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary-600" />
            <span>
              {event.availableSeats} / {event.capacity} seats available
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button className="w-full py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
