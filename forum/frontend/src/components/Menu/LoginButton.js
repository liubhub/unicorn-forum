import React, { Component } from 'react';

import LoginForm from '../Forms/Login/LoginForm'; 

class LoginButton extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            isClicked: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        return (
            !(localStorage.getItem('token')) ?
            <div className="button" id="login" onClick={this.handleClick}>
                <div>Log in</div>
                

                {
                    this.state.isClicked && (
                        // <RegisterPortalComponent onClose={() => this.setState({ isClicked: false })} />
                        <LoginForm  
                            // onClose={() => this.setState({ isClicked: false })} 
                            action="/login/"
                            title="Login"
                            actionButtonText="Login"
                            cancelButtonText="Forgot Password?"
                         />
                    )
                }


            </div>

            :  (
            <div className="button" id="login">
                <div onClick={this.logOut}>Log out</div>
            </div>
            )
        )
    }

    handleClick(event) {
        this.setState({
            isClicked: !this.state.isClicked,
        });
    }

    logOut(event){
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    
}

export default LoginButton;