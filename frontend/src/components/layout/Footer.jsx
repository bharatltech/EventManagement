import React from 'react';
import { Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Calendar className="w-6 h-6" />
            <span className="font-extrabold text-xl tracking-wide">EventManagament</span>
          </div>

          {/* Copyright */}
          <p className="text-white/80 text-sm hover:text-white transition">
            © {new Date().getFullYear()} EventManagement. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
