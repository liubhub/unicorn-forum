import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import {baseModalWrapper, baseModalInput} from './BaseModalComponent'
import '../../../static/css/style.css'


const onInputClick = (event) => { event.stopPropagation() };

var fields = [
                baseModalInput("Username: ","text","Username", onInputClick),
                baseModalInput("E-mail: ","text","E-mail", onInputClick), 
                baseModalInput("Password: ","password","Password", onInputClick),
                baseModalInput("Confirm password: ","password","Confirm password", onInputClick),
            ]

const RegisterPortalComponent = ({ onClose }) => {
    return ReactDOM.createPortal(
        baseModalWrapper('Register', fields, onClose, 'Register', "Cancel"), document.getElementById("portal")
    );
};

export default RegisterPortalComponent;      