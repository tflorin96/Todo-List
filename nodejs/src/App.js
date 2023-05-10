import React, {useState, useEffect, useRef} from 'react';
import TodoList from './components/TodoList/TodoList';
import styles from './App.module.css';
import uuidv4 from 'uuid/v4';


function App() {

  const [tasks, setTasks] = useState([]);
  const [tasksLength, setTasksLength] = useState(tasks.length);
  const [completedTasks, setCompletedTasks] = useState(0);
  const taskNameRef = useRef();


  function handleAddTask() {
    const name = taskNameRef.current.value;

    if(name === '') return 
    setTasks((prev) => {
      return [...prev, {id: uuidv4(), name: name, completed: false}];
    });
    taskNameRef.current.value = null;
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
  }

  function handleCheckComplete(id) {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((task) => task.id === id);
    newTasks[taskIndex].completed = !newTasks[taskIndex].completed;

    if(newTasks[taskIndex].completed == true) {
      setCompletedTasks(() => {
        return completedTasks + 1;
      });
    } else {
      setCompletedTasks(() => {
        return completedTasks - 1;
      });
    }
    setTasks(() => {
      return newTasks;
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
            <TodoList className={styles.todo_item} tasks={tasks} removeTask={removeTask} checkCompleted={handleCheckComplete}/>
          </div>
        </div>

        <div className={styles.app_footer}>
          <p>{tasksLength > 0 ? `You have ${tasksLength} pendings tasks` : 'No pending tasks'}</p>
          <button onClick={handleClearAllTasks}>Clear All</button>
        </div>
        <p className={completedTasks == 0 ? styles.empty_completed_tasks :  styles.completed_task}> Completed: {completedTasks}</p>
    </div>
  );
}

export default App;
