import React, { Component } from 'react';

export const onInputClick = (event) => { event.stopPropagation() };

export function FormWrapper(props) {
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                {props.children}
            </div>
        </div>
    )
}

export function InputWrapper(props) {
    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="control">
                <input className="input" name={props.name} type={props.type} placeholder={props.placeholder} onChange={props.onChange} onClick={onInputClick} />
            </div>
        </div>
    )
}