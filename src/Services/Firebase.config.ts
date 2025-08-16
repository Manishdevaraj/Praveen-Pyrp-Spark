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
  apiKey: "AIzaSyA5KAVqoyNlwJxJTALUAYmIQMczEU_7lzk",
  authDomain: "bullsstoreeasy-8d4e0.firebaseapp.com",
  databaseURL: "https://bullsstoreeasy-8d4e0-default-rtdb.firebaseio.com",
  projectId: "bullsstoreeasy-8d4e0",
  storageBucket: "bullsstoreeasy-8d4e0.appspot.com",
  messagingSenderId: "349987837127",
  appId: "1:349987837127:web:b40fc8dd4e51e82606dae2",
  measurementId: "G-SG4LY0JSFH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const storage = getStorage(app);
