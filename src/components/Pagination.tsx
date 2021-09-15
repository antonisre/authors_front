import React from 'react';
import styles from '../styles/pagination.module.css';


export default function Pagination(props): React.ReactElement {
    const updatePage = (event) => {
        props.updatePage(event.target.id);
    }

    return(
        <ul className={ styles.container }>
            {
                Object.keys(props.pages)?.map(page => {
                    console.log(!(page == "currentPage" && props.pages[page] == props.pages.lastPage))
                    if (props.pages[page] && !((page == "currentPage" || page == "nextPage") && props.pages[page] == props.pages.lastPage)) {
                        return <li>
                            <button id={props.pages[page]} onClick={updatePage} className={styles[page]}>
                                { props.pages[page] }
                            </button>
                        </li>
                    }
                })
            }
        </ul>
    )
}