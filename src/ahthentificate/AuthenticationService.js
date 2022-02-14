import React from 'react';
import axios from 'axios';


export const getToken=()=>{
    return  localStorage.getItem('USER_KEY');
}




export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://192.168.100.218:8080'}/api/auth/signin`,
        'data':authRequest
    })
}

export const fetchUserData=(authRequest)=>{
    console.log(getToken());
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://192.168.100.218:8080'}/api/v1/auth/userinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })  
}