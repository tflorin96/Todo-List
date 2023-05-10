import React from 'react';
import styles from './Todo.module.css';

function Todo({task}) {

  return (
    <div className={styles.todo_container}>
      <p className={styles.task_name}>{task.name}</p>
      <img className={styles.bin_icon} src="./binIcon.png" alt='Bin icon'/>
    </div>
  )
}

export default Todo;
