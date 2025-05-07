import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, enrollCourse } from '../Services/Api';
import { auth } from '../Services/Api';
import Button from '../components/Button';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    try {
      await enrollCourse(id, auth.currentUser.uid);
      alert('Enrolled successfully!');
    } catch (err) {
      setError('Failed to enroll in the course.');
    }
  };

  if (loading) return <p className="text-gray-600 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!course) return <p className="text-gray-600 text-center">Course not found.</p>;

  return (
    <div className="py-10 animate-fade-in">
      <div className="bg-gray-50 p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{course.title}</h2>
        <p className="text-gray-600 mb-6">{course.description}</p>
        <div className="space-y-4">
          <Button onClick={handleEnroll} className="w-full">
            Enroll Now
          </Button>
          <Button to={`/courses/${id}/quizzes`} className="w-full">
            View Quizzes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;