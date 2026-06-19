// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC1pMaB9SRLsZWWhrHiUMYUF7zNNTgWSA",
  authDomain: "druid-e28a5.firebaseapp.com",
  projectId: "druid-e28a5",
  storageBucket: "druid-e28a5.firebasestorage.app",
  messagingSenderId: "92990634906",
  appId: "1:92990634906:web:14345204f8866f654dd823",
  measurementId: "G-SCWDS25CCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);