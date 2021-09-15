import React from 'react';
import styles from '../styles/addUser.module.css';
import { AiFillCheckCircle } from 'react-icons/ai';
import { callExternalApi } from '../helpers/callExternalApi';
import { signupApi } from '../constants';

export default function AddNewUser(props): React.ReactElement {
    const saveUser = async (event) => {
        event.preventDefault();
        let body = {};
    
        for (let i = 0; i < event.target.length; i++) {
            if (!event.target[i].id) continue;
            body[event.target[i].id] = event.target[i].value
        }
        
        const userData = await callExternalApi({ 
            url: signupApi,
            method: "post", 
            body
        });

        if (userData.errorMessage) alert(userData.errorMessage)
        else {
            const newUser = { 
                firstName: userData.data.user.firstName,
                lastName: userData.data.user.lastName,
                email: userData.data.user.email,
                role: userData.data.user.role,
                id: userData.data.user.id,
            }
            props.updateCurrentList(current => [...current, newUser]);
        }
    }

    return(
        <div className={ styles.container }>
            <h2>Add new user</h2>
            <form onSubmit={saveUser}>
                <input  type="text" id="firstName" placeholder="firstName" required={true}/>
                <input  type="text" id="lastName" placeholder="lastName" required={true}/>
                <input  type="text" id="email" placeholder="email" required={true}/>
                <input  type="text" id="password" placeholder="password" required={true}/>
                <input  type="text" id="role" placeholder="1 - admin / 2- user"/>
                <button type="submit" title="Create user">
                    <AiFillCheckCircle />
                </button>
            </form>
        </div>
    )
}