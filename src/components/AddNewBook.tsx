import React from 'react';
import styles from '../styles/addUser.module.css';
import { AiFillCheckCircle } from 'react-icons/ai';
import { callExternalApi } from '../helpers/callExternalApi';
import { createBook } from '../constants';

export default function AddNewBook(props): React.ReactElement {
    const saveBook = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        let body = {};
    
        for (let i = 0; i < event.target.length; i++) {
            if (!event.target[i].id) continue;
            body[event.target[i].id] = event.target[i].value
        }
        
        const bookData = await callExternalApi({ 
            url: createBook,
            method: "post", 
            body,
            token
        });

        if (bookData.errorMessage) alert(bookData.errorMessage)
        else {
            const newBook = { 
                title: bookData.data.book.title,
                published: bookData.data.book.published,
                id: bookData.data.book.id
            } 
            props.updateCurrentList(current => [...current, newBook]);
        }
    }

    return(
        <div className={ styles.container }>
            <h2>Add new book</h2>
            <form onSubmit={saveBook}>
                <input  type="text" id="title" placeholder="title" required={true}/>
                <input  type="text" id="published" placeholder="published" required={true}/>
                <button type="submit" title="Create new book">
                    <AiFillCheckCircle />
                </button>
            </form>
        </div>
    )
}