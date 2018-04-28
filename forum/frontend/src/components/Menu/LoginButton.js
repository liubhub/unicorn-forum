import React, { Component } from 'react';
import LoginForm from './LoginForm';

class LoginButton extends Component {
    // state = {
    //     isOpen: false,
    // }

    constructor(props) {
        super(props) // родительский констроуктор
        this.state = {
            isOpen: props.defaultOPen
        }
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        console.log('Rendering the LoginButton!!!');
        return (
            <div className="button" id="login" onClick={this.handleClick}>
                <span>Log in</span>
                { this.state.isOpen ? <LoginForm /> : null }
                {/* {this.state.isOpen ? "close" : "open"} */}

            </div>
        )
    }

    handleClick() {
        console.log('Clicked');
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
}

export default LoginButton;