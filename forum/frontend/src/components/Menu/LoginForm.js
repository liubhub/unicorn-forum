import React, {Component} from 'react'
import {render} from 'react-dom'


class LoginForm extends Component {
    state = {
        isOpen: true,
    }

    render(){
        console.log('Rendering the LoginForm');
        console.log(this.props);
        return (
            <div>Hellllllo</div>
        )
    }


}

// render(<LoginForm/>, document.getElementById('login'));

export default LoginForm;