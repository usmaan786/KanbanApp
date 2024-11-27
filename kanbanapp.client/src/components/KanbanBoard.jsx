import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanBoard = ({ tasks = [] }) => {
   
    const [columns, setColumns] = useState({
        "To Do": [],
        "In Progress": [],
        "Done": [],
    });

    useEffect(() => {
        setColumns({
            "To Do": tasks.filter((task) => task.status === "To Do"),
            "In Progress": tasks.filter((task) => task.status === "In Progress"),
            "Done": tasks.filter((task) => task.status === "Done"),
        });
    }, [tasks]);


    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const sourceList = [...columns[source.droppableId]];
        const destinationList = [...columns[destination.droppableId]];

        const [movedTask] = sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, movedTask);

        movedTask.status = destination.droppableId;

        setColumns({
            ...columns,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destinationList,
        });
    };

    const handleDelete = async (taskId, columnName) => {
        try {
            const response = await fetch(`https://localhost:7155/api/Tasks/${taskId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete the task");
            }

            const updatedColumn = columns[columnName].filter((task) => task.id !== taskId);

            setColumns({
                ...columns,
                [columnName]: updatedColumn,
            });
        } catch (error) {
            console.error("Error deleting task:", error.message);
            alert("Failed to delete the task. Please try again.");
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
                {Object.entries(columns).map(([columnName, columnTasks]) => (
                    <Droppable droppableId={columnName} key={columnName}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    flex: 1,
                                    backgroundColor:
                                        columnName === "To Do"
                                            ? "#f8d7da"
                                            : columnName === "In Progress"
                                                ? "#fff3cd"
                                                : "#d4edda",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    minHeight: "200px",
                                }}
                            >
                                <h3 style={{ color: "black" }}>{columnName}</h3>
                                {columnTasks.map((task, index) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    padding: "10px",
                                                    margin: "5px 0",
                                                    backgroundColor: "#ffffff",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "5px",
                                                    boxShadow:
                                                        "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                    color: "#000",
                                                    fontSize: "14px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <span>{task.title}</span>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(task.id, columnName)
                                                    }
                                                    style={{
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "3px",
                                                        padding: "5px 10px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
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
