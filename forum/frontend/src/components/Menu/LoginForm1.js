import React, { Component } from 'react'
import ReactDOM from 'react-dom';



// const loginFormComponent = 


const PortalComponent = ({ onClose }) => {
    return ReactDOM.createPortal(
     

        <div className="modal is-active">
<div className="modal-background"></div>
<div className="modal-content">

        <div className="column">
        <div className="field">
            <label className="label">Name</label>

            <div className="control">
                {/* <div className="control has-icons-left has-icons-right"> */}
                {/* input is-success */}
                <input className="input" type="text" placeholder="Username or email" onClick={(event) => {event.stopPropagation()}}/>
                {/* <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                </span> */}
            </div>
            
             {/* TODO: CONTROLS for success & validation*/}
            {/* <p class="help is-success">This username is available</p> */} 
        </div>

         <div className="field">
            <label className="label">Password</label>
            <div className="control">
                <input className="input" type="text" placeholder="Password" onClick={(event) => {event.stopPropagation()}}/>
            </div>
        </div>

    </div>
</div>
<button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
</div>,




      document.getElementById("portal")
    );
};

export default PortalComponent;

//   <div className="modal" style={modalStyle} onClick={onClose}>
//   {children}
// </div>