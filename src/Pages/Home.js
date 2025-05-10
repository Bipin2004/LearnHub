import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { getFeaturedCourses } from '../Services/Api';

// Define image URLs for specific courses
const courseImages = {
  "Introduction to JavaScript": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "Introduction to Python": "https://niltechedu.com/blog/wp-content/uploads/2021/11/python-programming-language.png",
  "React Fundamentals": "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  "Data Structures and Algorithms": "https://www.synergisticit.com/wp-content/uploads/2020/09/Data-structures-and-algorithms-new.webp",
  "Firebase for Beginners": "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png"
};

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const courses = await getFeaturedCourses();
        setFeaturedCourses(courses);
      } catch (err) {
        setError('Failed to load featured courses: ' + err.message);
      }
    };
    fetchFeaturedCourses();
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="hero bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Master New Skills with LearnHub</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Join thousands of learners exploring top courses from expert instructors.</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Button to="/courses" className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-400 transition-all duration-300">
              Explore Courses
            </Button>
            <input
              type="text"
              placeholder="Search for courses..."
              className="px-4 py-3 rounded-lg w-full md:w-80 bg-zinc-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses py-16 bg-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">Explore Our Top Courses</h2>
          {error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.length > 0 ? (
                featuredCourses.map(course => (
                  <div key={course.id} className="bg-zinc-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={courseImages[course.title] || `https://picsum.photos/300/200?random=${course.id}`} 
                      alt={course.title} 
                      className="w-full h-48 object-contain mb-4 rounded-lg bg-white p-4" 
                    />
                    <h3 className="text-xl font-medium text-white mb-2">{course.title}</h3>
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    <Link to={`/courses/${course.id}`} className="text-indigo-400 hover:text-indigo-300 font-medium">Learn More</Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center col-span-full">Loading courses...</p>
              )}
            </div>
          )}
          <div className="text-center mt-8">
            <Button to="/courses" className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-400">See All Courses</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-16 bg-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-600 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">"LearnHub transformed my career with its practical, well-structured courses!"</p>
              <p className="text-indigo-400 font-medium">Sarah L.</p>
            </div>
            <div className="bg-zinc-600 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">"The quizzes and certificates keep me motivated to learn more."</p>
              <p className="text-indigo-400 font-medium">John D.</p>
            </div>
            <div className="bg-zinc-600 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">"I love the community support and expert instructors!"</p>
              <p className="text-indigo-400 font-medium">Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-6 text-gray-200">Sign up now and unlock access to all our courses.</p>
          <Button to="/signup" className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-400 transition-all duration-300">
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;