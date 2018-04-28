import React, { Component } from 'react'

class LoginForm extends Component {
    // state = {
    //     isOpen: false,
    // }
    render() {
        console.log('Rendering the LoginForm');
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-content">
                    {/* <p>Button was clicked, hello bitch!</p> */}
                    <div className="container">
                        

                        <div className="field"></div>


                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}

export default LoginForm;