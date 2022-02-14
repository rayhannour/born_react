import axios from 'axios';
import React from 'react';


export const instance= axios.create({
  baseURL: `http://192.168.100.218:8080`
});

export const tocken=()=>{
    return  localStorage.getItem('USER_KEY');
}
