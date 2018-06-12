import React from 'react';
import {render} from 'react-dom';

import Profile from './components/Profile';
import LoginButton from "./components/Menu/LoginButton"

render(<LoginButton/>, document.getElementById('loginButton'));

render(<Profile/>, document.getElementById('profile-container'));