import React, {useState, useEffect, useRef} from 'react';
import TodoList from './components/TodoList/TodoList';
import styles from './App.module.css';
import uuidv4 from 'uuid/v4';


function App() {

  const [tasks, setTasks] = useState([]);
  const [tasksLength, setTasksLength] = useState(tasks.length);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [showPriorityLabel, setShowPriorityLabel] = useState('false');
  const taskNameRef = useRef();
  const taskPriorityRef = useRef();
  
  function handleAddTask() {
    const name = taskNameRef.current.value;
    const priority= taskPriorityRef.current.value;

    setTasks((prev) => {
      return [
        ...prev, 
        {id: uuidv4(),
          name: name != '' ? name : 'Task name not provided',
          priority: priority != '' ? priority : ' ',
          completed: false}
      ];
    });
    taskNameRef.current.value = null;
    taskPriorityRef.current.value = null;
  }

  function removeTask(id) {

    const newTasks = tasks.filter( (task) => task.id !== id);
    setTasks( () => {
      return newTasks;
    });

    let checkedCompletedTasks = 0;
    newTasks.forEach((task) => {
      if(task.completed == true) {
        checkedCompletedTasks++;
      }
    });

    setCompletedTasks(() => {
      return checkedCompletedTasks;
    });
  }

  function handleClearAllTasks() {
    setTasks(() => {
      return [];
    });

    setCompletedTasks(() => {
      return 0;
    });
  }

  function handleCheckComplete(id) {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((task) => task.id === id);
    newTasks[taskIndex].completed = !newTasks[taskIndex].completed;

    if(newTasks[taskIndex].completed == true) {
      setCompletedTasks(() => completedTasks + 1);
    } else {
      setCompletedTasks(() => completedTasks - 1);
    }
    
    setTasks(() => {
      return newTasks;
    });
  }

  function handleClearCompletedTasks() {
    const newTasks = [...tasks];

    const filteredTasks = newTasks.filter((task) => task.completed !== true);
    setTasks(() => filteredTasks);
    setCompletedTasks(() => 0);
  }

  function handleTogglePriorityLabel(event) {
    if(event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'select') {
      setShowPriorityLabel(() => true);
    } else {
      setShowPriorityLabel(() => false);
    }
  }

  function moveTodoUp(id) {
    const newTasks = [...tasks];
    const index = tasks.findIndex(task => task.id == id);
    if(index > 0) {
        const temp = newTasks[index -1];
        newTasks[index -1] = newTasks[index];
        newTasks[index] = temp;
    }

    setTasks(() => newTasks);
  }

  function moveTodoDown(id) {
    const newTasks = [...tasks];
    const index = tasks.findIndex(task => task.id == id);
    if(index < newTasks.length -1) {
        const temp = newTasks[index +1];
        newTasks[index +1] = newTasks[index];
        newTasks[index] = temp;
    }

    setTasks(() => newTasks);
}

  useEffect(() => {
    setTasksLength(() => {
      return tasks.length;
    });
  }, [tasks.length]);
  

  return (
    <div className={styles.app} onClick={handleTogglePriorityLabel}>
        <h1 className={styles.app_header}>Manage tasks App</h1>
        <div className={styles.app_body}>

          <div className={styles.add_tasks_container}>
            <input ref={taskNameRef} type='text' placeholder='Add new task'/>
            <div className={styles.priorities_container}>
              <label className={showPriorityLabel == true ? styles.priority_label : styles.hidden_priority_label}>Priority</label>
              <select ref={taskPriorityRef} name="task_priorities" className={styles.task_priorities}>
                  <option value='' style={{display:'none'}} selected></option> 
                  <option value="low">Low</option>
                  <option value="med">Med</option>
                  <option value="high">High</option>
              </select>
            </div>
            <button className={styles.add_task_button} onClick={handleAddTask} type='submit'>+</button>
          </div>

          <div className={tasks.length > 0 ? styles.todos_list: styles.hidden_todos_list}>
            <TodoList className={styles.todo_item} tasks={tasks} removeTask={removeTask} checkCompleted={handleCheckComplete} moveTodoUp={moveTodoUp} moveTodoDown={moveTodoDown}/>
          </div>
        </div>

        <div className={styles.app_footer_all_tasks}>
          <p>{tasksLength > 0 ? `You have ${tasksLength} pendings tasks` : 'No pending tasks'}</p>
          <button id={tasks.length == 0 ? styles.disabled_clear_all_tasks_button : styles.clear_all_tasks_button} onClick={handleClearAllTasks} disabled={tasks.length == 0 ? true : false}>Clear All</button>
        </div> 
        
        <div className={ completedTasks > 0 ? styles.app_footer_completed_tasks : styles.hidden_app_footer_completed_tasks}>
          <p className={styles.completed_tasks_counter}> Completed: {completedTasks}</p>
          <button className={styles.clear_completed_tasks_button} onClick={handleClearCompletedTasks}>Clear Completed</button>
        </div>
    </div>
  );
}

export default App;
