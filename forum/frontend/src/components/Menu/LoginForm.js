import React, { Component } from 'react'

import '../../../static/css/style.css'


class LoginForm extends Component {
    
    constructor(props) {
        super(props) // родительский констроуктор
    }

    render() {
        console.log('Rendering the LoginForm');
        console.log(this.props)
        return (
            <div className={"modal " + (this.props.is_active ? 'is-active' : '')}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    {/* <p>Button was clicked, hello bitch!</p> */}
                    {/* <div className="columns"> */}

                        <div className="column">
                        <div className="field">
                            <label className="label">Name</label>

                            <div className="control">
                                {/* <div className="control has-icons-left has-icons-right"> */}
                                {/* input is-success */}
                                <input className="input" type="text" placeholder="Username or email"/>
                                {/* <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span> */}
                            </div>
                            
                             {/* TODO: CONTROLS for success & validation*/}
                            {/* <p class="help is-success">This username is available</p> */} 
                        </div>

                         <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Password"/>
                            </div>
                        </div>

                    </div>
                    {/* </div> */}
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }

    // handleModalState() {
    //     this.setState({
    //         isOpen: !this.state.isOpen,
    //     });
    // }
}

// event.cancelBubble=true;

export default LoginForm;