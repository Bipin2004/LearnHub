import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './Services/Api';
import { signOut } from 'firebase/auth';
import Home from './Pages/Home';
import Courses from './Pages/Courses';
import CourseDetails from './Pages/CourseDetails';
import Quizzes from './Pages/Quizzes';
import Certificate from './Pages/Certificate';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Reviews from './components/Review';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import Button from './components/Button';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Define pages where Reviews should NOT be displayed
  const hideReviewsOnPages = ['/login', '/signup', '/certificate'];
  const shouldShowReviews = !hideReviewsOnPages.includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-teal-500">
      {/* Particle Background */}
      <ParticlesBackground />

      {/* Navbar */}
      <nav className="relative z-10 bg-indigo-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-teal-300 transition-colors duration-300">
            LearnHub
          </Link>
          <div className="space-x-4">
            <Link to="/courses" className="text-white hover:text-teal-300 transition-colors duration-300">
              Courses
            </Link>
            <Link to="/quizzes" className="text-white hover:text-teal-300 transition-colors duration-300">
              Quizzes
            </Link>
            <Link to="/certificate" className="text-white hover:text-teal-300 transition-colors duration-300">
              Certificate
            </Link>
            {user ? (
              <Button onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login" className="text-white hover:text-teal-300 transition-colors duration-300">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      {/* Conditionally render Reviews and Footer */}
      <div className="relative z-10">
        {shouldShowReviews && <Reviews />}
        <Footer />
      </div>
    </div>
  );
};

// Wrap App with Router to use useLocation
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;