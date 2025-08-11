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
  apiKey: "AIzaSyBGtgHrYVXYl50b-JDI7SOrOiC5WqIs8qY",
  authDomain: "bullsstoreeasy-ecdb6.firebaseapp.com",
  databaseURL: "https://bullsstoreeasy-ecdb6-default-rtdb.firebaseio.com",
  projectId: "bullsstoreeasy-ecdb6",
  storageBucket: "bullsstoreeasy-ecdb6.appspot.com",
  messagingSenderId: "912819255297",
  appId: "1:912819255297:web:25d5aacabc07ce9c80a800",
  measurementId: "G-6SBZVXW1G0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const storage = getStorage(app);
