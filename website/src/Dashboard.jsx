import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Dashboard({ user }) {
    const handleLogout = async() => {
        await signOut(auth);
    };
    
    return(
        <div className="page">
            <section className="hero">
                <h1>Welcome back</h1>

                <p className="hero-sub">
                    Signed in as {user.displayName}
                </p>

                <button className="btn-primary" onClick={handleLogout}>
                    Logout
                </button> 
            </section>
        </div>
    );
}

export default Dashboard;