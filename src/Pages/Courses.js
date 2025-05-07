import React, { useEffect, useState } from 'react';
import { getCourses } from '../Services/Api';
import Button from '../components/Button'; // Import Button component

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 animate-fade-in">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">All Courses</h2>
      {loading ? (
        <p className="text-gray-600 text-center">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">No courses found.</p>
            ) : (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-gray-50 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <Button to={`/courses/${course.id}`}>
                    View Details →
                  </Button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;