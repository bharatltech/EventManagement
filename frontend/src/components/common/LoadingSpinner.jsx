import React from 'react';

const LoadingSpinner = ({ size = 'md', fullScreen = false, message }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const spinner = (
    <div
      className={`${sizeClasses[size]} border-4 border-gray-200 border-t-transparent border-l-primary-600 rounded-full animate-spin`}
    ></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        {spinner}
        {message && <p className="mt-4 text-gray-700 font-medium animate-pulse">{message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      {spinner}
      {message && <p className="mt-2 text-gray-600 text-sm">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
