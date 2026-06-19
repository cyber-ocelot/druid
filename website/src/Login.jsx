import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, provider, db } from "./firebase";
import './index.css'

function Login() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userRef = doc(db, 'users', user.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
       await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'student',
        createdAt: new Date().toISOString()
       });
      }

      alert('Welcome ${user.displayName}!');
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <button className="btn-primary" onClick={handleLogin}>
      <span>Continue with Google</span>
    </button>
  );
}

export default Login;