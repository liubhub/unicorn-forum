import React, { Component } from 'react';

// import RegisterForm from '../Forms/Register/RegisterForm'; 

class EditProfileButton extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            isClicked: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        return (
            <div className="button is-warning" id="edit" onClick={this.handleClick}>
                <div>Edit Profile</div>
            </div>
        )
    }

    handleClick(event) {
        this.setState({
            isClicked: !this.state.isClicked,
        },function(){
            window.location.href = window.location.href + "edit";
        });
    }
}

export default EditProfileButton;