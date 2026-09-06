import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAssgHoxiwdCLNVLKzM5qAtTQMnNnLj7zo",
  authDomain: "renthouse-bcae9.firebaseapp.com",
  projectId: "renthouse-bcae9",
  storageBucket: "renthouse-bcae9.firebasestorage.app",
  messagingSenderId: "150149881061",
  appId: "1:150149881061:web:05ee6f66747139160d880c",
  measurementId: "G-6K28HWQEZR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;