import React, { Component } from 'react';
import axios from 'axios';

import './like.css'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

class LikeButton extends Component{
    constructor(props){
        super(props)

        this.state = {
            isClickedLike:false,
            isLikedByUser: false,
        }
    }

    

    render(){
        return (
         <div className="like-wrapper"> 
            <small className="num-of-likes">2</small>
            <span className={ this.props.theme ? "heart main-thread" : "heart"}></span>
        </div>
        )
    }
}

export default LikeButton;