import React, { Component } from 'react';

import shortid from 'shortid';

import axios from 'axios';

import DataProvider from '../Thread/DataProvider';
import '../thread.css';
import './comments.css';
import { dateDifference, noneAvatarUrl } from '../Thread';

const uuid = shortid.generate;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const Comment = ({ comment }) =>
    !comment ? (<div> Nothing to show </div>) : (
        <article className="media thread-comments" >
            <figure className="media-left">

                <p className={comment.is_comment ? "image is-96x96" : "image is-128x128"}>
                    <img src={comment.author_avatar || noneAvatarUrl} />
                </p>
                <div className="author-username">
                    <small>{'@' + comment.author_username.toString() + ' '}</small>
                </div>

            </figure>

            <div className="media-content">
                <div className="content">
                    <div className="subject details">
                        <strong>{comment.subject}</strong>
                        <div className="is-pulled-right">
                            <small>{dateDifference(comment.creation_date) == 'day' ? 'today' : dateDifference(comment.creation_date)}</small>
                        </div>

                        <p className="details">{comment.content}</p>

                        {comment.is_comment ? null : <small className="category">{comment.category}</small>}

                    </div>
                </div>
            </div>
        </article>
    );



function CommentMapper(props) {
    const data = props.data;
    var res = [];
    if (data.comments.length > 0) {
        var elements = data.comments;
        res.push(<Comment comment={data} key={uuid()} />)

        for (let i = 0; i < elements.length; i++) {
            res.push(<Comment comment={elements[i]} key={uuid()} />)
        }
    } else {
        res.push(<Comment comment={data} key={data.id} />);
    }
    if (props.isLoggedIn) {
        res.push(<CommentForm key={uuid()}/>)
    }
    return (<div>{res}</div>)
}

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
            <article className="media thread-comments" >

                <figure className="media-left">
                    <p className="image is-96x96">
                        <img src={noneAvatarUrl} />
                    </p>
                </figure>

                <div className="media-content">
                    <div className="content">
                        <div className="subject details">

                            {/* форма */}
                            <form className="form" action="/comment">
                                <div className="field">
                                    <textarea className="textarea" placeholder="Write a comment..." name="comment" onChange={this.handleInputChange}></textarea>
                                </div>
                                <div className="field is-pulled-right">
                                    <button className="button is-link" type="submit" onClick={this.handleSubmit}>Submit</button>
                                </div>
                            </form>
                           


                        </div>
                    </div>
                </div>


            </article>
        )
    }
}


class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            fetching: false,
            err: false,
        }
    }

    componentWillMount() {

        const url = window.location.href + '/True';

        this.setState({ fetching: true });

        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    this.setState({ err: true })
                } else {
                    return response.json();
                }
            }).then(data => {
                this.setState({ data: data, fetching: false });
                console.log('Loaded: ', this.state.data, (new Date()).toUTCString());
            })
            .catch(err => {
                console.warn(err);
            });

    }

    render() {
        return (

            this.state.fetching ?
                <a className="button is-loading">Loading</a>
                : <CommentMapper data={this.state.data} isLoggedIn={localStorage.getItem('token') ? true : false} />


        )
    }
}

export default Comments;