// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-blog-754f2.firebaseapp.com",
  projectId: "react-blog-754f2",
  storageBucket: "react-blog-754f2.appspot.com",
  messagingSenderId: "302814475944",
  appId: "1:302814475944:web:1a8f678be95d3fceb2b49d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);