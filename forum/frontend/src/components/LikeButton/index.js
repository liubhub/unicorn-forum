import React, { Component } from 'react';
import axios from 'axios';

import './like.css'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

class LikeButton extends Component{
    constructor(props){
        super(props)
        console.log(this.props);
        this.state = {
            isClickedLike:false,
            isLikedByUser: false,
        }

        this.handleLikeClick = this.handleLikeClick.bind(this);
    }

    handleLikeClick(event){
        this.setState({
            isLikedByUser: true,
            isClickedLike: true
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',               
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        };

        console.log(this.state);

        axios({
            method: 'post',
            url: '/like/',
            data: JSON.stringify({'entity': this.props.entity}),
            config: config
        }).then((response) => {
            if (response.status == 200) {
                console.log(response);
            }
        }).catch(function (response) {
            console.log(response);
        });
    }


    render(){
        var classname = this.props.theme ? "heart main-thread " : "heart ";
        classname += this.state.isLikedByUser ? "isLiked" : "";
 

        return (
         <div className="like-wrapper" onClick={this.handleLikeClick}> 
            <small className="num-of-likes">0</small>
            <span className={classname}></span>
        </div>
        )
    }
}

export default LikeButton;