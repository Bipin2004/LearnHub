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
        // Validate "What you'll learn"
        let whatYoullLearn = data["What you'll learn"];
        if (!Array.isArray(whatYoullLearn)) {
          console.warn(`"What you'll learn" for course ${id} is not an array:`, whatYoullLearn);
          whatYoullLearn = ['Learning outcomes not available.'];
        } else if (whatYoullLearn.length === 0) {
          whatYoullLearn = ['No learning outcomes specified.'];
        }
        setCourse({
          ...data,
          whatYoullLearn, // Store it as whatYoullLearn for consistency in the component
          duration: data.duration || 'Duration not specified.',
        });
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
        <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-800 mb-3">What You'll Learn</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {course.whatYoullLearn.map((item, index) => (
              <li key={index} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-3">Duration</h3>
          <p className="text-gray-600">{course.duration}</p>
        </div>
        <div className="flex justify-center space-x-4 flex-wrap gap-y-4">
          <Button onClick={handleEnroll} className="w-40 bg-indigo-700 hover:bg-teal-600">
            Enroll Now
          </Button>
          <Button to={`/courses/${id}/quizzes`} className="w-40 bg-indigo-500 hover:bg-teal-400">
            View Quizzes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;