import React, { Component } from 'react'
import shortid from "shortid";

const uuid = shortid.generate;

export function baseModalWrapper(children, onClose) {

    const fields = children.map(child =>
        <div className="column" key={uuid()}> 
            {child}
        </div>
    );

    const modalWindowElements = 
    <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
            {fields}
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>

    return modalWindowElements;
}

export function baseModalInput(_label, _type, _placeholder, onclick){
    return (
        <div className="field">
            <label className="label">{_label}</label>
            <div className="control">
                <input className="input" type={_type} placeholder={_placeholder} onClick={onclick} />
            </div>
        </div>
    )
}

    //  {/* TODO: CONTROLS for success & validation*/}