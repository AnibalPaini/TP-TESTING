import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBvzkJD1poyDmv1gb3_yWVAyM38Cuo7chA",
  authDomain: "testing-736bf.firebaseapp.com",
  projectId: "testing-736bf",
  storageBucket: "testing-736bf.firebasestorage.app",
  messagingSenderId: "405195624632",
  appId: "1:405195624632:web:294819c3a3c9953648a44d",
  measurementId: "G-S5TQMKGVJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
