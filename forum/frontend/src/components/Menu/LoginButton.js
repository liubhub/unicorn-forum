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
            <div className="button" id="login" onClick={this.handleClick}>
                <div>{ localStorage.getItem('token') ? "Log out": "Log in"}</div>
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
        )
    }

    handleClick(event) {
        this.setState({
            isClicked: !this.state.isClicked,
        });
    }
}

export default LoginButton;

// import LoginPortalComponent from './LoginForm';

// class LoginButton extends Component {

//     constructor(props) {
//         super(props) 
//         this.state = {
//             isClicked: false,
//         }
//         this.handleClick = this.handleClick.bind(this)
//     }

//     render() {
//         console.log('Rendering the LoginButton!!!');
//         return (
//             <div className="button" id="login" onClick={this.handleClick}>
//                 <div>{ localStorage.getItem('token') ? "Log out": "Log in"}</div>
//                 {
//                     this.state.isClicked && (
//                         <LoginPortalComponent onClose={() => this.setState({ isClicked: false })} />
//                     )
//                 }
//             </div>
//         )
//     }

//     handleClick(event) {
//         this.setState({
//             isClicked: !this.state.isClicked,
//         });
//     }
// }

// export default LoginButton;