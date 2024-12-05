import { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        try {
            const response = await fetch("https://localhost:7155/api/Tasks", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                setIsLoggedIn(true);
                const jsonResponse = await response.json();
                setTasks(jsonResponse || []);
            } else {
                setIsLoggedIn(false);
                setTasks([]);
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
            setIsLoggedIn(false);
            setTasks([]);
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            const response = await fetch("https://localhost:7155/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setIsLoggedIn(false);
                setTasks([]);
                alert("Logout successful");
            } else {
                console.error("Error during logout:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div>
            <h1 id="tableLabel">Kanban Web</h1>
            {!isLoggedIn ? (
                <>
                    <Login onLoginSuccess={checkAuthentication} />
                    <Register />
                </>
            ) : (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <KanbanBoard tasks={tasks} />
                </>
            )}
        </div>
    );
}

export default App;