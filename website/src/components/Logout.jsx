import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Logout() {
    const [error, setError] = useState(""); // track logout errors, so user knows if sign out fails

    const handleLogout = async() => {
        setError(""); // clean slate; clear any prev error beforehand

        try {
            await signOut(auth); // sign out of firebase, wait till detected
            // onAuthStateChanged in App.jsx shd change screen automatically

            console.log("[Logout] Signed out successfully.");
        } catch (error) {
            console.error("[Logout] Sign out failed:", error);

            setError("Sign out failed. Please try again.");
        }
    };

    return (
        <div className="logout-container">
            <button
                className="btn-ghost"
                type="button"
                onClick={handleLogout}
            >
                Logout
            </button>

            {/* display feedback only when firebase sign-out fails */}
            {error && <p role="alert">{error}</p>}
        </div>
    );
}

export default Logout;