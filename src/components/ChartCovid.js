import React, { useEffect, useState,useRef } from 'react';
import { Chart } from 'primereact/chart';
import ChartService from '../service/ChartService';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { OverlayPanel } from 'primereact/overlaypanel';

import PrisonStatService from '../service/PrisonStatService';


import PrintStatCovid from '../pages/PrintStatCovid';
import DialogCovid from '../components/dialog/DialogCovid'

import { Dialog } from 'primereact/dialog';
import '../components/dialog/DialogDemo.css';

export const ChartCovid = () => {

    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [libPrison, setLibPrison] = useState('');
    const dialogFuncMap = {
       
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
               
                <Button label="Close" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }


    const chartsOptions = {
        legend: {
            display: true,
            labels: {
                fontColor: '#A0A7B5'
            }
        },
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: '#A0A7B5'
                },
                gridLines: {
                    color: 'rgba(160, 167, 181, .3)',
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: '#A0A7B5'
                },
                gridLines: {
                    color: 'rgba(160, 167, 181, .3)',
                }
            }],
        }
    }
    const chartsOptionsPie = {
        legend: {
            display: true,
            labels: {
                fontColor: '#A0A7B5'
            }
        },
        responsive: true
    }

    const toast = useRef(null);
    const op2 = useRef(null);
    const opprint = useRef(null);
    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [selectedProductDialog, setSelectedProductDialog] = useState(null);

    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const imageBodyTemplate = (data) => <img src={`assets/demo/images/product/${data.image}`} alt={data.image} className="product-image" width="50" style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} />;
    const toggleDataTable = (event) => {
        op2.current.toggle(event);
    };

    const togglePrintTable = (event) => {
        opprint.current.toggle(event);
    };

    const onProductSelect = (event) => {
        op2.current.hide();
        toast.current.show({ severity: 'info', summary: 'Product Selected', detail: event.data.name, life: 3000 });
        
        console.log(event.data);

        setSelectedProductDialog(event.data);
        setLibPrison(event.data.lib_prison);
        onClick('displayPosition', 'bottom');

        
    };

    useEffect(() => {
        const productService = new PrisonStatService();
        productService.getStatPrisonService().then(data => setProducts(data));
    }, []);
    






    const chartService = new ChartService();
    
    const [chartLineTitle, setChartLineTitle] = useState("");
    const [chartLine, setChartLine] = useState({});
    const [chartPieMale, setChartPieMale] = useState({});
    const [chartPieFemele, setChartPieFemele] = useState({});
    useEffect(() => {
       
        getLineData();

    }, []);

    const getLineData = async () => {
        try {
            const res=await chartService.getChartsLine();

            console.log(res);

            setChartLineTitle(Object.values(res.data.country));

            setChartLine({
                labels: Object.keys(res.data.provaince),

                datasets: [
                    {
                        label: 'Males',
                        data: Object.values(res.data.timeline.males),
                        fill: false,
                        backgroundColor: 'rgb(255, 205, 86)',
                        borderColor: 'rgb(255, 205, 86)'
                    },
                    {
                        label: 'Femele',
                        data: Object.values(res.data.timeline.femeles),
                        fill: false,
                        backgroundColor: 'rgb(75, 192, 192)',
                        borderColor: 'rgb(75, 192, 192)'
                    }
                ]
            });


            setChartPieMale({
                labels: Object.keys(res.data.timeline.males),
                datasets: [{
                    data: Object.values(res.data.timeline.males),
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgb(255, 0, 127)',
                        'rgb(255, 99, 132)'
                    ]
                }]
            });

            setChartPieFemele({
                labels: Object.keys(res.data.timeline.femeles),
                datasets: [{
                    data: Object.values(res.data.timeline.femeles),
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgb(255, 153, 153)',
                        'rgb(255, 99, 132)'
                    ]
                }]
            });


        } catch (error) {
            console.log(error.response);
        }
    };


    


    return (
        <>
        <Toast ref={toast} />
        <div className="p-grid p-fluid">
            <div className="p-col-12 p-lg-6">
                <div className="card">
                    <h5 className="centerText">{ chartLineTitle}</h5>
                    <Chart type="line" data={chartLine} options={chartsOptions}  />
                </div>
            </div>

            <div className="p-col-12 p-lg-3">
                <div className="card">
                    <h5 className="centerText">MALE</h5>
                    <Chart type="pie" data={chartPieMale} options={chartsOptionsPie} />
                </div>

            </div>

            <div className="p-col-12 p-lg-3">
                <div className="card">
                    <h5 className="centerText">FEMELE</h5>
                    <Chart type="pie" data={chartPieFemele} options={chartsOptionsPie} />
                </div>
            </div>


            <div className="p-col-12 p-lg-6">dilog
           
  
            </div>

            <div className="p-col-12 p-lg-3">
            

            <Button  onClick={togglePrintTable}>
                        <i className="pi pi-slack p-px-2"></i>
                        <span className="p-px-3">PrintDataTable</span>
                    </Button>

                                <OverlayPanel ref={opprint} appendTo={document.body} showCloseIcon id="overlay_panel" style={{ width: '100%' }}>
                                    <PrintStatCovid listPrisonStat={products} />
                                </OverlayPanel>
            </div>

            <div className="p-col-12 p-lg-3">

            
            
            <Button  onClick={toggleDataTable}>
                        <i className="pi pi-slack p-px-2"></i>
                        <span className="p-px-3">Statestique Via Prison</span>
                    </Button>

                                <OverlayPanel ref={op2} appendTo={document.body} showCloseIcon id="overlay_panel" style={{ width: '80%',height: '80%' }}>
                                    <DataTable value={products} selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} selectionMode="single"
                                        paginator rows={10} onRowSelect={onProductSelect}>
                                        <Column field="lib_prison" header="PRISON" sortable></Column>                                        
                                        <Column field="nbrdetenu" header="TOTAL DETENU"  sortable></Column>

                                        <Column field="accept_vaccin" header="ACCEPT VACCINER"  sortable></Column>
                                        <Column field="nbr_accept_vacciner" header="D. VACCINER"  sortable></Column>
                                        <Column field="nbr_accept_notvacciner" header="D. ACCEPT(NON VACCINER)"  sortable></Column>
                                        <Column field="nbr_not_accept_vaccin" header="D. REFUE VACCINER"  sortable></Column>
                                        <Column field="attente_vaccin" header="D. ATTENTE INSCRIT"  sortable></Column>

                                    </DataTable>
            </OverlayPanel>


                               


            </div>
            <Dialog header={libPrison} visible={displayPosition} position={position} modal style={{ width: '50vw' }} footer={renderFooter('displayPosition')} 
            onHide={() => onHide('displayPosition')}
                    draggable={false} resizable={false}>

                    <DialogCovid arrayStat={selectedProductDialog}/>
            
            
            </Dialog>
        </div>
</>


    )
}