import React from 'react';
import Todo from '../Todo/Todo';
// import styles from './popup.module.css';

function TodoList({tasks, removeTask, check_completed, moveTaskUp, moveTaskDown, saveNewTaskName, saveTaskPriority}) {
    return (
        tasks.map(task => {
            return <Todo key={task.id} task={task} removeTask={removeTask} check_completed={check_completed} moveTaskUp={moveTaskUp} moveTaskDown={moveTaskDown} saveNewTaskName={saveNewTaskName} saveTaskPriority={saveTaskPriority}/>
        })
    );
}

export default TodoList;