import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-indigo-600 to-teal-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Master New Skills with LearnHub</h1>
          <p className="text-xl md:text-2xl mb-8">Join thousands of learners exploring top courses from expert instructors.</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Button to="/courses" className="bg-white text-zinc-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
              Explore Courses
            </Button>
            <input
              type="text"
              placeholder="Search for courses..."
              className="px-4 py-3 rounded-lg w-full md:w-80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Explore Our Top Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Introduction to JavaScript" className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Introduction to JavaScript</h3>
              <p className="text-gray-600 mb-4">Learn the basics of JavaScript to build interactive web applications.</p>
              <Link to="/courses/course1" className="text-indigo-500 hover:text-indigo-700 font-medium">Learn More</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://niltechedu.com/blog/wp-content/uploads/2021/11/python-programming-language.png" alt="Introduction to Python" className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Introduction to Python</h3>
              <p className="text-gray-600 mb-4">Master Python programming for data analysis and automation.</p>
              <Link to="/courses/course3" className="text-indigo-500 hover:text-indigo-700 font-medium">Learn More</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://www.patterns.dev/img/reactjs/react-logo@3x.svg" alt="React Fundamentals" className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">React Fundamentals</h3>
              <p className="text-gray-600 mb-4">Build dynamic user interfaces with React and modern JavaScript.</p>
              <Link to="/courses/course4" className="text-indigo-500 hover:text-indigo-700 font-medium">Learn More</Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button to="/courses" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-teal-500">See All Courses</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"LearnHub transformed my career with its practical, well-structured courses!"</p>
              <p className="text-indigo-500 font-medium">Sarah L.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"The quizzes and certificates keep me motivated to learn more."</p>
              <p className="text-indigo-500 font-medium">John D.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">"I love the community support and expert instructors!"</p>
              <p className="text-indigo-500 font-medium">Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-6">Sign up now and unlock access to all our courses.</p>
          <Button to="/signup" className="bg-white text-zinc-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
            Sign Up Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;