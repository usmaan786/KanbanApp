import TaskList from './TaskList';
import PropTypes from 'prop-types';

const KanbanBoard = ({ tasks }) => {

    const toDoTasks = tasks.filter((task) => task.status === "To Do");
    const inProgressTasks = tasks.filter((task) => task.status === "In Progress");;
    const doneTasks = tasks.filter((task) => task.status === "Done");

    return (
        <div style={{ display: "flex", gap: "20px", padding: "20px", color: "black" }}>

            <div style={{ flex: 1, backgroundColor: "#f8d7da", padding: "10px", borderRadius: "5px" }}>
                <h3>To Do</h3>
                <TaskList tasks={toDoTasks} />
            </div>

            <div style={{ flex: 1, backgroundColor: "#fff3cd", padding: "10px", borderRadius: "5px", color: "black" }}>
                <h3>In Progress</h3>
                <TaskList tasks={inProgressTasks} />
            </div>


            <div style={{ flex: 1, backgroundColor: "#d4edda", padding: "10px", borderRadius: "5px", color: "black" }}>
                <h3>Done</h3>
                <TaskList tasks={doneTasks} />
            </div>
        </div>
    );
};

KanbanBoard.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default KanbanBoard;