import React from 'react';
import styles from '../styles/header.module.css';
import Link from 'next/link';

export default function Header(props): React.ReactElement {
    return(
        <ul className={ styles.container }>
            <li>
                <Link href={{ pathname: '/books/my', query: { name: props.name }}}>
                    <a className={styles.userLink}>{props.name}</a>
                </Link>
            </li>
            <li className={styles.logout}>
                <Link href='/'>
                    <a onClick={() => localStorage.clear()} className={styles.userLink}>Logout</a>
                </Link>
            </li>
        </ul>
    )
}