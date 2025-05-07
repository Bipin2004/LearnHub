import React from 'react';
import Button from '../components/Button'; // Import the Button component

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center animate-fade-in">
      <div className="bg-gray-50 p-10 rounded-xl shadow-xl max-w-2xl">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Welcome to LearnHub</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover a world of knowledge with our interactive courses and quizzes.
        </p>
        <Button to="/courses">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default Home;