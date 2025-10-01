import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Ticket, Search, Shield, Zap } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Home = () => {
  const navigate = useNavigate();

  // Updated content for each card
  const features = [
    {
      icon: <Search className="w-12 h-12 text-white" />,
      title: 'Discover Events',
      description: 'Easily explore concerts, workshops, meetups, and conferences happening around you.',
      bg: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    },
    {
      icon: <Ticket className="w-12 h-12 text-white" />,
      title: 'Seamless Booking',
      description: 'Reserve your tickets instantly with simple, one-click booking options.',
      bg: 'bg-gradient-to-r from-pink-500 to-red-500',
    },
    {
      icon: <Users className="w-12 h-12 text-white" />,
      title: 'Manage Your Bookings',
      description: 'Keep track of your booked events and modify or cancel with ease.',
      bg: 'bg-gradient-to-r from-green-400 to-teal-500',
    },
    {
      icon: <Shield className="w-12 h-12 text-white" />,
      title: 'Safe & Reliable',
      description: 'We ensure your personal data and transactions are fully secure and reliable.',
      bg: 'bg-gradient-to-r from-yellow-400 to-orange-400',
    },
    {
      icon: <Zap className="w-12 h-12 text-white" />,
      title: 'Instant Updates',
      description: 'Get notifications and real-time updates about your bookings and events.',
      bg: 'bg-gradient-to-r from-purple-400 to-pink-400',
    },
    {
      icon: <Calendar className="w-12 h-12 text-white" />,
      title: 'Organized Calendar View',
      description: 'View all your upcoming events in an intuitive calendar interface for better planning.',
      bg: 'bg-gradient-to-r from-blue-400 to-cyan-500',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}


      {/* Features Section in List View */}
      <section className="max-w-4xl mx-auto mb-20 space-y-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EvenetManagement?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Experience a smarter, faster, and more secure way to manage your events
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-6 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ${feature.bg}`}
            >
              <div>{feature.icon}</div>
              <div>
                <h3 className="text-white text-2xl font-bold mb-1">{feature.title}</h3>
                <p className="text-white text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16 rounded-2xl text-center px-6 md:px-16">
        <Calendar className="w-16 h-16 text-indigo-700 mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Start Exploring?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Join thousands of users who trust EvenetManagement for their event booking needs
        </p>
        <button
          onClick={() => navigate('/events')}
          className="bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-800 transition text-lg"
        >
          Explore Events Now
        </button>
      </section>
    </Layout>
  );
};

export default Home;
