import { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';
import axios from 'axios';

function App() {

    const tasks = [
        { id: 1, title: "Create React component", status: "To Do" },
        { id: 2, title: "Connect to API", status: "In Progress" },
        { id: 3, title: "Test drag-and-drop", status: "Done" },
        { id: 4, title: "Set up Kanban layout", status: "To Do" },
        { id: 5, title: "Style the board", status: "In Progress" },
        { id: 6, title: "Deploy app", status: "Done" },
    ];

   // const [tasks, setTasks] = useState([]);

   /* useEffect(() => {
        axios.get("https://localhost:5173/api/Tasks")
            .then((response) => setTasks(response.data))
            .catch((error) => console.error(error));
    }, []);*/


    return (
        <div>
            <h1 id="tableLabel">Kanban Web</h1>
            <KanbanBoard tasks={tasks} />
        </div>
    );
    
    
}

export default App;