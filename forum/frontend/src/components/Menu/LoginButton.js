import React, { Component } from 'react';

import PortalComponent from './LoginForm1';

class LoginButton extends Component {

    constructor(props) {
        super(props) // родительский констроуктор
        this.state = {
            isClicked: false,//props.defaultOPen
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
                        <PortalComponent onClose={() => this.setState({ isClicked: false })} />
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