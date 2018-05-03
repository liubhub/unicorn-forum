import React, { Component } from 'react';
import axios from 'axios';

import Validator from '../Validation/Validator';


const onInputClick = (event) => { event.stopPropagation() };

function FormWrapper(props) {
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                {props.children}
            </div>
        </div>
    )
}

function InputWrapper(props) {
    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="control">
                <input className="input" name={props.name} type={props.type} placeholder={props.placeholder} onChange={props.onChange} onClick={onInputClick} />
            </div>
        </div>
    )
}


class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            pass1: '',
            pass2: '',
            email: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
        const value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value
        });

        if (name == 'pass1' || name == 'pass2') {
            name = 'password';
        }
        console.log('Validating: ', name);

        var validator = new Validator(value, name);
        var res = validator.validate();
        if (res) {
            console.log(res);
        } else {
            console.log('GOOD!');
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!(this.state.pass1 == this.state.pass2)) {
            console.log('Passwords don\'t match!!!');
        } else {

            var userFormData = new FormData();

            userFormData.set('username', this.state.username);
            userFormData.set('email', this.state.email);
            userFormData.set('password1', this.state.pass1);
            userFormData.set('password2', this.state.pass2);


            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            };

            axios({
                method: 'post',
                url: '/register/',
                data: userFormData,
                config: config
            }).then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
        }
    }

    render() {
        return (
            <FormWrapper>
                <form method="post" onSubmit={this.handleSubmit} action={this.props.action}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.title}</p>
                        <button className="delete" aria-label="close"></button>
                    </header>

                    <section className="modal-card-body">
                        <InputWrapper name="username" type="text" placeholder="Username" onChange={this.handleInputChange} />
                        <InputWrapper name="email" type="text" placeholder="E-mail" onChange={this.handleInputChange} />
                        <InputWrapper name="pass1" type="password" placeholder="Password" onChange={this.handleInputChange} />
                        <InputWrapper name="pass2" type="password" placeholder="Confirm password" onChange={this.handleInputChange} />

                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.handleSubmit} type="submit">{this.props.actionButtonText}</button>
                        <button className="button is-text" type="button">{this.props.cancelButtonText}</button>
                    </footer>
                </form>
            </FormWrapper>
        )
    }
}

export default RegisterForm;