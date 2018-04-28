import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import baseModalWrapper from './BaseModalComponent'
import '../../../static/css/style.css'


var fields = [<div className="field">
            <label className="label">Name</label>
            <div className="control">
                <input className="input" type="text" placeholder="Username or email" onClick={(event) => { event.stopPropagation() }} />
            </div>
            {/* TODO: CONTROLS for success & validation*/}
        </div>,

        <div className="field">
            <label className="label">Password</label>
            <div className="control">
                <input className="input" type="text" placeholder="Password" onClick={(event) => { event.stopPropagation() }} />
            </div>
        </div>]

// var modalFormComponent = baseModalWrapper(fields, onClose);


const LoginPortalComponent = ({ onClose }) => {
    console.log(fields);
    return ReactDOM.createPortal(
        baseModalWrapper(fields, onClose), document.getElementById("portal")
    );
};

export default LoginPortalComponent;

//   <div className="modal" style={modalStyle} onClick={onClose}>
//   {children}
// </div>