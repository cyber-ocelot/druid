import { useEffect, useState } from "react";
//import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import Logout from "./Logout";

function StudentDashboard({ user }) {
    //const [user, setUser] = useState(null);
    const [flags, setFlags] = useState([]); // enables use/edit of flag var & waits for it to be set
    const [profile, setProfile] = useState(null); // enables changes of profile var & ^^

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
                {/* Header */}
                <h1>
                    Welcome, {profile.name || user.displayName || "Student"}
                </h1> {/* '||' & '?' means fallbacks/only if acc response valid/available */}

                <p className="hero-sub">
                    {profile?.email || user.email}
                </p>

                {/* Logout Button UI */}
                <Logout />

                {/* Profile Info */}
                {profile && (
                    <div className="profile-card">
                        {/* only render once Firestore profile loaded */}
                        <h2>Your Profile</h2>

                        <p>
                            <strong>Name:</strong> {profile.name}
                        </p>

                        <p>
                            <strong>Email:</strong> {profile.email}
                        </p>

                        <p>
                            <strong>Role:</strong> {profile.role}
                        </p>
                    </div>
                )}

                {/* Flag Display UI */}
                <h2>Today's Flags</h2>

                <div className="flag-list">
                    {flags.length === 0 ? (
                        // clearly display when no flags recorded instead of blank
                        <div className="empty-state">
                            <h3>No flags today</h3>
                        </div>
                    ) : (
                        flags.map((flag, index) => (
                            <div className="flag-card" key={index}>
                                <h3>{flag.event}</h3>

                                <p>
                                    <strong>Site:</strong> {flag.aiSite}
                                </p>

                                {flag.prompt && (
                                    <p>
                                        <strong>Prompt:</strong> {flag.prompt}
                                    </p>
                                )}

                                <p>
                                    <strong>Time:</strong> {flag.timestamp}
                                </p>

                                {/*<p>
                                    <strong>Groups:</strong>{" "}
                                    {profile.groups?.length
                                        ? profile.groups.join(", ")
                                        : "None"}
                                </p>*/}
                            </div>
                        ))
                    )}
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