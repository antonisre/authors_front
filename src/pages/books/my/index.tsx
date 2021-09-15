import EditableList from '../../../components/EditableList';
import { updateBookApi, deleteBookApi, getUsersBooks, booksPerPage } from '../../../constants';
import { callExternalApi } from '../../../helpers/callExternalApi';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router'
import AddNewBook from '../../../components/AddNewBook';
import styles from '../../../styles/userBooks.module.css';
import Header from '../../../components/Header';
import Pagination from '../../../components/Pagination';

const updateBook = async ({title, published}, id) => {
    const userToken = localStorage.getItem('token');

    const result = await callExternalApi({ 
        url: `${ updateBookApi }${ id }`,
        method: "put", 
        token: userToken,
        body: {
            title,
            published
        }
    });
    if (result.errorMessage) alert(result.errorMessage)
}

const deleteBook = async (id: number) => {
    const userToken = localStorage.getItem('token');

    const result = await callExternalApi({ 
        url: `${ deleteBookApi }${ id }`,
        method: "delete", 
        token: userToken,
    });
    if (result.errorMessage) alert(result.errorMessage)
}


export default function Books() {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState({});
    const [bookList, setBookList] = useState([]);
    
    const fetchBooks = (userToken) => {
        (async () => {
            const books = await callExternalApi({ 
                url: `${ getUsersBooks }?page=${ currentPage }&results=${ booksPerPage }`,
                method: "get", 
                token: userToken
            });
            if (books.errorMessage) alert(books.errorMessage);
            console.log(books.data.userData.id)
            if(books.data.userData.id) {
                setBookList(books.data.userData.books)
                setPages(books.data?.pages)
            }
        })()
    }
   
    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (!userToken) Router.push('/') //if user is not logged, redirect to auth page
        else {
            fetchBooks(userToken);
        } 
    }, [currentPage]);
   
    return (
        <div className={styles.container}>
            <Header name={router.query.name} />
            <h1>My Books List</h1>
            <EditableList entities={bookList} onSubmitFunc={updateBook} onDeleteFunc={deleteBook} updateEntities={setBookList}/>
            <Pagination pages={pages} updatePage={setCurrentPage}/>
            <AddNewBook updateCurrentList={setBookList} />
        </div>
    )
}