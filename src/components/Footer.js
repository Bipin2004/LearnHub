import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-200 mb-2">© 2025 LearnHub. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="text-teal-300 hover:underline transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="text-teal-300 hover:underline transition-colors duration-300">Terms of Service</a>
          <a href="#" className="text-teal-300 hover:underline transition-colors duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;