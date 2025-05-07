import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/Api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'; // Import Button component

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSigningUp(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/courses');
    } catch (err) {
      setError('Failed to sign up. ' + (err.message || 'Please try again.'));
      setIsSigningUp(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${isSigningUp ? 'opacity-90' : 'opacity-100'}`}>
      <div className="bg-gray-50 p-8 rounded-xl shadow-xl w-full max-w-md text-center transform transition-all duration-500 hover:scale-105 animate-fade-in">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign Up for LearnHub</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4 text-left">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{' '}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            className="text-indigo-600 font-medium hover:text-teal-500 hover:underline transition-colors duration-300"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;