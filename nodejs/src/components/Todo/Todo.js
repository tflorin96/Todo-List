import {React, useEffect, useState } from 'react';
import styles from './Todo.module.css';

function Todo({task, removeTask, check_completed, moveTaskUp, moveTaskDown}) {

  const [containerColor, setContainerColor] = useState('');
  
  useEffect(() => {
    setContainerColor(() => {
      if(task.priority.toLowerCase() == 'low') return 'lightgreen'
      else if(task.priority.toLowerCase() == 'med') return 'gold'
      else if(task.priority.toLowerCase() == 'high') return 'lightcoral'
      else return 'lightgrey'
    });
  }, [task.priority]);

  function handleRemoveTask() {
    removeTask(task.id);
  }

  function handleCheckComplete() {
    check_completed(task.id);
  }

  function handleMoveTaskUp() {
    moveTaskUp(task.id);
  }

  function handleMoveTaskDown() {
    moveTaskDown(task.id);
  }
  
  return (
    <div className={styles.large_container}> 
      <div className={styles.arrows_container} style={{backgroundColor: containerColor}}>
        <img className={styles.up_arrow} src="./images/up-arrow.png" alt='Up arrow' onClick={handleMoveTaskUp} />
        <img className={styles.down_arrow} src="./images/down-arrow.png" alt='Down arrow' onClick={handleMoveTaskDown}/>
      </div>
      <div className={styles.todo_container} style={{backgroundColor: containerColor}}>
        <input className={styles.check_completed} id='check_completed' type='checkbox' onClick={handleCheckComplete} checked={task.completed}/>
        <p className={styles.task_name}>{task.name}</p>
        <p className={styles.task_priority}>{task.priority}</p>
        <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
      </div>
      {/* <img className={styles.edit_icon} src='./images/edit-icon.png' alt='Edit icon'></img> */}
    </div>
  )
}

export default Todo;
