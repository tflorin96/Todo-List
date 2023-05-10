import React from 'react';
import Todo from '../Todo/Todo';
import styles from './popup.module.css';

function TodoList({tasks}) {
    return (
        // <div className={styles.list_container}>
        // </div>
        tasks.map(task => {
            return <Todo key={task.id} task={task} />
        })
    );
}

export default TodoList;