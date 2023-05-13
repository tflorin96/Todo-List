import React from 'react';
import Todo from '../Todo/Todo';
// import styles from './popup.module.css';

function TodoList({tasks, removeTask, checkCompleted}) {
    return (
        tasks.map(task => {
            return <Todo key={task.id} task={task} removeTask={removeTask} checkCompleted={checkCompleted}/>
        })
    );
}

export default TodoList;