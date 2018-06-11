import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentWillMount(){
        const user = window.location.href.split('user/')[1].split('/')[0]
        
        axios.get('/api/user/'+user)
        .then((response) =>{
            return response.data;
        }).then((data)=>{
            console.log(data);
        })


    }
    render(){
        return null;
    }
}
export default Profile;