import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

function Login() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      console.log("Logged in:", result.user);

      alert(`Welcome ${result.user.displayName}!`);
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