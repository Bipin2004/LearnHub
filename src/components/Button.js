import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, onClick, children, className = '' }) => {
  const baseClasses = 'bg-indigo-600 text-white hover:bg-teal-500 py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex justify-center items-center';

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};

export default Button;