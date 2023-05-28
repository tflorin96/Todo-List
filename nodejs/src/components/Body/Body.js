import React, { useRef, useEffect, useState } from 'react';
import styles from './Body.module.css';
import TodoList from '../TodoList/TodoList';
import uuidv4 from 'uuid/v4';
import { useTasksContext } from '../../context/TaskContext';

const LOCAL_STORAGE_KEY = 'MyTodos';

export default function Body() {

    const { taskContext, priorityLabelContext, completedTasksContext, togglePriorityContext, theme } = useTasksContext();
    const [tasks, setTasks] = taskContext;
    const [showPriorityLabel, setShowPriorityLabel] = priorityLabelContext;
    const [completedTasks, setCompletedTasks] = completedTasksContext;
    const [darkTheme, setDarkTheme] = theme;
    const [backColor, setBackColor] = useState(' ');
    const [textColor, setTextColor] = useState(' ');

    const tasknameRef = useRef();
    const taskPriorityRef = useRef();

    function handleAddTask() {
        const name = tasknameRef.current.value;
        const priority = taskPriorityRef.current.value;
        const newTask = {
            id: uuidv4(),
            name: name !== '' ? name : 'Task name not provided',
            priority: priority !== '' ? priority : 'none',
            completed: false,
        };
        setTasks((prev) => [...prev, newTask]);

        tasknameRef.current.value = null;
        taskPriorityRef.current.value = null;
    }

    function handleRemoveTask(id) {
        let newTasks = tasks.filter(task => task.id !== id);
        setTasks(() => newTasks);

        let completedTasks = 0;
        newTasks.forEach(task => {
            if (task.completed === true) completedTasks++;
        });
        setCompletedTasks(() => completedTasks);
    }

    function handleCheckComplete(id) {
        const newTasks = [...tasks];
        let checkedCompletedTasks = completedTasks;

        const index = newTasks.findIndex(task => task.id === id);
        newTasks[index].completed = !newTasks[index].completed;
        document.getElementById('check_completed').setAttribute('checked', !newTasks[index].completed);

        if (newTasks[index].completed === true) {
            checkedCompletedTasks++;
        } else {
            checkedCompletedTasks--;
        }
        setCompletedTasks(() => checkedCompletedTasks);
    }

    function handleTogglePriorityLabel(event) {
        togglePriorityContext(event);
    }

    function moveTaskUp(id) {
        let newTasks = [...tasks];

        const index = newTasks.findIndex(task => task.id === id);
        if (index > 0) {
            const temp = newTasks[index];
            newTasks[index] = newTasks[index - 1];
            newTasks[index - 1] = temp;
        }

        setTasks(() => newTasks);
    }

    function moveTaskDown(id) {
        let newTasks = [...tasks];

        const index = newTasks.findIndex(task => task.id === id);
        if (index < tasks.length - 1) {
            const temp = newTasks[index];
            newTasks[index] = newTasks[index + 1];
            newTasks[index + 1] = temp;
        }

        setTasks(() => newTasks);
    }

    function saveNewTaskName(id, newName) {
        const newTasks = [...tasks];
        const index = newTasks.findIndex(task => task.id === id);
        newTasks[index].name = newName;

        setTasks(() => newTasks);
    }

    function saveTaskPriority(id, newPriority) {
        const newTasks = [...tasks];
        const index = newTasks.findIndex(task => task.id === id);
        newTasks[index].priority = newPriority;

        setTasks(() => newTasks);
    }
    
    useEffect(() => {
        try {
            const storedObj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            if (storedObj.tasks) setTasks((prevTasks) => [...prevTasks, ...storedObj.tasks]);
            if (storedObj.completedTasks) setCompletedTasks(() => storedObj.completedTasks);
            if (storedObj.theme) setDarkTheme(() => storedObj.theme);
        }
        catch (e) {
            console.log(e.message);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ tasks: [...tasks], completedTasks: completedTasks, theme: darkTheme }));
        }
        catch (e) {
            console.log(e.message);
        }
    }, [tasks, completedTasks, darkTheme]);

    useEffect(() => {
        if(!darkTheme) {
            setBackColor(() => "white");
            setTextColor(() => "black");
        } else {
            setBackColor(() => "lightblue");
            setTextColor(() => "lightblue");
        }
    }, [darkTheme]);
    
    
    return (
        <div className={styles.body_container} onClick={handleTogglePriorityLabel}>
            <div className={styles.add_tasks_container}>
                <input ref={tasknameRef} id='add_task_input' className={styles.add_task_input} style={{backgroundColor: backColor}} type='text' placeholder='Add new task' />
                <div className={styles.priorities_container}>
                    <label className={showPriorityLabel === true ? styles.priority_label : styles.hidden_priority_label} style={{color: textColor}}>Priority</label>
                    <select ref={taskPriorityRef} id='select_priority' className={styles.select_priority} style={{backgroundColor: backColor}} name="select_priority">
                        <option value='' style={{ display: 'none' }} defaultValue={true}></option>
                        <option value="low">Low</option>
                        <option value="med">Med</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button className={styles.add_task_button} onClick={handleAddTask} type='submit'>+</button>
            </div>

            <div className={tasks.length > 0 ? styles.todos_list : styles.hidden_todos_list}>
                <TodoList className={styles.todo_item} tasks={tasks} removeTask={handleRemoveTask} check_completed={handleCheckComplete} moveTaskUp={moveTaskUp} moveTaskDown={moveTaskDown} saveNewTaskName={saveNewTaskName} saveTaskPriority={saveTaskPriority}/>
            </div>
        </div>
    )
}