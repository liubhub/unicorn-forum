import React, { Component } from 'react';
import '../like.css'

class LikeButton extends Component{
    constructor(props){
        super(props)

        this.state = {
            // если лайкнуто пусть она будет больше
            isLiked: false,
        }
    }

    render(){
        return (
         <div className="like-wrapper"> 
            <small className="num-of-likes">2</small>
            <span className="heart"></span>
        </div>
        )
    }
}

export default LikeButton;