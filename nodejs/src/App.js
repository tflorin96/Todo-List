import React, {useState, useEffect, useRef} from 'react';
import TodoList from './components/TodoList/TodoList';
import styles from './App.module.css';
import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'MyTodos';

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

  function handleRemoveTask(id) {

    const newTasks = tasks.filter( (task) => task.id !== id);
    setTasks( () => newTasks);

    let checkedCompletedTasks = 0;
    newTasks.forEach((task) => {
      if(task.completed == true) {
        checkedCompletedTasks++;
      }
    });

    setCompletedTasks(() => checkedCompletedTasks);
  }

  function handleClearAllTasks() {
    setTasks(() => []);

    setCompletedTasks(() => 0);
  }

  function handleCheckComplete(id) {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((task) => task.id === id);
    newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
    document.getElementById('check_completed').setAttribute('checked', !newTasks[taskIndex].completed);
    

    if(newTasks[taskIndex].completed == true) {
      setCompletedTasks(() => completedTasks + 1);
    } else {
      setCompletedTasks(() => completedTasks - 1);
    }
    
    setTasks(() => newTasks);
  }

  function handleClearCompletedTasks() {
    const newTasks = [...tasks];

    const filteredTasks = newTasks.filter((task) => task.completed !== true);
    setTasks(() => filteredTasks);
    setCompletedTasks(() => 0);
  }

  function handleTogglePriorityLabel(event) {
    if(event.target.id === 'add_task_input' || event.target.id === 'select_priority') {
      setShowPriorityLabel(() => true);
    } else {
      setShowPriorityLabel(() => false);
    }
  }

  function moveTaskUp(id) {
    const newTasks = [...tasks];
    const index = tasks.findIndex(task => task.id == id);
    if(index > 0) {
        const temp = newTasks[index -1];
        newTasks[index -1] = newTasks[index];
        newTasks[index] = temp;
    }

    setTasks(() => newTasks);
  }

  function moveTaskDown(id) {
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
    setTasksLength(() => tasks.length);
  }, [tasks.length]);

  useEffect(() => {
    const storedObj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedObj.tasks) setTasks((prevTasks) => [...prevTasks, ...storedObj.tasks]);
    if(storedObj.completedTasks) setCompletedTasks(() => storedObj.completedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({tasks: [...tasks], completedTasks: completedTasks}));
  }, [tasks, completedTasks]);
  

  return (
    <div className={styles.app} onClick={handleTogglePriorityLabel}>
        <h1 className={styles.app_header}>Manage tasks App</h1>
        <div className={styles.app_body}>

          <div className={styles.add_tasks_container}>
            <input ref={taskNameRef} id='add_task_input' className={styles.add_task_input} type='text' placeholder='Add new task'/>
            <div className={styles.priorities_container}>
              <label className={showPriorityLabel == true ? styles.priority_label : styles.hidden_priority_label}>Priority</label>
              <select ref={taskPriorityRef} id='select_priority' className={styles.select_priority} name="select_priority">
                  <option value='' style={{display:'none'}} selected></option> 
                  <option value="low">Low</option>
                  <option value="med">Med</option>
                  <option value="high">High</option>
              </select>
            </div>
            <button className={styles.add_task_button} onClick={handleAddTask} type='submit'>+</button>
          </div>

          <div className={tasks.length > 0 ? styles.todos_list: styles.hidden_todos_list}>
            <TodoList className={styles.todo_item} tasks={tasks} removeTask={handleRemoveTask} check_completed={handleCheckComplete} moveTaskUp={moveTaskUp} moveTaskDown={moveTaskDown}/>
          </div>
        </div>

        <div className={styles.app_footer_all_tasks_container}>
          <p>{tasksLength > 0 ? `You have ${tasksLength} pendings tasks` : 'No pending tasks'}</p>
          <button id={tasks.length == 0 ? styles.disabled_clear_all_tasks_button : styles.clear_all_tasks_button} onClick={handleClearAllTasks} disabled={tasks.length == 0 ? true : false}>Clear All</button>
        </div> 
        
        <div className={ completedTasks > 0 ? styles.app_footer_completed_tasks_container : styles.hidden_app_footer_completed_tasks_container}>
          <p className={styles.completed_tasks_counter}> Completed: {completedTasks}</p>
          <button className={styles.clear_completed_tasks_button} onClick={handleClearCompletedTasks}>Clear Completed</button>
        </div>
    </div>
  );
}

export default App;
