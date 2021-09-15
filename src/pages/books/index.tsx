import { getBooksApi, booksPerPage } from '../../constants';
import { callExternalApi } from '../../helpers/callExternalApi';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from '../../styles/users.module.css';
import AllBookList from '../../components/AllBookList';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';

export default function Books() {
    const [usersName, setUsersName] = useState('');
    const [pages, setPages] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [bookList, setBookList] = useState([]);

    const fetchBooks = (userToken) => {
        (async () => {
            const books = await callExternalApi({ 
                url: `${ getBooksApi }?page=${ currentPage }&results=${ booksPerPage }`,
                method: "get", 
                token: userToken
            });
            if (books.errorMessage) alert(books.errorMessage);
            setBookList(books.data.books)
            setPages(books.data.pages)
        })()
    }

    useEffect(() => {
        const lastName = localStorage.getItem('lastName');
        const firstName = localStorage.getItem('firstName');
        setUsersName(`${firstName} ${lastName}`);

        const userToken = localStorage.getItem('token');
        if (!userToken) Router.push('/') //if user is not logged, redirect to auth page
        else {
            fetchBooks(userToken)
        } 
    }, [currentPage]);

    return (
        <div className={styles.container}>
            <Header name={usersName} />
            <h1>All Books List</h1>
            <AllBookList books={bookList}/>
            <Pagination pages={pages} updatePage={setCurrentPage}/>
        </div>
    )
}