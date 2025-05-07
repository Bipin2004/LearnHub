import React from 'react';
import Button from '../components/Button'; // Import Button component

const Certificate = () => {
  return (
    <div className="min-h-screen flex items-center justify-center animate-fade-in">
      <div className="bg-gray-50 p-8 rounded-xl shadow-xl max-w-lg text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Certificate of Completion</h2>
        <p className="text-gray-600 mb-6">
          Congratulations! You have completed the course.
        </p>
        <Button>
          Download Certificate
        </Button>
      </div>
    </div>
  );
};

export default Certificate;