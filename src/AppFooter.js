import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { fetchDataAuthetificateBorn } from './api/born/Born';
const AppFooter = ({ setShowStat }) => {
    const history = useHistory();
    const [bornres, setBornres] = useState([]);

    const [tcodgou, setTcodgou] = useState(null);
    const [tcodpr, setTcodpr] = useState(null);
    const [alias, setAlias] = useState(null);

    const [macAdr, setMacadr] = useState(null);
    const [ip, setIp] = useState(null);

    const [redir, setRedir] = useState(false);

    useEffect(() => {
        window.updateUi = (mac, ipadr) => {
            setIp(ipadr);
            setMacadr(mac);
           

        }
    }, []);

    useEffect(() => {
        redirect();
    }, [redir]);

const redirect=()=>{
    if (macAdr !== null && macAdr )
            history.push({
                pathname: "/access",
                search: "?params=5",
                hash: "#react",
                state: { macAdr: macAdr,ip:ip }
            });
}

    useEffect(async () => {
        localStorage.setItem('macadr', macAdr);
        localStorage.setItem('ipdar', ip);

        await fetchDataAuthetificateBorn(macAdr, ip).then((response) => {
            if (response.data.length === 0) {
              
                if (macAdr !== null && macAdr !== "")
                    setRedir(true);
                //using location


            } else {

                setBornres(JSON.stringify(response.data));

                setAlias(response.data[0].alias);
                setTcodgou(response.data[0].tcodgou);
                setTcodpr(response.data[0].tcodpr);

                if (alias === null || alias === "") {
                    localStorage.setItem('alias', response.data[0].alias);
                    localStorage.setItem('tcodgou', response.data[0].tcodgou);
                    localStorage.setItem('tcodpr', response.data[0].tcodpr);
                } else {
                    localStorage.setItem('alias', '');
                    localStorage.setItem('tcodgou', '');
                    localStorage.setItem('tcodpr', '');
                }

               
                setShowStat(true);
            }
        }).catch((e) => {
            redirect();
        })

    }, [macAdr]);



    return (
        <div className="layout-footer">

            <div className="p-grid">
                <div className="p-col-12">
                    <div className="footer-bottom">
                        <h4>CGPR BORN</h4>
                        <h6>CGPR Ⓒ 2021 مركز الإعلامية بمنوبة (مصلحة الدراسات و البرمجة و السلامة المعلوماتية)</h6>
                    </div>
                    <span>{macAdr} - {ip} -{alias} --{tcodgou}-- {tcodpr}</span>

                </div>
            </div>
        </div>

    )
}

export default AppFooter;