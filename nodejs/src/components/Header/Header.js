import styles from './Header.module.css';

export default function Header() {

    return (
        <div className={styles.header_container}>
            <h1 className={styles.header_title} >Todo List App</h1>
        </div>
    )
}