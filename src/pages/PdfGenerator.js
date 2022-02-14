import React from 'react';
import jsPDF from 'jspdf';


import base64Str from '../ressources/FONTS/base64';
export const PdfGenerator = () => {

    function generatePDF() {
        const doc = new jsPDF({
            compress: true,
            orientation: 'p',
            unit: 'px',
            format: 'a4'
        });


        var callAddFont = function () {
            this.addFileToVFS('andlso-normal.ttf', base64Str);
            this.addFont('andlso-normal.ttf', 'andlso', 'normal');
        };
        jsPDF.API.events.push(['addFonts', callAddFont])


        doc.setFont('andlso');
        doc.setTextColor(255, 0, 0);
        doc.setFillColor(135, 124, 45, 0);


        console.log(base64Str);


        const x = 30,
            y = 30;


        doc.text('Arabic: مرحبا بالعالم', x, y + 30);


        doc.save('demo.pdf')
    }
    function reverseString(s) {
        return s.split("").reverse().join("");
    }

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Empty Page</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>
                    <button onClick={generatePDF} type="primary">Download PDF</button>
                </div>
            </div>
        </div>
    );

}