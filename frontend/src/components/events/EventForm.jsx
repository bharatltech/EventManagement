import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const EventForm = ({ event, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tech',
    location: '',
    locationType: 'Online',
    eventDate: '',
    startTime: '',
    endTime: '',
    capacity: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        category: event.category || 'Tech',
        location: event.location || '',
        locationType: event.locationType || 'Online',
        eventDate: event.eventDate || '',
        startTime: event.startTime || '',
        endTime: event.endTime || '',
        capacity: event.capacity || '',
        imageUrl: event.imageUrl || '',
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categories = ['Music', 'Tech', 'Business', 'Sports', 'Arts', 'Education', 'Other'];
  const locationTypes = ['Online', 'In-Person'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              required
            />
          </div>

          {/* Category & Location Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Type *</label>
              <select
                name="locationType"
                value={formData.locationType}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
              >
                {locationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Convention Center or Zoom Meeting"
              className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              required
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
              />
            </div>
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="border border-gray-300 rounded-xl px-4 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="sm" /> : null}
              <span>{event ? (loading ? 'Updating...' : 'Update Event') : (loading ? 'Creating...' : 'Create Event')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
