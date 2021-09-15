import React, { useState } from 'react';
import styles from '../styles/auth.module.css';
import { signupApi, signinApi } from '../constants';
import { callExternalApi } from '../helpers/callExternalApi';
import Router from 'next/router';
import { userRoles } from '../constants';

export default function Auth(): React.ReactElement {
    const [authMode, setAuthMode] = useState('Signin');
    const authUrl = authMode == "Signin" ? signinApi : signupApi;

    const updateAuthMode = () => {
        setAuthMode('Signup')
    }

    const authUser = async (event) => {
        event.preventDefault();
        let body = {};
    
        for (let i = 0; i < event.target.length; i++) {
            if (!event.target[i].id) continue;
            body[event.target[i].id] = event.target[i].value
        }
        
        const userData = await callExternalApi({ 
            url: authUrl,
            method: "post", 
            body
        });
        
        if (userData.errorMessage) { alert(userData.errorMessage) }
        else {
            localStorage.setItem("token", userData.data.user.token);
            localStorage.setItem("userId", userData.data.user.id);
            localStorage.setItem("role", userData.data.user.role);
            localStorage.setItem("firstName", userData.data.user.firstName);
            localStorage.setItem("lastName", userData.data.user.lastName);
            
            if (userData.data.user.role == userRoles.admin) Router.push('/users');
            else Router.push('/books')
        }
    }

    return(
        <div className={styles.container}>
            <h1> Welcome to authors portal </h1>
            <form className={styles.form} onSubmit={authUser}>
                {authMode == 'Signup' ? <input id="firstName" className={styles.input} placeholder="firstName" type="text"/> : null}
                {authMode == 'Signup' ? <input id="lastName" className={styles.input} placeholder="lastName" type="text"/> : null}
                <input id="email" className={styles.input} placeholder="email" type="text"/>
                <input id="password" className={styles.input}placeholder="password" type="text"/>
                <input className={styles.input} value={authMode} type="submit"/>
            </form>
            {authMode == 'Signin' ? <div className={styles.signupNote} onClick={updateAuthMode}> Not a user? Signup here </div> : null }
        </div>
    )
}