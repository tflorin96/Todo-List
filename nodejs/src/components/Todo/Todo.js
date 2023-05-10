import React from 'react';
import styles from './Todo.module.css';

function Todo({task, removeTask, checkCompleted}) {

  function handleRemoveTask() {
    removeTask(task.id);
  }

  function handleCheckComplete() {
    checkCompleted(task.id);
  }

  return (
    <div className={styles.todo_container}>
      <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
      <p className={styles.task_name}>{task.name}</p>
      <img className={styles.bin_icon} src="./binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
    </div>
  )
}

export default Todo;
