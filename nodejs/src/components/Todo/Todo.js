import React from 'react';
import styles from './Todo.module.css';

function Todo({task, removeTask, checkCompleted, moveTodoUp, moveTodoDown}) {

  function handleRemoveTask() {
    removeTask(task.id);
  }

  function handleCheckComplete() {
    checkCompleted(task.id);
  }

  function handleMoveTodoUp() {
    moveTodoUp(task.id);
  }

  function handleMoveTodoDown() {
    moveTodoDown(task.id);
  }
  
  if(task.priority.toLowerCase() == 'low') {

      return (
        <div className={styles.large_container}> 
          <div className={styles.arrows_container}>
            <img className={styles.up_arrow} src="./images/up-arrow.png" alt='Up arrow' onClick={handleMoveTodoUp} />
            <img className={styles.down_arrow} src="./images/down-arrow.png" alt='Down arrow' onClick={handleMoveTodoDown}/>
          </div>
          <div className={styles.todo_container_green}>
            <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
            <p className={styles.task_name}>{task.name}</p>
            <p className={styles.task_priority}>{task.priority}</p>
            <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
          </div>
          <img className={styles.edit_icon} src='./images/edit-icon.png' alt='Edit icon'></img>
        </div>
      )
    } else if (task.priority.toLowerCase() == "med") {

      return (
        <div className={styles.large_container}>
          <div className={styles.arrows_container}>
            <img className={styles.up_arrow} src="./images/up-arrow.png" alt='Up arrow' onClick={handleMoveTodoUp}/>
            <img className={styles.down_arrow} src="./images/down-arrow.png" alt='Down arrow' onClick={handleMoveTodoDown}/>
          </div>
          <div className={styles.todo_container_yellow}>
            <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
            <p className={styles.task_name}>{task.name}</p>
            <p className={styles.task_priority}>{task.priority}</p>
            <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
          </div>
          <img className={styles.edit_icon} src='./images/edit-icon.png' alt='Edit icon'></img>
        </div>
      )
    } else if (task.priority.toLowerCase() == "high") {

      return (
        <div className={styles.large_container}>
          <div className={styles.arrows_container}>
            <img className={styles.up_arrow} src="./images/up-arrow.png" alt='Up arrow' onClick={handleMoveTodoUp}/>
            <img className={styles.down_arrow} src="./images/down-arrow.png" alt='Down arrow' onClick={handleMoveTodoDown}/>
          </div>
          <div className={styles.todo_container_red}>
            <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
            <p className={styles.task_name}>{task.name}</p>
            <p className={styles.task_priority}>{task.priority}</p>
            <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
          </div>
          <img className={styles.edit_icon} src='./images/edit-icon.png' alt='Edit icon'></img>
        </div>
      )
    } else {
      return (
        <div className={styles.large_container}>
          <div className={styles.arrows_container}>
            <img className={styles.up_arrow} src="./images/up-arrow.png" alt='Up arrow' onClick={handleMoveTodoUp}/>
            <img className={styles.down_arrow} src="./images/down-arrow.png" alt='Down arrow' onClick={handleMoveTodoDown}/>
          </div>
          <div className={styles.todo_container_grey}>
            <input className={styles.mark_complete} type='checkbox' onClick={handleCheckComplete}/>
            <p className={styles.task_name}>{task.name}</p>
            <p className={styles.task_priority}>{task.priority}</p>
            <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask}/>
          </div>
          <img className={styles.edit_icon} src='./images/edit-icon.png' alt='Edit icon'></img>
        </div>
      )
    }
}

export default Todo;
