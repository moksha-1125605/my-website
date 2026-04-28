function Home ( { setIsLoggedIn } ) {
    return (
        <div>
            <h1>Welcome back! User</h1>
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
    );
}

export default Home;