import React, { useEffect, useState } from 'react';
import { getQuizzesByCourseId } from '../Services/Api';
import Button from '../components/Button'; // Import Button component

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const courseId = '1'; // Replace with dynamic courseId if needed
        const data = await getQuizzesByCourseId(courseId);
        setQuizzes(data);
      } catch (err) {
        setError('Failed to load quizzes.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <p className="text-gray-600 text-center">Loading quizzes...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="py-10 animate-fade-in">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">No quizzes available.</p>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-gray-50 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-2">Questions: {quiz.questions}</p>
              <p className="text-gray-600 mb-4">Duration: {quiz.duration} mins</p>
              <Button>
                Start Quiz
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Quizzes;