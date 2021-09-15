import { useEffect, useState } from 'react';
import Router from 'next/router';
import EditableList from '../../components/EditableList';
import { authorsApi, authorsPerPage, updateUserApi, deleteUserApi } from '../../constants';
import { callExternalApi } from '../../helpers/callExternalApi';
import styles from '../../styles/users.module.css';
import AddNewUser from '../../components/AddNewUser';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';

const updateUser = async ({firstName, lastName, email, role}, id) => {
    const userToken = localStorage.getItem('token');

    const result = await callExternalApi({ 
        url: `${ updateUserApi }${ id }`,
        method: "put", 
        token: userToken,
        body: {
            firstName,
            lastName,
            email,
            role 
        }
    });
    if (result.errorMessage) alert(result.errorMessage)
}

const deleteUser = async (id: number) => {
    const userToken = localStorage.getItem('token');

    const result = await callExternalApi({ 
        url: `${ deleteUserApi }${ id }`,
        method: "delete", 
        token: userToken,
    });
    if (result.errorMessage) alert(result.errorMessage)
}


export default function Users() {
    const [usersName, setUsersName] = useState('');
    const [pages, setPages] = useState({ currentPage: 1 });
    const [currentPage, setCurrentPage] = useState(1);
    const [usersList, setUsersList] = useState([]);

    const fetchUsers = (userToken) => {
        (async () => {
            const authors = await callExternalApi({ 
                url: `${ authorsApi }?page=${ currentPage }&results=${ authorsPerPage }`,
                method: "get", 
                token: userToken
            });
            if (authors.errorMessage) alert(authors.errorMessage);
            setUsersList(authors.data.userData)
            setPages(authors.data.pages)
        })()
    }
    
    useEffect(() => {
        const lastName = localStorage.getItem('lastName');
        const firstName = localStorage.getItem('firstName');
        setUsersName(`${firstName} ${lastName}`);

        const userToken = localStorage.getItem('token');
        if (!userToken) Router.push('/') //if user is not logged, redirect to auth page
        else {
            fetchUsers(userToken)
        } 
    }, [currentPage]);
    
    return (
        <div className={styles.container}>
            <Header name={usersName}/>
            <h1>Users List</h1>
            <EditableList entities={usersList} onSubmitFunc={updateUser} onDeleteFunc={deleteUser} updateEntities={setUsersList}/>
            <Pagination pages={pages} updatePage={setCurrentPage}/>
            <AddNewUser updateCurrentList={setUsersList} />
        </div>
    )
}