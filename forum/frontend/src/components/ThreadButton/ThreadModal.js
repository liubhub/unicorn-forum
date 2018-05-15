import React, { Component } from 'react';
import axios from 'axios';
import {FormWrapper, InputWrapper}from '../Forms/common';

class ThreadModalForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            subject: '',
            content: '',
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

   handleSubmit() {
        console.log('Wanna create thread');
        console.log('Sending token in headers with POST REquest')

        event.preventDefault();
        event.stopPropagation();

        // //  forms and axios post

        var userFormData = new FormData();

        userFormData.set('subject', this.state.subject);
        userFormData.set('content', this.state.content);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token' + ' ' + localStorage.getItem('token'),
            },
        };

        console.log('Sending request...');
        console.log(this.state.subject);
        console.log(this.state.content);
        console.log(userFormData);
        axios({
            method: 'post',
            url: '/thread/',
            data: userFormData,
            config: config
        }).then(function (response) {
            console.log(response);
            window.location.href = '/';
        })
        .catch(function (response) {
            console.log(response);
        });
    }
    // action='/thread'
    render(){
        return (
            <FormWrapper>
                <form method="post" onSubmit={this.handleSubmit} action="/thread"> 
                    <header className="modal-card-head">
                        <p className="modal-card-title">A New Thread</p>
                        <button className="delete" aria-label="close"></button>
                    </header>

                    <section className="modal-card-body">
                        <InputWrapper name="subject" type="text" placeholder="Subject" onChange={this.handleInputChange} />
                        <textarea placeholder="Content" onChange={this.handleInputChange} className="textarea"/>
                        {/* <InputWrapper name="content" type="text" placeholder="Content" onChange={this.handleInputChange} /> */}
                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.handleSubmit} type="button">Create Thread</button>
                        <button className="button is-text" type="button">Cancel</button>
                    </footer>
                </form>
            </FormWrapper>
        )


    }
}

export default ThreadModalForm;