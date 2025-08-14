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
  apiKey: "AIzaSyDtcBLrZxMtB0xSoLNtNQoZDD6Pvx56EKg",
  authDomain: "harini-priya-crackers.firebaseapp.com",
  databaseURL: "https://harini-priya-crackers-default-rtdb.firebaseio.com",
  projectId: "harini-priya-crackers",
  storageBucket: "harini-priya-crackers.firebasestorage.app",
  messagingSenderId: "577434340440",
  appId: "1:577434340440:web:e2203003bced5ba8d24e2d",
  measurementId: "G-SPJDTQQ6ZZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const storage = getStorage(app);
