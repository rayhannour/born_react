import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import '../dialog/DialogDemo.css';
import { ProgressBar } from 'primereact/progressbar';

export default function DialogCovid({ arrayStat }) {

    const [total, setTotal] = useState(100);
    const [vacciner, setVacciner] = useState(0);
    const [nonvacciner, setNonvacciner] = useState(0);

    const [nbrnvacciner, setNbrnvaccinerr] = useState(arrayStat.nbrdetenu-arrayStat.nbr_accept_vacciner);

  
    useEffect(() => {
        
        setVacciner(arrayStat.nbr_accept_vacciner*total/arrayStat.nbrdetenu);
        setNonvacciner(nbrnvacciner*total/arrayStat.nbrdetenu);
    }, []);
    


    return (
        <>
        <p className="p-m-0">STATESTIQUE GLOBAL POUR LES DETENUES RESIDENT</p>
        <div>
            <div className="progress active">
                <span>Total Detenues ({arrayStat.lib_prison})</span>
                <ProgressBar className="progressBar" value={100} showValue={false}></ProgressBar>
                <span>{arrayStat.nbrdetenu}</span>
            </div>
            <div className="progress">
                <span>Detenues Vacciner</span>
                <ProgressBar className="progressBar"  value={vacciner} showValue={false}></ProgressBar>
                <span>{arrayStat.nbr_accept_vacciner}</span>
            </div>
            <div className="progress">
                <span>Detenues Non Vacciner</span>
                <ProgressBar className="progressBar" value={nonvacciner} showValue={false}></ProgressBar>
                <span>{nbrnvacciner}</span>
            </div>
        </div>
        </>
    )
}
