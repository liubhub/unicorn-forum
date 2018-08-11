import React, { Component } from 'react';
import axios from 'axios';

import {onInputClick, FormWrapper,InputWrapper} from '../common';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            pass: '',
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
    }


    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        var userFormData = new FormData();

        userFormData.set('username', this.state.username);
        userFormData.set('password', this.state.pass);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        };
        axios({
            method: 'post',
            url: '/login/',
            data: userFormData,
            config: config
        }).then(function (response) {
            const token = response.data.token;
            if(token){
                localStorage.setItem('token', token);
                window.location.href = '/'
            }
        })
        .catch(function (response) {
            console.log(response);
        });
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
                       
                        <InputWrapper name="pass" type="password" placeholder="Password" onChange={this.handleInputChange} />
                       

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

export default LoginForm;