import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEnrolledCourses } from '../Services/Api';
import { auth } from '../Services/Api';

// Define image URLs for specific courses (same as Home.js)
const courseImages = {
  "Introduction to JavaScript": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "Introduction to Python": "https://niltechedu.com/blog/wp-content/uploads/2021/11/python-programming-language.png",
  "React Fundamentals": "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  "Data Structures and Algorithms": "https://www.synergisticit.com/wp-content/uploads/2020/09/Data-structures-and-algorithms-new.webp",
  "Firebase for Beginners": "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png"
};

const YourCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch enrolled courses for the logged-in user
        const fetchEnrolledCourses = async () => {
          try {
            const courses = await getEnrolledCourses(currentUser.uid);
            setEnrolledCourses(courses);
          } catch (err) {
            setError('Failed to load your courses: ' + err.message);
          }
        };
        fetchEnrolledCourses();
      } else {
        setEnrolledCourses([]); // Clear enrolled courses if user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p className="text-gray-400 text-center mt-8">Please log in to view your courses.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Courses</h1>
      {error && <p className="text-red-400 text-center">{error}</p>}
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map(course => (
            <div key={course.id} className="bg-zinc-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src={courseImages[course.title] || `https://picsum.photos/300/200?random=${course.id}`} 
                alt={course.title} 
                className="w-full h-48 object-contain mb-4 rounded-lg bg-white p-4" 
              />
              <h3 className="text-xl font-medium text-white mb-2">{course.title}</h3>
              <p className="text-gray-300 mb-4">{course.description}</p>
              <Link to={`/courses/${course.id}`} className="text-indigo-400 hover:text-indigo-300 font-medium">Continue Learning</Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">You haven't enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default YourCourses;