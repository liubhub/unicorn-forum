import React, { Component } from 'react'
import shortid from "shortid";

const uuid = shortid.generate;

export default function baseModalWrapper(children, onClose) {

    const fields = children.map(child =>
        <div className="column" key={uuid()}> 
            {child}
        </div>
    );

    const modalWindowElements = <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
            {fields}
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>

    return modalWindowElements;
}

// export default function baseModalInput(){

// }