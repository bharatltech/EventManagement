import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="relative bg-red-100 border border-red-300 text-red-800 px-5 py-4 rounded-xl shadow-sm flex items-start mb-4 animate-fadeIn">
      {/* Icon */}
      <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-red-600" />

      {/* Message */}
      <div className="flex-1 text-sm font-medium">{message}</div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
