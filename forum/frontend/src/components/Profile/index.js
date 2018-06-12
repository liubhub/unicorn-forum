import React, { Component } from 'react';
import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            data: null,
        }
    }

    componentWillMount(){
        const user = window.location.href.split('user/')[1].split('/')[0]

        this.setState({user: user});

        axios.get('/api/user/'+user)
        .then((response) =>{
            return response.data;
        }).then((data)=>{
            console.log(data);
            this.setState({data: data});
        })


    }
    render(){
        if (this.state.data && this.state.data.city){
            var city = this.state.data.city;
        }else if(this.state.data &&  this.state.data.country){
            var country = this.state.data.country;
        }
        
        return !this.state.data ? <a className="button is-loading">Loading</a> : (
            <div className="media user-profile-data">
                <div className="media-center user-image-container">
                    <img src={this.state.data.user_data.avatar} className="user-image" alt={this.state.user}/>
                </div>

                <div className="media-content has-text-centered user-details">
                    <p className="title article-title user-name">{this.state.user}</p>
                    <div className="subtitle is-6 article-subtitle location">

                            <figure className="image is-16x16">
                                <img src="/static/img/location_on_grey_18x18.png"/>
                            </figure>
    
                            { city ? <span>{this.state.data.city}</span> : null}
                            { country ? <span>{', '+this.state.data.country}</span> : null}
                            {!city && !country ? <span>Mother Earth</span> : null}

                        </div>
                </div>


            </div>
        )
    }
}
export default Profile;