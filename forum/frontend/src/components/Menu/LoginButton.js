import React, { Component } from 'react';

import LoginPortalComponent from './LoginForm';

class LoginButton extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            isClicked: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        console.log('Rendering the LoginButton!!!');
        return (
            <div className="button" id="login" onClick={this.handleClick}>
                <div>Log in</div>
                {
                    this.state.isClicked && (
                        <LoginPortalComponent onClose={() => this.setState({ isClicked: false })} />
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