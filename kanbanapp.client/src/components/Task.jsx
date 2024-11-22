import PropTypes from 'prop-types';

const Task = ({ task }) => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
            <span>{task.title}</span>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

export default Task;
