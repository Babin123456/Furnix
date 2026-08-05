// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration pulled from environment variables
const firebaseConfig = {
  apiKey: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) || process.env.VITE_FIREBASE_API_KEY || "AIzaSyAEJ2OlyaKM3F74LC9-tyPUMdFIvIT1I0I",
  authDomain: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) || process.env.VITE_FIREBASE_AUTH_DOMAIN || "furnix-63f75.firebaseapp.com",
  projectId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_PROJECT_ID) || process.env.VITE_FIREBASE_PROJECT_ID || "furnix-63f75",
  storageBucket: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || process.env.VITE_FIREBASE_STORAGE_BUCKET || "furnix-63f75.firebasestorage.app",
  messagingSenderId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1083767598996",
  appId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_APP_ID) || process.env.VITE_FIREBASE_APP_ID || "1:1083767598996:web:a09663caa989075a18e981",
  measurementId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) || process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TSHD16PRYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and export it so other files can use it
export const auth = getAuth(app);
