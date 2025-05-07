import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

// Check if Firebase environment variables are loaded
if (!process.env.REACT_APP_FIREBASE_API_KEY) {
  throw new Error("Missing Firebase configuration - check .env file!");
}

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication functions
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(`Signup failed: ${error.message}`);
  }
};

export { signInWithEmailAndPassword, signOut };

// Firestore operations
export const getCourses = async () => {
  try {
    const coursesCol = collection(db, 'courses');
    const snapshot = await getDocs(coursesCol);
    const courses = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (courses.length === 0) {
      throw new Error('No courses found.');
    }
    return courses;
  } catch (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }
};

export const getCourseById = async (id) => {
  try {
    const docRef = doc(db, 'courses', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    throw new Error(`Error fetching course by ID: ${error.message}`);
  }
};

export const enrollCourse = async (userId, courseId) => {
  if (!userId || !courseId) {
    throw new Error('User ID and Course ID are required.');
  }
  try {
    await setDoc(doc(db, 'enrollments', `${userId}_${courseId}`), {
      userId,
      courseId,
      enrolledAt: new Date(),
    });
  } catch (error) {
    throw new Error(`Error enrolling course: ${error.message}`);
  }
};

export const getQuizzesByCourseId = async (courseId) => {
  try {
    const quizzesCol = collection(db, `courses/${courseId}/quizzes`);
    const snapshot = await getDocs(quizzesCol);
    const quizzes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return quizzes;
  } catch (error) {
    throw new Error(`Error fetching quizzes: ${error.message}`);
  }
};

export { auth, db };