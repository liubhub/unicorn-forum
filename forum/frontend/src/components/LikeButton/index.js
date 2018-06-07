import React, { Component } from 'react';
import axios from 'axios';

import './like.css'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

class LikeButton extends Component{
    constructor(props){
        super(props)
        console.log(this.props);
        this.state = {
            isLikedByUser: false,
            num_of_likes: 0,
        }

        this.handleLikeClick = this.handleLikeClick.bind(this);
    }

    componentDidMount(){

        const config = {
            params: {
                entity: this.props.entity,
                user: this.props.user.id
            },
        }

        axios.get("/like", config)
        .then((response) => {
            console.log(response.data);
            return response.data;
        }).then((data)=>{
           this.setState({
               num_of_likes: data.num_of_likes,
               isLikedByUser: data.is_liked_by_user,
           })
        })

    }


    handleLikeClick(event){

        this.setState({
            isLikedByUser: !this.state.isLikedByUser,
        },function(){
            console.log(this.state);
            
            this.setState({
                num_of_likes : this.state.isLikedByUser ? this.state.num_of_likes+1 : this.state.num_of_likes-1
            })
        });
        
        const config = {
            headers: {
                'Content-Type': 'application/json',               
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        };


        axios({
            method: 'post',
            url: '/like/',
            data: JSON.stringify({
                'entity': this.props.entity,
                'user': this.props.user.id
            }),
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
            <small className="num-of-likes">{this.state.num_of_likes}</small>
            <span className={classname}></span>
        </div>
        )
    }
}

export default LikeButton;