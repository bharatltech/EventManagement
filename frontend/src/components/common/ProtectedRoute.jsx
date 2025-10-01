import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuthStore();

  // Show spinner while auth state is loading
  if (loading) {
    return <LoadingSpinner fullScreen message="Checking authentication..." />;
  }

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if route requires admin but user isn’t admin
  if (adminOnly && user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page. Please contact an administrator if you think this is a mistake.
        </p>
        <a
          href="/"
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
        >
          Go Back Home
        </a>
      </div>
    );
  }

  // Otherwise render the protected content
  return children;
};

export default ProtectedRoute;
