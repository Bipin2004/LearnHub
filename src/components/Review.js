import React from 'react';

const Reviews = () => {
  const reviews = [
    { name: 'Alice', text: 'Amazing courses! Learned so much.' },
    { name: 'Bob', text: 'The quizzes are challenging and fun.' },
    { name: 'Charlie', text: 'Highly recommend LearnHub!' },
  ];

  return (
    <div className="py-10 bg-indigo-700 text-white">
      <h2 className="text-3xl font-semibold text-center mb-6">What Our Users Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 container mx-auto px-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-indigo-600 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <p className="text-gray-100 mb-4">{review.text}</p>
            <p className="text-teal-300 font-medium">— {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;