import React, {Component} from 'react';
import axios from 'axios';


axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


class ProfileButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        const url = 'http://127.0.0.1:8000/' + 'api/user'
        const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };
        fetch(url, config)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({
                    user: json
                },function(){
                    console.log(this.state.user.username);
                })
            });
    }

    handleClick(){

        const user = this.state.user.username;

        console.log(window.location.origin + "/user/" + user.toString());
        
        window.location.href = window.location.origin + "/user/" + user.toString()
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