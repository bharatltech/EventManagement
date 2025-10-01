import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import useEventStore from '../store/eventStore';
import EventCard from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Layout from '../components/layout/Layout';

const Events = () => {
  const { events, loading, fetchEvents } = useEventStore();
  const [filters, setFilters] = useState({
    category: '',
    locationType: '',
    startDate: '',
    endDate: '',
    status: '',
  });

  useEffect(() => {
    fetchEvents(filters);
  }, [filters, fetchEvents]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      locationType: '',
      startDate: '',
      endDate: '',
      status: '',
    });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Events</h1>
        <p className="text-gray-600">Find and book amazing events near you</p>
      </div>

      {/* Filters */}
      <EventFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600 rounded-full shadow-lg">
            <Calendar className="w-12 h-12 text-white opacity-80" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">No events found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later</p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* Info */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {events.length} event{events.length !== 1 ? 's' : ''}
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Events;
