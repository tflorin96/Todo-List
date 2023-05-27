import React, { useEffect } from 'react';
import styles from './Footer.module.css';
import { useTasksContext } from '../../context/TaskContext';

export default function Footer() {

    const { taskContext, taskLengthContext, completedTasksContext } = useTasksContext();
    const [tasks, setTasks] = taskContext;
    const [tasksLength, setTasksLength] = taskLengthContext;
    const [completedTasks, setCompletedTasks] = completedTasksContext;

    function handleClearAllTasks() {
        setTasks(() => []);

        setCompletedTasks(() => 0);
    }

    function handleClearCompletedTasks() {
        const newTasks = [...tasks];

        const filteredTasks = newTasks.filter((task) => task.completed !== true);
        setTasks(() => filteredTasks);
        setCompletedTasks(() => 0);
    }

    useEffect(() => {
        setTasksLength(() => tasks.length);
    }, [tasks.length, setTasksLength]);


    return (
        <div className={styles.footer_container}>
            <div className={styles.app_footer_all_tasks_container}>
                <p>{tasksLength > 0 ? `You have ${tasksLength} pendings tasks` : 'No pending tasks'}</p>
                <button id={tasks.length === 0 ? styles.disabled_clear_all_tasks_button : styles.clear_all_tasks_button} onClick={handleClearAllTasks} disabled={tasks.length === 0 ? true : false}>Clear All</button>
            </div>

            <div className={completedTasks > 0 ? styles.app_footer_completed_tasks_container : styles.hidden_app_footer_completed_tasks_container}>
                <p className={styles.completed_tasks_counter}> Completed: {completedTasks}</p>
                <button className={styles.clear_completed_tasks_button} onClick={handleClearCompletedTasks}>Clear Completed</button>
            </div>
        </div>
    )
}