import React, {useState, useEffect, useRef} from 'react';
import TodoList from './components/TodoList/TodoList';
import styles from './App.module.css';
import uuidv4 from 'uuid/v4';


function App() {

  const [tasks, setTasks] = useState([]);
  const [tasksLength, setTasksLength] = useState(tasks.length);
  const taskNameRef = useRef();

  function handleAddTask() {
    const name = taskNameRef.current.value;

    if(name === '') return 
    setTasks((prev) => {
      return [...prev, {id: uuidv4, name: name, completed: false}];
    });
    taskNameRef.current.value = null;
  }

  function handleRemoveTask(id) {
    
  }

  function handleClearTasks() {
    setTasks(() => {
      return [];
    });
  }

  useEffect(() => {
    setTasksLength(() => {
      return tasks.length;
    });
  }, [tasks.length]);

  return (
    <div className={styles.app}>
        <h1 className={styles.app_header}>Manage tasks App</h1>

        <div className={styles.app_body}>
          <div className={styles.add_tasks_container}>
            <input ref={taskNameRef} type='text' placeholder='Add new task' />
            <button onClick={handleAddTask} type='submit'>+</button>
          </div>
          <div className={tasks.length > 0 ? styles.todos_list: styles.empty_todos_list}>
            <TodoList className={styles.todo_item} tasks={tasks}/>
          </div>
        </div>

        <div className={styles.app_footer}>
          <p>{tasksLength > 0 ? `You have ${tasksLength} pendings tasks` : 'No pending tasks'}</p>
          <button onClick={handleClearTasks}>Clear All</button>
        </div>
    </div>
  );
}

export default App;
