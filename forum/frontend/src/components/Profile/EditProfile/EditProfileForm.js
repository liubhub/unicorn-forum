import React, { Component } from 'react';
import axios from "axios";

import {onInputClick, FormWrapper,InputWrapper} from '../common';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

class EditProfileForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            pass: '',
            firstName:'',
            lastName:'',
            bio:'',
            birth:'',
            city:'',
            country:'',
            avatar:'',

        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = thos.handleSubmit.bind(this);
    }


    handleInput(){
        const value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value
        },function(){
            console.log(this.state)
        });
    }

    handleSubmit(){

    }

    render(){
        return null;
    }
}