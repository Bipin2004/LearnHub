import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCourseById, enrollCourse, isUserEnrolled } from '../Services/Api';
import Button from '../components/Button';
import { auth } from '../Services/Api';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log('User ID:', currentUser.uid); // Debug: Log user ID
        // Check if the user is already enrolled in the course
        const checkEnrollment = async () => {
          try {
            const enrolled = await isUserEnrolled(currentUser.uid, id);
            setIsEnrolled(enrolled);
          } catch (err) {
            console.error('Error checking enrollment:', err);
          }
        };
        checkEnrollment();
      } else {
        console.log('No user logged in');
      }
    });

    // Fetch course details
    const fetchCourse = async () => {
      try {
        console.log('Course ID:', id); // Debug: Log course ID
        const data = await getCourseById(id);
        if (!data) {
          setError('Course not found.');
        } else {
          setCourse(data);
        }
      } catch (err) {
        setError('Failed to load course: ' + err.message);
      }
    };

    fetchCourse();

    return () => unsubscribe();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      console.log('Enrolling user:', user.uid, 'in course:', id); // Debug: Log before enrolling
      await enrollCourse(user.uid, id);
      setIsEnrolled(true);
      setFlashMessage('Course enrolled!');
      // Clear the flash message after 3 seconds
      setTimeout(() => setFlashMessage(null), 3000);
    } catch (err) {
      console.error('Enrollment error:', err.message); // Debug: Log the exact error
      setError('Failed to enroll: ' + err.message);
    }
  };

  if (error) {
    return <p className="text-red-400 text-center">{error}</p>;
  }

  if (!course) {
    return <p className="text-gray-400 text-center">Loading course...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Flash Message */}
      {flashMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {flashMessage}
        </div>
      )}

      <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
      <p className="text-gray-300 mb-6">{course.description}</p>

      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">What You'll Learn</h2>
        <ul className="list-disc list-inside text-gray-300">
          {course["What you'll learn"]?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Duration</h2>
        <p className="text-gray-300">{course.duration}</p>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={handleEnroll}
          className={`${
            isEnrolled || !user ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-400'
          } text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300`}
          disabled={isEnrolled || !user}
        >
          {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
        </Button>
        <Link to={`/courses/${id}/quizzes`}>
          <Button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-400 transition-all duration-300">
            Take Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetails;   