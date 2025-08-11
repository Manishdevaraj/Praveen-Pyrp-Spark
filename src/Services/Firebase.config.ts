// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc7DbU2_DciDx8hD6lqI7RHh_NnUSdJy4",
  authDomain: "sri-venkatesh-traders.firebaseapp.com",
  databaseURL: "https://sri-venkatesh-traders-default-rtdb.firebaseio.com",
  projectId: "sri-venkatesh-traders",
  storageBucket: "sri-venkatesh-traders.firebasestorage.app",
  messagingSenderId: "557796527387",
  appId: "1:557796527387:web:8450d7a8bf857ac583d7be",
  measurementId: "G-C7WHD4ZKCE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const storage = getStorage(app);
