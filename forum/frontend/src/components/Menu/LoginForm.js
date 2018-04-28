import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import {baseModalWrapper, baseModalInput} from './BaseModalComponent'
import '../../../static/css/style.css'


const onInputClick = (event) => { event.stopPropagation() };
var fields = [baseModalInput("Name","text","Username or email", onInputClick), 
              baseModalInput("Password","password","Password", onInputClick)]

// var fields = [<div className="field">
//             <label className="label">Name</label>
//             <div className="control">
//                 <input className="input" type="text" placeholder="Username or email" onClick={} />
//             </div>
           
//         </div>,

//         <div className="field">
//             <label className="label">Password</label>
//             <div className="control">
//                 <input className="input" type="text" placeholder="Password" onClick={(event) => { event.stopPropagation() }} />
//             </div>
//         </div>]


const LoginPortalComponent = ({ onClose }) => {
    console.log(fields);
    return ReactDOM.createPortal(
        baseModalWrapper(fields, onClose), document.getElementById("portal")
    );
};

export default LoginPortalComponent;