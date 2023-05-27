import React from 'react';
import styles from './TestApp.module.css';
import TasksProviderContext from './context/TaskContext';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

export default function TestApp() {
    return (
        <TasksProviderContext>
            <div className={styles.app}>
                <Header />
                <Body />
                <Footer />
            </div>
        </TasksProviderContext>
    );
}