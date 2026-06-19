function Dashboard({ user }) {
    return(
        <div className="page">
            <section className="hero">
                <h1>Welcome back</h1>

                <p className="hero-sub">
                    Signed in as {user.displayName}
                </p>
            </section>
        </div>
    );
}

export default Dashboard;