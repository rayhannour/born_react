import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { KeyBoardPad } from '../borns/KeyBoardPad';
import { KeyBordContext } from '../borns/KeyBordContext';
import { Messages } from 'primereact/messages';
import axios from 'axios';

import generator from "generate-password";

export const OverlayBornTicket = () => {
    const [data, setData] = useState("");
    const [value, setValue] = useState("");

    const [annee, setAnnee] = useState("");
    const [numkenwa, setNumkenwa] = useState("");

    const oppad = useRef(null);
    const toast = useRef(null);

    const config = require('../borns/config.json');
    console.log(config.api_url);


    const getIdentiteData = async () => {

        if(anneenumpecule==="" || anneenumpecule===null){
            addErrorMessage("الرجاء ادخال المعطيات ! شكرا.");
        }else{

        try {
            const res = await axios.get(`${config.api_url}/api/cgpr/born/IdentiteAmenBorn/IdentiteAmenByIdentifiant/${anneenumpecule}`, {
                // Axios looks for the `auth` option, and, if it is set, formats a
                // basic auth header for you automatically.
                auth: {
                    username: 'born',
                    password: 'bornAxYBorn2022'
                }
            });
            console.log(res.data.status);

            if (res.data.status === 200) {
                alert("ps_"+res.data.result.soldeexistant);
                //setIdentitys(res.data.result);
            } else {
                addErrorMessage("رقم القنوة غير موجود!");
            }



        } catch (error) {
            console.log(error.response);
        }
    }

    };

    useEffect(() => {
        if (data === "ANNEE") {
            setAnnee("");
        }

        if (data === "NUMKENWA") {
            setNumkenwa("");
        }
    }, [data]);


    useEffect(() => {
        if (data === "ANNEE") {
            setAnnee(value);
        }

        if (data === "NUMKENWA") {
            setNumkenwa(value);
        }

    }, [value]);


    const toggleAnnee = (event) => {

        setData("ANNEE");
        oppad.current.toggle(event);
    };

    const toggleNumkenwa = (event) => {
        setData("NUMKENWA");
        oppad.current.toggle(event);
    };




    const handleReset = () => {
        setAnnee('');
        setNumkenwa('');
    };


    const handlePrint = () => {
        getIdentiteData();
        setAnnee('');
        setNumkenwa('');
    };

    const [anneenumpecule, setAnneenumpecule] = useState('');



    useEffect(() => {
        
        setAnneenumpecule(`${annee}${numkenwa}`);
        console.log(anneenumpecule);
    }, [annee, numkenwa]);


    const message = useRef();
    const addErrorMessage = (msg) => {
        message.current.show({ severity: 'error', content: msg });
    };


    const [password, setPassword] = useState('');
    const handlePrintPwd = () => {
    const pwd = generator.generate({
        length: 5,
        numbers: true
      });
      setPassword(pwd);
    };

    return (
        <>
        <Toast ref={toast} />
        <div > <Button label="فسخ معطيات البحث" icon="pi pi-search" style={{ display: 'block', marginBottom: '20px', marginLeft: '6px', width: '200px', height: '50px' }} onClick={handleReset}></Button></div>
        <div className="card">
            <div className="p-fluid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                            <InputText type="text" id="Annee" value={annee} onClick={toggleAnnee} />
                            <OverlayPanel ref={oppad} appendTo={document.body} showCloseIcon style={{ width: '650px' }}>
                                <KeyBordContext.Provider value={{ value, setValue, data }}>
                                    <KeyBoardPad />
                                </KeyBordContext.Provider>
                            </OverlayPanel>
                            <label htmlFor="Annee" style={{ fontSize: '20px' }}>سنة القنوة</label>
                        </span>
                    </div>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                            <InputText type="text" id="Kenwa" value={numkenwa} onClick={toggleNumkenwa} />
                            <OverlayPanel ref={oppad} appendTo={document.body} showCloseIcon style={{ width: '650px' }}>
                                <KeyBordContext.Provider value={{ value, setValue, data }}>
                                    <KeyBoardPad />
                                </KeyBordContext.Provider>
                            </OverlayPanel>
                            <label htmlFor="Kenwa" style={{ fontSize: '20px' }}>عدد القنوة</label>
                        </span>
                    </div>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <div > <Button label="طباعة الرصيد" icon="pi pi-print" style={{ display: 'block', marginBottom: '20px', marginLeft: '6px', width: '200px', height: '50px' }} onClick={handlePrint}></Button></div>

                    </div>
                </div>
                <Divider />




            </div>

            <div className="p-fluid p-grid">
                <div className="p-field p-col-12 p-md-12">
                    <Messages ref={message} />
                </div>
            </div>




        </div>








        </>
    )
}
