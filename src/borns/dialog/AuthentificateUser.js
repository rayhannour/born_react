import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { KeyBoardPad } from '../KeyBoardPad';
import { KeyBordContext } from '../KeyBordContext';
import { OverlayPanel } from 'primereact/overlaypanel';

import { userLogin, fetchUserData } from '../../ahthentificate/AuthenticationService';
import { authenticate, authFailure, authSuccess } from '../../redux/authActions';



export const AuthentificateUser = ({ displayBasic, onclickdata, setDisplayBasic }) => {

        

    const oppad = useRef(null);
    const [data, setData] = useState("");
    const [value, setValue] = useState("");

    const [username, setUsername] = useState("");
    const [userpwd, setUserpwd] = useState("");
    useEffect(() => {
        
        return ()=>{
            setUsername("");
            setUserpwd("");
        }
    }, []);

    const [values, setValues] = useState({
        username: '',
        password: ''
    });


    const toast = useRef();
    const message = useRef();
    const showWarn = (msg) => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: msg, life: 3000 });
    };
    const showError = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: msg, life: 3000 });
    };

    const [talias, setTalias] = useState(localStorage.getItem('alias'));
    const [tcodgous, setTcodgous] = useState(localStorage.getItem('tcodgou'));
    const [tcodprs, setTcodprs] = useState(localStorage.getItem('tcodpr'));

    const login = () => {


        console.log({
            username: username,
            password: userpwd
        });
        authenticate();

        userLogin({
            username: username,
            password: userpwd,
            alias: talias,
            tcodgou: tcodgous,
            tcodpr: tcodprs

        }).then((response) => {

            console.log("response", response);
            if (response.status === 200) {

                authSuccess(response.data);
                onclickdata();
            }
            else {
                authFailure('Something Wrong!Please Try Again');
                showError('Something Wrong!Please Try Again');
            }

        }).catch((err) => {

            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        authFailure('Authentication Failed.Bad Credentials');
                        showWarn('Authentication Failed.Bad Credentials');
                        break;
                         
                    default:
                    authFailure('Something Wrong!Please Try Again');
                    showError('Something Wrong!Please Try Again');

                }

            }
            else {
                authFailure('Something Wrong!Please Try Again');
                showError('Something Wrong!Please Try Again');
            }




        });



    };

    const toggleUsername = (event) => {
        setData("USERNAME");
        oppad.current.toggle(event);
    };
    const togglePassword = (event) => {
        setData("PASSWORD");
        oppad.current.toggle(event);
    };

    useEffect(() => {
        if (data === "USERNAME") {
            setUsername(value);
        }

        if (data === "PASSWORD") {
            setUserpwd(value);
        }

    }, [value]);



    return (
        <>
         <Toast ref={toast} />
           
               
                
                
                <Dialog header="Authentificate" visible={displayBasic} style={{ width: '400px' }} modal onHide={() => setDisplayBasic(false)}>
                    <Button label="Login" type='button' onClick={login}></Button>
                    
                    <div className="p-fluid">

                        <p />
                        <p />
                        <div className="p-field">
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText id="username" type="text" placeholder="Username" value={username} onClick={toggleUsername} autocomplete="off"/>
                            </span>
                            <OverlayPanel ref={oppad} appendTo={document.body} showCloseIcon style={{ width: '650px' }}>
                                <KeyBordContext.Provider value={{ value, setValue, data }}>
                                    <KeyBoardPad />
                                </KeyBordContext.Provider>
                            </OverlayPanel>
                        </div>
                        <div className="p-field">
                            <span className="p-input-icon-left">
                                <i className="pi pi-unlock" />
                                <InputText id="password" type="password" placeholder="Password" value={userpwd} onClick={togglePassword} autocomplete="off"/>
                            </span>
                            <OverlayPanel ref={oppad} appendTo={document.body} showCloseIcon style={{ width: '650px' }}>
                                <KeyBordContext.Provider value={{ value, setValue, data }}>
                                    <KeyBoardPad />
                                </KeyBordContext.Provider>
                            </OverlayPanel>
                        </div>


                    </div>
                </Dialog>


           
        </>
    )
}

