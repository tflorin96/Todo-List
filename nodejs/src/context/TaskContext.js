import React, { useState, useContext } from 'react';

const TasksContext = React.createContext();

export function useTasksContext() {
    return useContext(TasksContext);
}

export default function TasksProviderContext({ children }) {

    const [tasks, setTasks] = useState([]);
    const [tasksLength, setTasksLength] = useState(tasks.length);
    const [showPriorityLabel, setShowPriorityLabel] = useState(false);
    const [completedTasks, setCompletedTasks] = useState(0);
    const value = {
        taskContext: [tasks, setTasks],
        taskLengthContext: [tasksLength, setTasksLength],
        priorityLabelContext: [showPriorityLabel, setShowPriorityLabel],
        completedTasksContext: [completedTasks, setCompletedTasks],
        togglePriorityContext: handleTogglePriorityLabel,
    };

    function handleTogglePriorityLabel(event) {
        if (event.target.id === 'add_task_input' || event.target.id === 'select_priority') {
            setShowPriorityLabel(() => true);
        } else {
            setShowPriorityLabel(() => false);
        }
    }

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>

    );
}