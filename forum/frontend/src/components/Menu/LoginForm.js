import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import {baseModalWrapper, baseModalInput} from './BaseModalComponent';

const onInputClick = (event) => { event.stopPropagation() };

var fields = [
                baseModalInput("Name","text","Username or email", onInputClick), 
                baseModalInput("Password","password","Password", onInputClick)
            ]

const LoginPortalComponent = ({ onClose }) => {
    console.log(fields);
    return ReactDOM.createPortal(
        baseModalWrapper('Log In', fields, onClose, 'Log in', "Forgot Password?"), document.getElementById("portal")
    );
};

export default LoginPortalComponent;