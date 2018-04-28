import React, { Component } from 'react';
import LoginForm from './LoginForm';

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
                {/* передать сюда аргумент которые меняет состояние из-эктив */}
                <LoginForm is_active={this.state.isClicked}/>
            </div>
        )
    }

    handleClick(event) {
        console.log('Clicked');
        console.log(event);
        event.stopPropagation();
        console.log('stopped')
        // event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
        // event.stopImmediatePropagation() ;
        this.setState({
            isClicked: !this.state.isClicked,
        });
    }
}

export default LoginButton;