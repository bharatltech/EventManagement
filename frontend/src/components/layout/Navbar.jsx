import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, LogOut, User, LayoutDashboard } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white font-extrabold text-2xl tracking-wide"
          >
            <Calendar className="w-7 h-7" />
            <span>EventManagement</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/events"
              className="text-white/90 hover:text-white transition-colors text-lg"
            >
              Events
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-bookings"
                  className="text-white/90 hover:text-white transition-colors text-lg"
                >
                  My Bookings
                </Link>

                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors text-lg"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Admin</span>
                  </Link>
                )}

                <div className="flex items-center space-x-5 ml-4">
                  <div className="flex items-center space-x-2 text-white">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-5">
                <Link
                  to="/login"
                  className="text-white/90 hover:text-white transition-colors text-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold shadow hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
