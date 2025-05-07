import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, onClick, children, type = 'button', className = '' }) => {
  const baseStyles =
    'inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-teal-500 transition-all duration-300 transform hover:scale-105';

  if (to) {
    // If 'to' prop is provided, render as a Link
    return (
      <Link to={to} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as a regular button
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;