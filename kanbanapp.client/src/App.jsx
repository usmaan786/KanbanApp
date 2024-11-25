import { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';

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

   useEffect(() => {
        fetch("https://localhost:7155/api/Tasks")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
;                if (!jsonResponse) {
                    return setTasks([]);
                }
                return setTasks(jsonResponse);
            })
    }, []);


    return (
        <div>
            <h1 id="tableLabel">Kanban Web</h1>
            <KanbanBoard tasks={tasks} />
        </div>
    );
    
    
}

export default App;