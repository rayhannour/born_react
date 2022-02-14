import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { KeyBoardPopSideBar } from '../borns/KeyBoardPopSideBar';
import { KeyBoardPadSideBar } from '../borns/KeyBoardPadSideBar';
import { KeyBordContext } from '../borns/KeyBordContext';
import axios from 'axios';

export const OverlayBornIdentity = () => {

    const [data, setData] = useState("");
    const [libdata, setLibdata] = useState("");
    const [value, setValue] = useState("");

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [pere, setPere] = useState("");
    const [gpere, setGpere] = useState("");


    const [annee, setAnnee] = useState("");
    const [numkenwa, setNumkenwa] = useState("");


    const toast = useRef(null);

    const dt = useRef(null);
    const [identitys, setIdentitys] = useState(null);
    const [identitysfilter, setIdentitysfilter] = useState(null);

    const [selectedData, setSelectedData] = useState(null);

    const config = require('../borns/config.json');
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
            setLibdata("سنة القنوة");
        }

        if (data === "NUMKENWA") {
            setNumkenwa("");
            setLibdata("عدد القنوة");
        }

        if (data === "USERNAME") {
            setUsername("");
            setLibdata("الإسم");
        }

        if (data === "NAME") {
            setName("");
            setLibdata("اللقب");
        }

        if (data === "PERE") {
            setPere("");
            setLibdata("اسم الأب");
        }

        if (data === "GPERE") {
            setGpere("");
            setLibdata("اسم الجد");
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
        //oppad.current.toggle(event);
        setVisibleBottomPad(true);


    };

    const toggleNumkenwa = (event) => {
        setData("NUMKENWA");
        //oppad.current.toggle(event);
        setVisibleBottomPad(true);
    };

    const toggleUserName = (event) => {
        setData("USERNAME");
        //op.current.toggle(event);
        setVisibleBottom(true);
    };
    const toggleName = (event) => {
        setData("NAME");
        //op.current.toggle(event);
        setVisibleBottom(true);
    };

    const togglePere = (event) => {
        setData("PERE");
        //op.current.toggle(event);
        setVisibleBottom(true);
    };

    const toggleGpere = (event) => {
        setData("GPERE");
        //op.current.toggle(event);
        setVisibleBottom(true);
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

    const [anneenumpecule, setAnneenumpecule] = useState('');
    useEffect(() => {

        if (identitys !== null) {
            refilterDataPad();
        }

    }, [annee, numkenwa]);


    useEffect(() => {

        if (identitys !== null) {
            refilterData();
        }

    }, [name]);

    useEffect(() => {
        if (identitys !== null) {
            refilterData();
        }

    }, [username]);

    useEffect(() => {

        if (identitys !== null) {
            refilterData();
        }

    }, [pere]);

    useEffect(() => {


        if (identitys !== null) {
            refilterData();
        }

    }, [gpere]);


    function refilterData() {
        setAnnee('');
        setNumkenwa('');
        const filteredUsers = identitys.filter(item => {
            return (
                item.nom.toLowerCase().indexOf(name) >= 0
                && item.prenom.toLowerCase().indexOf(username) >= 0
                && item.prenompere.toLowerCase().indexOf(pere) >= 0
                && item.prenomgpere.toLowerCase().indexOf(gpere) >= 0

            )
        });
        setIdentitysfilter(filteredUsers);
    }


    function refilterDataPad() {
        setName('');
        setPere('');
        setGpere('');
        setUsername('');

        const filteredUsers = identitys.filter(item => {
            return (
                item.anneepecule.toLowerCase().indexOf(annee) >= 0
                && item.numpecule.toLowerCase().indexOf(numkenwa) >= 0

            )
        });
        setIdentitysfilter(filteredUsers);
    }


    let emptyProduct = {
        anneenumpecule: '',
        nom: '',
        prenomgpere: '',
        prenompere: '',
        prenom: '',
        anneepecule: '',
        anneepecule: '',
        numpecule: '',
        soldeexistant: '',
        codres: '',
        dateresidence: null,
        codechambre: '',
        libellepavillon: '',
        codepavillon: '',
        image: ''


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

            if (resdata.data.status === 200) {

                setImage(`data:image/png;base64,${resdata.data.result.image}`);


            } else {

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


    const [visibleBottom, setVisibleBottom] = useState(false);
    const [visibleBottomPad, setVisibleBottomPad] = useState(false);

    return (
        <>
        <Toast ref={toast} />

        <div className="card">
            <div className="p-fluid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                            <InputText type="text" id="Annee" value={annee} onClick={toggleAnnee} />

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

                            <label htmlFor="Kenwa" style={{ fontSize: '20px' }}>عدد القنوة</label>
                        </span>
                    </div>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <div > <Button label="فسخ معطيات البحث" icon="pi pi-search" style={{ display: 'block', marginBottom: '20px', marginLeft: '6px', width: '200px', height: '50px' }} onClick={handleReset}></Button></div>
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

                            <label htmlFor="Name" style={{ fontSize: '20px' }}>اللقب</label>
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

                            <label htmlFor="Pere" style={{ fontSize: '20px' }}>اسم الجد</label>
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

                            <label htmlFor="GPere" style={{ fontSize: '20px' }}>اسم الأب</label>
                        </span>
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">

                            <InputText type="text" id="Username" value={username} onClick={toggleUserName} />

                            <label htmlFor="Username" style={{ fontSize: '20px' }}>الإسم</label>
                        </span>
                    </div>
                </div>


                <div className="p-field p-col-12 p-md-12">
                    <DataTable ref={dt} value={identitysfilter} paginator rows={4} rowsPerPageOptions={[4, 8, 12]} className="datatable-responsive"
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

                <Dialog visible={productDialog} style={{ width: '450px' }} header="خاص بمعطيات الإقامة" modal className="p-fluid" onHide={hideDialog}>

                    <div><img src={image} className="product-image" style={{ width: 300, height: 300, borderRadius: 30 }} /></div>


                    <div className="card stocks">
                        <div className="card-header">
                            <div className="card-title">
                                <h6>👓 {product.prenom} {product.prenompere} {product.prenomgpere} {product.nom}</h6>
                                <p className="subtitle">الجناح و الغرفة</p>
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

            <Sidebar visible={visibleBottom} onHide={() => setVisibleBottom(false)} baseZIndex={1000} position="bottom"

                style={{ height: '250px', transition: 'all 1s', 'WebkitTransition': 'all 1s', opacity: 0.8 }}>

                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>

                    <KeyBordContext.Provider value={{ value, setValue, libdata }}>
                        <KeyBoardPopSideBar />
                    </KeyBordContext.Provider>

                </div>

            </Sidebar>

            <Sidebar visible={visibleBottomPad} onHide={() => setVisibleBottomPad(false)} baseZIndex={1000} position="bottom" style={{ height: '150px' }}>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>

                    <KeyBordContext.Provider value={{ value, setValue, libdata }}>
                        <KeyBoardPadSideBar />
                    </KeyBordContext.Provider>
                </div>
            </Sidebar>

        </div>








        </>
    )
}
