// TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import React, { Component } from 'react';

// import RegisterPortalComponent from './RegisterForm';

import RegisterForm from '../Forms/Register/RegisterForm'; 

class RegisterButton extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            isClicked: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        return (
            <div className="button is-primary" id="register" onClick={this.handleClick}>
                <div>Register</div>
                {
                    this.state.isClicked && (
                        // <RegisterPortalComponent onClose={() => this.setState({ isClicked: false })} />
                        <RegisterForm  
                            // onClose={() => this.setState({ isClicked: false })} 
                            action="/register/"
                            title="Register"
                            actionButtonText="Register"
                            cancelButtonText="Cancel"
                         />
                    )
                }
            </div>
        )
    }

    handleClick(event) {
        this.setState({
            isClicked: !this.state.isClicked,
        });
    }
}

export default RegisterButton;