import Task from "./Task";
import PropTypes from 'prop-types';

const TaskList = ({ tasks }) => {
    return (
        <div>
            <h2>Task List</h2>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default TaskList;
