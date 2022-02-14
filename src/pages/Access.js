import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import { Button } from 'primereact/button';

export const Access = () => {
	const history = useHistory();
	const location = useLocation();

	const [macAdr, setMacadr] = useState(null);
	const [ip, setIp] = useState(null);
	useEffect(() => {

		console.log(location.search); // result: '?query=abc'
		console.log(location.state.macAdr); // result: 'some_value'
		setMacadr(location.state.macAdr);
		setIp(location.state.ip);
	}, [location]);


	const reload = () => {
		history.push('/');
	}

	const reloadPage = (data) => {
		alert(data);
	}

	return (
		<div className="exception-body access">

			<div className="exception-wrapper">
				<div className="exception-content">
					<img src="assets/layout/images/pages/asset-access.svg" alt="freya-layout" />
					<span>access denied</span>
				</div>
				<div className="exception-footer">
					<h4>CGPR BORN</h4>
					<h6>CGPR Ⓒ 2021 مركز الإعلامية بمنوبة (مصلحة الدراسات و البرمجة و السلامة المعلوماتية)</h6>
				</div>
				<span>{macAdr} - {ip} </span>


				<div className="p-col" onClick={() => reloadPage('rp_reset')}>
					<div className="card overview-box blue">
						<div className="overview-info" >
							<h6>إعادة الولوج إلى التطبيقة</h6>
							<h1>شكـــرا</h1>
						</div>
						<i className="pi pi-users"></i>
					</div>
				</div>

			</div>
		</div >
	)
}