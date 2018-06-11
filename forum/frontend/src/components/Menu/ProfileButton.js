import React, {Component} from 'react';

class ProfileButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            isClicked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        // нужно взять токен вложить в заголовки и послать гет-запрос
        // /username => render profile template
        // /api/username => json for template

    }

    render(){
        return (
            <div className="button is-info is-bold" id="register" onClick={this.handleClick}>
                <div>My profile</div>
            </div>
        )

    }
}

export default ProfileButton;