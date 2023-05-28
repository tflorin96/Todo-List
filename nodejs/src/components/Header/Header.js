import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import { useTasksContext } from '../../context/TaskContext';

export default function Header() {

    const { theme } = useTasksContext();
    const [darkTheme, setDarkTheme] = theme;
    const [textColor, setTextColor] = useState(' ');

    useEffect(() => {
        if(darkTheme === false) {
            setTextColor(() => "black");
        } else {
            setTextColor(() => "lightblue");
        }
    }, [darkTheme]);

    return (
        <div className={styles.header_container}>
            <h1 className={styles.header_title} style={{color: textColor}}>Todo List App</h1>
        </div>
    )
}