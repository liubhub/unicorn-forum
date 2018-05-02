import React, { Component } from 'react'
import shortid from "shortid";

const uuid = shortid.generate;

export function baseModalWrapper(title, action, children, onClose, main_button_text,add_button_text) {

    const fields = children.map(child =>
        <div className="column" key={uuid()}> 
            {child}
        </div>
    );

    const modalWindowElements = 
    <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
        <form action={action} method="post">
            <header className="modal-card-head">
                <p className="modal-card-title">{title}</p>
                <button className="delete" aria-label="close"></button>
            </header>

            <section className="modal-card-body">
                {fields}
            </section>

        <footer className="modal-card-foot">
            <button className="button is-success">{main_button_text}</button>
            <button className="button is-text">{add_button_text}</button>

        </footer>
         </form>   
        </div>
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