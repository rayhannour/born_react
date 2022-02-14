import React, { useEffect, useState } from 'react';
import { AuthentificateUser } from '../borns/dialog/AuthentificateUser';

import { useHistory } from 'react-router-dom';
import { Loader1, Loader2, Loader3, Loader7 } from "../loaders/index";


export const Dashboard = ({ showStat }) => {
    const [displayBasic, setDisplayBasic] = useState(false);

    const history = useHistory();
    function onclickdata() {
        history.push('/uikit/overlaybornidentity');
    }
    const onclickdataTicket = () => {
        history.push('/uikit/OverlayBornTicket');
    }

    const [showStatBasic, setShowStatBasic] = useState(showStat);
    const [intervalval, setIntervalval] = useState();

    const handleStart = () => {
        let increment = setInterval(() => {
            if (showStat) {
                setShowStatBasic(showStat);
                sessionStorage.setItem('showStatBasic', showStatBasic);
            }
        }, 3000);
        setIntervalval(increment);
    }


    const handleReset = () => {
        clearInterval(intervalval);

    }

    useEffect(() => {
        handleStart();
    }, [showStat]);

    useEffect(() => {
        setTcodgou(sessionStorage.getItem('tcodgou'));
        console.log("tcodgou :" + tcodgou);
        handleReset();
    }, [showStatBasic]);

    const [tcodgou, setTcodgou] = useState("");

    return (
        <div className="layout-dashboard">

            {showStatBasic ?
                <>
                    <AuthentificateUser displayBasic={displayBasic} onclickdata={onclickdata} setDisplayBasic={setDisplayBasic} />

                    <div className="p-grid">
                        <div className="p-col-12">
                            <div className="notification">
                                <h6>👋 مرحبا بكم في الفضاء الآلى داخل الوحدة السجنية ! <button className="p-link">الشروع في الإستخدام <i className="pi pi-arrow-up"></i></button></h6>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-grid" style={{ margin: '-1rem' }}>
                                <div className="p-col" style={{ marginBottom: '20px', marginLeft: '6px', height: '400px' }}>
                                    <div onClick={() => [setDisplayBasic(true)]} className="card overview-box blue" style={{ flex: 1, textAlign: 'center', alignItems: 'center', textAlignVertical: 'center' }}>
                                        <div className="overview-info" >
                                            <span style={{ flex: 1, textAlign: 'center', alignItems: 'center', textAlignVertical: 'center', fontSize: '60px' }}>فضاء العون</span>

                                        </div>
                                        <i className="pi pi-users"></i>

                                    </div>
                                </div>

                                <div className="p-col" style={{ marginBottom: '20px', marginLeft: '6px', height: '400px' }}>
                                    <div onClick={() => [onclickdataTicket()]} className="card overview-box orange" style={{ flex: 1, textAlign: 'center', alignItems: 'center', textAlignVertical: 'center' }}>
                                        <div className="overview-info">
                                            <span style={{ flex: 1, textAlign: 'center', alignItems: 'center', textAlignVertical: 'center', fontSize: '60px' }}>فضاء السجين</span>

                                        </div>
                                        <i className="pi pi-th-large"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div >
                </> :

                <div className="p-grid">
                    <div className="p-col-12 p-md-6" style={{ verticalAlign: "center" }}><img src='assets/demo/images/born/BORN.png' /></div>
                    <div className="p-col-12 p-md-6" style={{ verticalAlign: "center" }}>
                    <Loader1 />
                    </div>
                </div>

            }

        </div >
    )

}
