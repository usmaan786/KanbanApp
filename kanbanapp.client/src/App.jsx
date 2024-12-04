import { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';
import Login from './components/Login';
import Register from './components/Register';
//import Logout from './components/Logout';

function App() {

    //const tasks = [
    //    { id: 1, title: "Create React component", status: "To Do" },
    //    { id: 2, title: "Connect to API", status: "In Progress" },
    //    { id: 3, title: "Test drag-and-drop", status: "Done" },
    //    { id: 4, title: "Set up Kanban layout", status: "To Do" },
    //    { id: 5, title: "Style the board", status: "In Progress" },
    //    { id: 6, title: "Deploy app", status: "Done" },
    //];

    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

   /*useEffect(() => {
        fetch("https://localhost:7155/api/Tasks")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
;                if (!jsonResponse) {
                    return setTasks([]);
                }
                return setTasks(jsonResponse);
            })
    }, []);*/
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
            fetchTasks(token);
        }
    }, []);

    const fetchTasks = async (token) => {
        try {
            const response = await fetch("https://localhost:7155/api/Tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const jsonResponse = await response.json();
            setTasks(jsonResponse || []);
        }
        catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setTasks([]);
    };

    return (
        <div>
            <h1 id="tableLabel">Kanban Web</h1>
            {!isLoggedIn ? (
                <>
                    <Login
                        onLoginSuccess={() => {
                            setIsLoggedIn(true);
                            fetchTasks(localStorage.getItem("authToken"));
                        }}
                    />
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