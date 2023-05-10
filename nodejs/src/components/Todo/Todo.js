import React from 'react';
import styles from './Todo.module.css';

function Todo({task, removeTask}) {

  function handleRemoveTask() {
    removeTask(task.id);
  }

  return (
    <div className={styles.todo_container}>
      <input className={styles.mark_complete} type='checkbox' />
      <p className={styles.task_name}>{task.name}</p>
      <img className={styles.bin_icon} src="./binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
    </div>
  )
}

export default Todo;
