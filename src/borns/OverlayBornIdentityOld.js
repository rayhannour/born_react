import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { confirmPopup } from 'primereact/confirmpopup';
import ProductService from '../service/ProductService';
import { Divider } from 'primereact/divider';
import { KeyBoardPop } from '../borns/KeyBoardPop';
import { KeyBoardPad } from '../borns/KeyBoardPad';
import { KeyBordContext } from '../borns/KeyBordContext';

import axios from 'axios';

export const OverlayBornIdentityOld = () => {
    const [pos, setPos] = useState('right');
    const [data, setData] = useState("");
    const [value, setValue] = useState("");

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [pere, setPere] = useState("");
    const [gpere, setGpere] = useState("");


    const [annee, setAnnee] = useState("");
    const [numkenwa, setNumkenwa] = useState("");

    const op = useRef(null);
    const oppad = useRef(null);
    const toast = useRef(null);

    const dt = useRef(null);
    const [identitys, setIdentitys] = useState(null);
    const [identitysfilter, setIdentitysfilter] = useState(null);

    const [selectedData, setSelectedData] = useState(null);

const config = require('../borns/config.json');
console.log(config.api_url);
    useEffect(() => {
        getIdentiteData();
        //setIdentitysfilter(identitys);
    }, []);

    const getIdentiteData = async () => {
        try {
            const res = await axios.get(`${config.api_url}/api/cgpr/born/IdentiteAmenBorn/IdentiteAmenByIdentite`, {
                // Axios looks for the `auth` option, and, if it is set, formats a
                // basic auth header for you automatically.
                auth: {
                  username: 'born',
                  password: 'bornAxYBorn2022'
                }
              });
             setIdentitys(res.data.result);
             setIdentitysfilter(res.data.result);

        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        if (data === "ANNEE") {
            setAnnee("");
        }

        if (data === "NUMKENWA") {
            setNumkenwa("");
        }

        if (data === "USERNAME") {
            setUsername("");
        }

        if (data === "NAME") {
            setName("");
        }

        if (data === "PERE") {
            setPere("");
        }

        if (data === "GPERE") {
            setGpere("");
        }

    }, [data]);


    useEffect(() => {
        if (data === "ANNEE") {
            setAnnee(value);
        }

        if (data === "NUMKENWA") {
            setNumkenwa(value);
        }

        if (data === "USERNAME") {
            setUsername(value);
        }

        if (data === "NAME") {
            setName(value);
        }

        if (data === "PERE") {
            setPere(value);
        }

        if (data === "GPERE") {
            setGpere(value);
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

    const toggleUserName = (event) => {
        setData("USERNAME");
        op.current.toggle(event);
    };
    const toggleName = (event) => {
        setData("NAME");
        op.current.toggle(event);
    };

    const togglePere = (event) => {
        setData("PERE");
        op.current.toggle(event);
    };

    const toggleGpere = (event) => {
        setData("GPERE");
        op.current.toggle(event);
    };


    const handleReset = () => {
        setIdentitysfilter(identitys);
        setName('');
        setPere('');
        setGpere('');
        setUsername('');
        setAnnee('');
        setNumkenwa('');
    };

const [anneenumpecule,setAnneenumpecule]=useState('');



    useEffect(() => {
        
        if(identitys!==null){
            if(annee!=='' && annee!==null){
                setAnneenumpecule(`${annee}${numkenwa}`);
                const results = identitysfilter.filter(res=> res.anneepecule.includes(annee) ); 
                setIdentitysfilter(results);
            }
            if(numkenwa!=='' && numkenwa!==null){
                setAnneenumpecule(`${annee}${numkenwa}`);
                const results = identitysfilter.filter(res=> res.numpecule.includes(numkenwa) ); 
                setIdentitysfilter(results);
            }
           
        }

    }, [annee,numkenwa]);


    useEffect(() => {
        
        if(identitys!==null){
            if(name!=='' && name!==null){
                const results = identitysfilter.filter(res=> res.nom.includes(name) ); 
                setIdentitysfilter(results);
            }
           
        }

    }, [name]);
    useEffect(() => {
        
        if(identitys!==null){
            
            if(username!=='' && username!==null){
                const results = identitysfilter.filter(res=> res.prenom.includes(username) ); 
                setIdentitysfilter(results);
            }
            if(pere!=='' && pere!==null){
                const results = identitysfilter.filter(res=> res.prenompere.includes(pere) ); 
                setIdentitysfilter(results);
            }
            if(gpere!=='' && gpere!==null){
                const results = identitysfilter.filter(res=> res.prenomgpere.includes(gpere) ); 
                setIdentitysfilter(results);
            }
        }

    }, [username,pere,gpere]);

    let emptyProduct = {
        anneenumpecule: '',
        nom: '',
        prenomgpere: '',
        prenompere: '',
        prenom: '',
        anneepecule: '',
        anneepecule: '',
        numpecule: '',
        soldeexistant:'',
        codres:'',
        dateresidence:null,
        codechambre:'',
        libellepavillon:'',
        codepavillon:'',
        image:''


    };
    const [product, setProduct] = useState(emptyProduct);
    const [productDialog, setProductDialog] = useState(false);
    const [image, setImage] = useState('');
    const getIdentiteDataUnique = async (ppecule) => {
        setImage('assets/demo/images/user.png');
        try {
            const resdata = await axios.get(`${config.api_url}/api/cgpr/born/IdentiteAmenBorn/IdentiteAmenByIdentifiant/${ppecule}`, {
                // Axios looks for the `auth` option, and, if it is set, formats a
                // basic auth header for you automatically.
                auth: {
                    username: 'born',
                    password: 'bornAxYBorn2022'
                }
            });
            console.log(resdata.data.status);

            if(resdata.data.status===200){

                setImage(`data:image/png;base64,${resdata.data.result.image}`);


            }else{
                
            }

            
            
        } catch (error) {
            console.log(error.response);
        }
    };


    const showProduct = (product) => {
        setProduct({ ...product });
        console.log(product.anneenumpecule);
        getIdentiteDataUnique(product.anneenumpecule);
        setProductDialog(true);
        
    }

    const hideDialog = () => {
        setProductDialog(false);
    }
    const actionBodyTemplate = (rowData) => {
        
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => showProduct(rowData)} />
            </div>
        );
    }



    
       return (
        <>
        <Toast ref={toast} />
        <div style={{ [pos]: 0 }}> <Button label="فسخ معطيات البحث" icon="pi pi-search"  style={{ display: 'block', marginBottom: '20px', marginLeft: '6px',width:'200px',height:'50px' }} onClick={handleReset}></Button></div>

        <div className="card">
            <div className="p-fluid p-grid">
            <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                        <InputText type="text" id="Annee"  value={annee} onClick={toggleAnnee}  />
                        <OverlayPanel ref={oppad} appendTo={document.body} showCloseIcon  style={{ width: '650px' }}>
                            <KeyBordContext.Provider value={{ value, setValue, data }}>
                                <KeyBoardPad />
                            </KeyBordContext.Provider>
                        </OverlayPanel>
                            <label htmlFor="Annee">سنة القنوة</label>
                        </span>
                    </div>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                        <InputText type="text" id="Kenwa"  value={numkenwa} onClick={toggleNumkenwa} />
                        <OverlayPanel ref={oppad} appendTo={document.body} showCloseIcon  style={{ width: '650px' }}>
                            <KeyBordContext.Provider value={{ value, setValue, data }}>
                                <KeyBoardPad />
                            </KeyBordContext.Provider>
                        </OverlayPanel>
                            <label htmlFor="Kenwa">عدد القنوة</label>
                        </span>
                    </div>
                </div>

            <Divider />

                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                        <InputText id="Name" type="text" value={name} onClick={toggleName} />
                            <OverlayPanel ref={op} appendTo={document.body} showCloseIcon  style={{ width: '650px' }}>
                                <KeyBordContext.Provider value={{ value, setValue, data }}>
                                    <KeyBoardPop />
                                </KeyBordContext.Provider>
                            </OverlayPanel>
                            <label htmlFor="Name">اللقب</label>
                        </span>
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                            <InputText id="Pere" type="text" value={gpere} onClick={toggleGpere} />
                            <OverlayPanel ref={op} appendTo={document.body} showCloseIcon  style={{ width: '650px' }}>
                                <KeyBordContext.Provider value={{ value, setValue, data }}>
                                    <KeyBoardPop />
                                </KeyBordContext.Provider>
                            </OverlayPanel>                            
                            <label htmlFor="Pere">اسم الجد</label>
                        </span>
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                        <InputText id="GPere" type="text" value={pere} onClick={togglePere} />
                            <OverlayPanel ref={op} appendTo={document.body} showCloseIcon  style={{ width: '650px' }}>
                                <KeyBordContext.Provider value={{ value, setValue, data }}>
                                    <KeyBoardPop />
                                </KeyBordContext.Provider>
                            </OverlayPanel>
                            <label htmlFor="GPere">اسم الأب</label>
                        </span>
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                                                    
                        <InputText type="text" id="Username"  value={username} onClick={toggleUserName} />
                        <OverlayPanel ref={op} appendTo={document.body} showCloseIcon  style={{ width: '650px' }}>
                            <KeyBordContext.Provider value={{ value, setValue, data }}>
                                <KeyBoardPop />
                            </KeyBordContext.Provider>
                        </OverlayPanel>
                            <label htmlFor="Username">الإسم</label>
                        </span>
                    </div>
                </div>

               
                <div className="p-field p-col-12 p-md-12">
                <DataTable ref={dt} value={identitysfilter}  paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        selection={selectedData} onSelectionChange={(e) => setSelectedData(e.value)}
                        dataKey="anneenumpecule"
                       >                       
                        <Column field="nom" header="اللقب" sortable ></Column>
                        <Column field="prenomgpere" header="اسم الجد" sortable ></Column>
                        <Column field="prenompere" header="اسم الأب" sortable ></Column>
                        <Column field="prenom" header="الإسم" sortable ></Column>
                        <Column field="anneepecule" header="سنة القنوة" ></Column>
                        <Column field="numpecule" header="عدد القنوة" ></Column>
                        <Column body={actionBodyTemplate} header="مشاهدة"></Column>
                    </DataTable>
                </div>

                <Dialog visible={productDialog} style={{ width: '450px' }} header="Detenu Details" modal className="p-fluid"  onHide={hideDialog}>

                        <div><img src={image}  className="product-image" style={{width: 200, height: 200, borderRadius: 200/ 2}} /></div>
                        
                        
                        <div className="card stocks">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h6>👓 {product.prenom} {product.prenompere} {product.prenomgpere} {product.nom}</h6>
                                        <p className="subtitle">Pavillon</p>
                                    </div>
                                    <Button type="button" icon="pi pi-plus" className="p-button-secondary p-button-text p-button-rounded"></Button>
                                </div>
                        
                        <ul>
                                    <li className="down">
                                        <div className="stock-name">
                                            <h6>{product.codres}</h6>
                                        </div>
                                        {product.libellepavillon}
                                        <div className="stock-price">
                                            <i className="pi pi-arrow-down"></i>
                                            <h6>{product.codechambre}</h6>
                                        </div>
                                        <div className="stock-status">
                                            <span>{product.dateresidence}</span>
                                            
                                        </div>
                                    </li>
                                    </ul>
                                    </div>
                        
                    </Dialog>                


            </div>
        </div>








        </>
    )
}
