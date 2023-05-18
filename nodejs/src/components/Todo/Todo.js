import React from 'react';
import styles from './Todo.module.css';

function Todo({task, removeTask, checkCompleted}) {

  function handleRemoveTask() {
    removeTask(task.id);
  }

  function handleCheckComplete() {
    checkCompleted(task.id);
  }
  
  if(task.priority.toLowerCase() == 'low') {

      return (
        <div className={styles.large_container}>
          <div className={styles.todo_container_green}>
            <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
            <p className={styles.task_name}>{task.name}</p>
            <p className={styles.task_priority}>{task.priority}</p>
            <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
          </div>
          <img className={styles.edit_icon} src='./images/edit-icon.png'></img>
        </div>
      )
    } else if (task.priority.toLowerCase() == "med") {

      return (
        <div className={styles.large_container}>
          <div className={styles.todo_container_yellow}>
            <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
            <p className={styles.task_name}>{task.name}</p>
            <p className={styles.task_priority}>{task.priority}</p>
            <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
          </div>
          <img className={styles.edit_icon} src='./images/edit-icon.png'></img>
        </div>
      )
    } else if (task.priority.toLowerCase() == "high") {

      return (
        <div className={styles.large_container}>
          <div className={styles.todo_container_red}>
            <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
            <p className={styles.task_name}>{task.name}</p>
            <p className={styles.task_priority}>{task.priority}</p>
            <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
          </div>
          <img className={styles.edit_icon} src='./images/edit-icon.png'></img>
        </div>
      )
    } else {
      return (
        <div className={styles.large_container}>
          <div className={styles.todo_container_white}>
            <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
            <p className={styles.task_name}>{task.name}</p>
            <p className={styles.task_priority}>{task.priority}</p>
            <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
          </div>
          <img className={styles.edit_icon} src='./images/edit-icon.png'></img>
        </div>
      )
    }
}

export default Todo;
