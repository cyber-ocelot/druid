// Initialize firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Website's firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAC1pMaB9SRLsZWWhrHiUMYUF7zNNTgWSA",
  authDomain: "druid-e28a5.firebaseapp.com",
  projectId: "druid-e28a5",
  storageBucket: "druid-e28a5.firebasestorage.app",
  messagingSenderId: "92990634906",
  appId: "1:92990634906:web:14345204f8866f654dd823",
  measurementId: "G-SCWDS25CCJ"
};

// Firebase config
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;