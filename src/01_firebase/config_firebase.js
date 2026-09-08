// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIFazQ4eyhrkOcLLEuUCYrdWnRdzanJnw",
  authDomain: "cpre3290-expedia-clone.firebaseapp.com",
  projectId: "cpre3290-expedia-clone",
  storageBucket: "cpre3290-expedia-clone.firebasestorage.app",
  messagingSenderId: "822203642546",
  appId: "1:822203642546:web:f3a76c0470b5d5af240fab",
  measurementId: "G-3S3TEN47S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
