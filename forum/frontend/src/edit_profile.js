import React from 'react';
import {render} from 'react-dom';

import LoginButton from "./components/Menu/LoginButton";
import ProfileButton from "./components/Menu/ProfileButton";


render(<LoginButton/>, document.getElementById('loginButton'));

if(localStorage.getItem('token')){
    render(<ProfileButton/>, document.getElementById('myProfileButton'));
}