import React ,{useState,useEffect} from 'react';
import { Button } from 'primereact/button';

import PrisonStatService from '../service/PrisonStatService';
import axios from "axios";

export default function PrintStatCovid({ listPrisonStat }) {

    const print = () => {
        window.print();
    }

    const [pos, setPos] = useState(null);
    
    
    var [totalDetenu,setTotalDetenu]=useState(0);
    var [totalDetenuVacciner,setTotalDetenuVacciner]=useState(0);
    var [totalDetenuRefue,setTotalDetenuRefue]=useState(0);

    useEffect(()=>{
      setPos('right');
        listPrisonStat.forEach(function(key) {    
        setTotalDetenu(totalDetenu=totalDetenu+parseFloat(key.nbrdetenu));
        setTotalDetenuVacciner(totalDetenuVacciner=totalDetenuVacciner+parseFloat(key.nbr_accept_vacciner));
        setTotalDetenuRefue(totalDetenuRefue=totalDetenuRefue+parseFloat(key.nbr_not_accept_vaccin));
       
      });
      
    }, []);


    const [dateTime, setDateTime] = useState(new Date());

    


    return (
        <div>
            <Button label="Print" icon="pi pi-print" onClick={print} style={{ display: 'block', marginBottom: '20px', marginLeft: '6px' }}></Button>

            <div className="p-grid" style={{ [pos] : 0 } }>
                <div className="p-col">
                    <div className="card">
                        <div id="invoice-content">
                            <div className="invoice">
                                <div className="invoice-header">
                                    <div className="invoice-company">
                                        <img id="invoice-logo" className="logo-image" src="assets/layout/images/dgpr.ico" alt="freya-layout" />
                                        <div className="company-name">CGPR</div>
                                       
                                    </div>
                                    <div>
                                        <div className="invoice-title">COVID-19</div>
                                        <div className="invoice-details">
                                            <div className="invoice-label">{`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</div>
                                            <div className="invoice-value">??????????????</div>

                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-to" style={{ textAlign: "center" } }>
                                    <div className="bill-to">?????????????? ???????? COVID-19</div>
                                    <div className="invoice-to-info">
                                        <div>?????????? ???????????????? ?????? ?????????????? ??????????????</div>
                                        <div>(???????????? ??????????????-???????????? ??????????????)</div>
                                    </div>
                                </div>
                                <div className="invoice-items">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>?????? ???????? ????????????????</th>
                                                <th>???????????? ??????????????</th>
                                                <th>???? ???????????? ??????????????</th>
                                                <th>????????????????</th>
                                                <th>???????????? ??????????????</th>
                                                <th>?????? ????????????????</th>
                                                <th>??????????</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {listPrisonStat && listPrisonStat.map(p => (
                                            <tr key={p.lib_prison}> 
                                                <td>{p.attente_vaccin}</td>
                                                <td>{p.nbr_not_accept_vaccin}</td>
                                                <td>{p.nbr_accept_notvacciner}</td>
                                                <td>{p.nbr_accept_vacciner}</td>
                                                <td>{p.accept_vaccin}</td>
                                                <td>{p.nbrdetenu}</td>
                                                <td >{p.lib_prison}</td>
                                            </tr>
                                            
                                            ))}

                                           
                                        </tbody>
                                    </table>
                                </div>
                                <div className="invoice-summary">
                                    <div className="invoice-notes">
                                        <b>NOTES</b>
                                        <div></div>
                                    </div>
                                    <div>
                                        <div className="invoice-details">
                                            <div className="invoice-label">{totalDetenuRefue}</div>
                                            <div className="invoice-value">???????????? ??????????????</div>

                                            <div className="invoice-label">{totalDetenuVacciner}</div>
                                            <div className="invoice-value">???????????????? ????????????????</div>

                                            <div className="invoice-label">{totalDetenu}</div>
                                            <div className="invoice-value">?????? ????????????????</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
