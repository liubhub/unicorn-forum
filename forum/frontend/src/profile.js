import React from 'react';
import {render} from 'react-dom';

import Profile from './components/Profile';
import LoginButton from "./components/Menu/LoginButton"
import EditProfileButton from "./components/Profile/EditProfile/EditProfileButton";

render(<LoginButton/>, document.getElementById('loginButton'));
if(localStorage.getItem('token')){
    render(<EditProfileButton/>, document.getElementById('editProfileButton'));
}
render(<Profile/>, document.getElementById('profile-container'));