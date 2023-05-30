import { React, useEffect, useState, useRef } from 'react';
import styles from './Todo.module.css';

function Todo({ task, removeTask, check_completed, moveTaskUp, moveTaskDown, saveNewTaskName, saveTaskPriority }) {

  const [containerColor, setContainerColor] = useState(' ');

  const nameRef = useRef();
  const editNameRef = useRef();
  const priorityRef = useRef();
  const editPriorityRef = useRef();

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

  function editTaskName() {
    nameRef.current.style.display = 'none';
    editNameRef.current.style.display = 'block';
    editNameRef.current.value = task.name;
    editNameRef.current.focus();
  }

  function handleUpdateTaskName() {
    const newName = editNameRef.current.value;
    saveNewTaskName(task.id, newName);

    nameRef.current.style.display = 'block';
    editNameRef.current.style.display = 'none';
  }

  function editTaskPriority() {
    priorityRef.current.style.display = 'none';
    editPriorityRef.current.style.display = 'block';
    editPriorityRef.current.value = task.priority;
  }

  function handleUpdateTaskPriority() {
    const newPriority = editPriorityRef.current.value;
    saveTaskPriority(task.id, newPriority);

    priorityRef.current.style.display = 'block';
    editPriorityRef.current.style.display = 'none';
  }

  useEffect(() => {
    setContainerColor(() => {
      if (task.priority.toLowerCase() === 'low') return 'lightgreen'
      else if (task.priority.toLowerCase() === 'med') return 'gold'
      else if (task.priority.toLowerCase() === 'high') return 'lightcoral'
      else return 'lightgrey'
    });
  }, [task.priority]);


  return (
    <div className={styles.large_container} style={{ backgroundColor: containerColor }} >

      <div className={styles.arrows_container} >
        <img className={styles.up_arrow} src="./images/up-arrow.png" alt='Up arrow' onClick={handleMoveTaskUp} />
        <img className={styles.down_arrow} src="./images/down-arrow.png" alt='Down arrow' onClick={handleMoveTaskDown} />
      </div>

      <div className={styles.todo_container} >
        <input className={styles.check_completed} id='check_completed' type='checkbox' onClick={handleCheckComplete} checked={task.completed} />
        <p ref={nameRef} className={styles.task_name} id='task_name' onClick={editTaskName}>{task.name}</p>
        <input ref={editNameRef} className={styles.task_name} type='text' style={{ display: 'none', backgroundColor: 'var(--input-bg' }} onBlur={handleUpdateTaskName} />
        <p ref={priorityRef} className={styles.task_priority} onClick={editTaskPriority}>{task.priority}</p>
        <select ref={editPriorityRef} id='edit_priority' className={styles.task_priority} style={{ display: 'none', backgroundColor: 'var(--input-bg' }} name="edit_priority" onBlur={handleUpdateTaskPriority}>
          <option value='' style={{ display: 'none' }} defaultValue={true}></option>
          <option value="low">Low</option>
          <option value="med">Med</option>
          <option value="high">High</option>
          <option value='none'>None</option>
        </select>
        <img className={styles.bin_icon} src="./images/binIcon.png" alt='Bin icon' onClick={handleRemoveTask} />
      </div>
    </div>
  )
}

export default Todo;
