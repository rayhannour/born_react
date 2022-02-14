import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

import { useHistory } from 'react-router-dom';
import { userLogin, fetchUserData } from '../ahthentificate/AuthenticationService';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import { useDispatch, useSelector } from 'react-redux';


import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import axios from 'axios';

function Login() {

    const history = useHistory();
    const toast = useRef();
    const message = useRef();
    const showWarn = (msg) => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: msg, life: 3000 });
    };
    const showError = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: msg, life: 3000 });
    };
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [data, setData] = useState({});
    const handleSubmit = (evt) => {

        evt.preventDefault();
        authenticate();
        userLogin(values).then((response) => {
            console.log("response", response);
            if (response.status === 200) {
                authSuccess(response.data);
                fetchUserData().then((response) => {
                    setData(response.data);
                    console.log(JSON.stringify(response.data));
                    localStorage.setItem('userdata', JSON.stringify(response.data));
                    localStorage.setItem('isAuthenticated', true);
                    history.push('/');
                }).catch((e) => {
                    localStorage.clear();
                    showError("Error connected.");

                })








            }
            else {
                authFailure('Something Wrong!Please Try Again');
                console.log('Something Wrong!Please Try Again');
                showError('Something Wrong!Please Try Again');
            }


        }).catch((err) => {

            if (err && err.response) {

                switch (err.response.status) {
                    case 401:
                        authFailure('Authentication Failed.Bad Credentials');
                        console.log("401 status");
                        console.log("Authentication Failed.Bad Credentials");
                        showWarn('Authentication Failed.Bad Credentials');
                        break;
                    default:
                        authFailure('Something Wrong!Please Try Again');
                        console.log('Something Wrong!Please Try Again');
                        showError('Something Wrong!Please Try Again');

                }

            }
            else {
                authFailure('Something Wrong!Please Try Again');
                console.log('Something Wrong!Please Try Again');
                showError('Something Wrong!Please Try Again');
            }
        });
     }
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };


    useEffect(() => {
        getLineData();
    }, []);
    const getLineData = async () => {
        try {
            const res = await axios.get('/api/cgpr/born/IdentiteAmenBorn/IdentiteAmenByIdentite', {
                auth: {
                    username: 'born',
                    password: 'bornAxYBorn2022'
                }
            });            
            console.log(res.status);
            console.log(res.data.result[0]);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div className="login-body">
            <Toast ref={toast} />
            <form onSubmit={handleSubmit} noValidate={false} >
                <div className="login-wrapper">
                    <div className="login-panel">
                        <button onClick={() => history.push('/')} className="logo p-link">
                            <img src="assets/layout/images/logo-freya-single.svg" alt="freya-layout" />
                        </button>

                        <InputText id="username" placeholder="Email" value={values.username} onChange={handleChange} name="username" required />
                        <Password id="password" placeholder="Password" value={values.password} onChange={handleChange} name="password" required />
                        <Button label="LOGIN" type="submit" ></Button>

                        <button className="p-link forget-password" type="button" >forget password?</button>
                        <p>Don’t you have an account, <button className="p-link" type="button">sign up</button></p>
                    </div>
                    <div className="login-footer">
                        <h4>freya</h4>
                        <h6>Copyright Ⓒ PrimeTek Informatics</h6>
                    </div>
                </div>
            </form>
        </div >
    )
}

export { Login };