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
  const location = useLocation();

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

  // Determine if the current page is the home page
  const isHomePage = location.pathname === '/';

  // Conditionally apply the gradient background and particles
  const mainClassName = isHomePage
    ? "relative min-h-screen bg-black"
    : "relative min-h-screen bg-gradient-to-br from-indigo-600 to-teal-500";

  const hideReviewsOnPages = ['/login', '/signup', '/certificate'];
  const shouldShowReviews = !hideReviewsOnPages.some(path => location.pathname === path || location.pathname.startsWith(path));

  return (
    <div className={mainClassName}>
      {/* Only show ParticlesBackground on non-home pages */}
      {!isHomePage && <ParticlesBackground />}
      <nav className="relative z-10 bg-indigo-700 shadow-lg">
        <div className="w-full max-w-[1440px] mx-auto pl-4 pr-2 sm:pl-6 sm:pr-3 lg:pl-8 lg:pr-4 flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-teal-300 transition-colors duration-300">
            LearnHub
          </Link>
          <div className="flex items-center space-x-4 ml-auto">
            <Link to="/courses" className="text-white hover:text-teal-300 transition-colors duration-300">
              Courses
            </Link>
            <Link to="/certificate" className="text-white hover:text-teal-300 transition-colors duration-300">
              Certificate
            </Link>
            {user ? (
              <Button onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-teal-300 transition-colors duration-300">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-indigo-500 hover:bg-teal-500 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:courseId/quizzes" element={<Quizzes />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <div className="relative z-10">
        {shouldShowReviews && <Reviews />}
        <Footer />
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;