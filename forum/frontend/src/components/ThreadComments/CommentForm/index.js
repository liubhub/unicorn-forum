import React, { Component } from 'react';
import axios from 'axios';


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            comment_meta: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mountNewComment = this.mountNewComment.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    mountNewComment(){
        console.log('Mounting: ', this.state.comment_meta);
        window.location.href = window.location.href;
        // const newComment = <Comment comment={this.state.comment_meta}/>
        // console.log(newComment)
        // document.querySelector('.comments .section .container').appendChild(newComment)
    }

    handleSubmit(event){        
        // отослать и в случае успеха прикрепить новый элемент-коммент нахуй

        event.preventDefault();
        event.stopPropagation();
        if(!this.state.comment){
            return;
        }
        var userFormData = new FormData();

        userFormData.set('comment', this.state.comment);
        userFormData.set('thread_id', window.location.pathname.split('/')[2]);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        };

        console.log('Sending request...');

        axios({
            method: 'post',
            url: '/comment/',
            data: userFormData,
            config: config
        }).then((response) => {
            console.log(response);
            if(response.status == 200){
                console.log("Success");
                console.log(response)
                this.setState({comment_meta: response.data})
                this.mountNewComment();
            }  
        }).catch(function (response) {
            console.log(response);
        });


    }
    
    render() {
        return (
            
        )
    }
}

export default CommentForm;