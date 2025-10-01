import React from 'react';
import { Filter, X } from 'lucide-react';

const EventFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = ['Music', 'Tech', 'Business', 'Sports', 'Arts', 'Education', 'Other'];
  const locationTypes = ['Online', 'In-Person'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed'];

  const hasActiveFilters = Object.values(filters).some((value) => value !== '');

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={onFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Location Type</label>
          <select
            name="locationType"
            value={filters.locationType}
            onChange={onFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          >
            <option value="">All Types</option>
            {locationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={onFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          >
            <option value="">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={onFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={onFilterChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
