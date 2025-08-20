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
  apiKey: "AIzaSyCkJMHqMcC2e-0S6j2bGGZRJTRAyF2ujFM",
  authDomain: "bullsstoreeasy-3bcd5.firebaseapp.com",
  databaseURL: "https://bullsstoreeasy-3bcd5-default-rtdb.firebaseio.com",
  projectId: "bullsstoreeasy-3bcd5",
  storageBucket: "bullsstoreeasy-3bcd5.appspot.com",
  messagingSenderId: "723689229641",
  appId: "1:723689229641:web:8494a1c6b98ea9efc11e98",
  measurementId: "G-0W8K4ZXGMQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const storage = getStorage(app);
