import { useEffect, useState } from "react";
//import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function StudentDashboard({ user }) {
    //const [user, setUser] = useState(null);
    const [flags, setFlags] = useState([]); // enables use/edit of flag var & waits for it to be set
    const [profile, setProfile] = useState(null); // enables changes of profile var & ^^

    // logout function
    const handleLogout = async() => {
        try {
            await signOut(auth);
            console.log("[Student Dashboard] Logged out.");
        } catch (error) {
            console.error("[Student Dashboard] Logout failed:", error);
        }
    };
    
    useEffect(() => {
        
        // read todays doc from firestore
        const loadFlags = async () => {
            try {

                // get student's profile
                const userRef = doc(
                    db,
                    "users",
                    user.uid
                );

                const profileSnap = await getDoc(userRef);

                if (profileSnap.exists()) {
                    setProfile(profileSnap.data())
                }

                // get today's flags
                const today = new Date().toISOString().split("T")[0];

                // ref to todays doc
                const dayRef = doc(
                    db,
                    "users",
                    user.uid,
                    "dates",
                    today
                );

                const flagsSnap = await getDoc(dayRef);

                // handle data
                if (flagsSnap.exists()) {
                    const data = flagsSnap.data();

                    setFlags(data.flags ?? []);
                }
                
            } catch (error) { // error handling
                console.error("[Student Dashboard] Failed to load flags:", error);
            }
        };

        loadFlags();
    }, [user]);

    return (
        <div className="page">
            <section className="hero">
                <h1>Student Dashboard</h1>

                <p className="hero-sub">
                    Signed in as {user.displayName}
                </p>

                <button
                    className="btn-ghost"
                    onClick={handleLogout}
                >
                    Logout
                </button>

                <h2>Today's Flags</h2>

                <div className="flag-list">
                    {flags.map((flag, index) => (
                        <div className="flag-card" key={index}>
                            <h3>{flag.event}</h3>

                            <p>
                                <strong>Site:</strong> {flag.aiSite}
                            </p>

                            <p>
                                <strong>Prompt:</strong> {flag.prompt}
                            </p>

                            <p>
                                <strong>Time:</strong> {flag.timestamp}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        
        /*<div className="page">
            <section className="hero">
                <h1>
                    Student Dashboard - {user ? user.email : "Not logged in."}
                </h1>
            </section>
        </div>*/
    );
}

export default StudentDashboard;