import React from 'react';
import {instance} from '../ApiGeneral';



export const fetchDataAuthetificateBorn=(macadr,ipadr)=>{    

    return instance({
        method:'GET',
        url:`/api/born/iddata/${macadr}/${ipadr}`
        
    })
}