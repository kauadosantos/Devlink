
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDIsAIeoK-CuX3P32BbBPCNvxrqm-om8GY",
  authDomain: "reactlink-caa3b.firebaseapp.com",
  projectId: "reactlink-caa3b",
  storageBucket: "reactlink-caa3b.firebasestorage.app",
  messagingSenderId: "777492910632",
  appId: "1:777492910632:web:5fd0746acb6e7ad6b41b1d",
  measurementId: "G-4381218XYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)

export {auth , db , analytics}