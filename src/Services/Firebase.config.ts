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
  apiKey: "AIzaSyDFu9RZab_aK7rSyZtvowwWdA4ckYDC_2I",
  authDomain: "bullsstoreeasy-1d42b.firebaseapp.com",
  databaseURL: "https://bullsstoreeasy-1d42b-default-rtdb.firebaseio.com",
  projectId: "bullsstoreeasy-1d42b",
  storageBucket: "bullsstoreeasy-1d42b.appspot.com",
  messagingSenderId: "437450676499",
  appId: "1:437450676499:web:5d75d355186ad5efcfe2e6",
  measurementId: "G-RY0272JCEV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const storage = getStorage(app);
