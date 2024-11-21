//import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';

function App() {

    const tasks = [
        { id: 1, title: "Create React component", status: "To Do" },
        { id: 2, title: "Connect to API", status: "In Progress" },
        { id: 3, title: "Test drag-and-drop", status: "Done" },
    ];


    return (
        <div>
            <h1 id="tableLabel">Kanban Web</h1>
            <TaskList tasks={tasks} />
        </div>
    );
    
    
}

export default App;