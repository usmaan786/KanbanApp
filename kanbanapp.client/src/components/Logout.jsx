const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        alert("You have been logged out.");
        window.location.href = "/login";
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
