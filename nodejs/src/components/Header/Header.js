import React from 'react';
import styles from './popup.module.css';


function Header() {
    return (
        <div className={styles.header_container}>
            <ul className={styles.menu_left}>
                <li>Item 2</li>
            </ul>

            <ul className={styles.menu_right}>
                <li>My account</li>
                <li>Favorites</li>
                <li>My cart</li>
            </ul>
        </div>
    );
}

export default Header;