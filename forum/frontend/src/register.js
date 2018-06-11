import React from 'react';
import {render} from 'react-dom';

import RegisterButton from "./components/Menu/RegisterButton";
import ProfileButton from "./components/Menu/ProfileButton";


if(localStorage.getItem('token')){
    render(<ProfileButton/>, document.getElementById('registerButton'));
}else{
    render(<RegisterButton/>, document.getElementById('registerButton'));
}
