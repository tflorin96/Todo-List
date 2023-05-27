import React from 'react';
import styles from './Header.module.css';

export default function Header() {

    const style = {
        color: 'black',
    }
    return (
        <div className={styles.header_container}>
            <h1 className={styles.header_title} style={style}>Todo List App</h1>
        </div>
    )
}