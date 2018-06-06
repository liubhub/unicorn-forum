import React, { Component } from 'react';
import shortid from 'shortid';
import axios from 'axios';

import DataProvider from '../Thread/DataProvider';
import '../thread.css';
import './comments.css';
import '../like.css'
import { dateDifference, noneAvatarUrl } from '../Thread';


const uuid = shortid.generate;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const ThreadStart = ({ data }) => (
    <article className="media thread-comments" >
        <figure className="media-left">
            <p className={"image is-128x128"}>
                <img src={data.user.avatar || noneAvatarUrl} />
            </p>
            <div className="author-username">
                <small>{'@' + data.user.username.toString() + ' '}</small>
            </div>
        </figure>
        <div className="media-content">
            <div className="content">
                <div className="subject details">
                    <strong>{data.subject}</strong>
                    <div className="is-pulled-right">
                        <small>{dateDifference(data.created_at) == 'day' ? 'today' : dateDifference(data.created_at)}</small>
                    </div>
                    <p className="details">{data.content}</p>
                    <small className="category">{data.category.category_name}</small>
                </div>
            </div>
        </div>
    </article>
);

function LikeButton(props) {
    return (
        <div className="flexbox">
            <div className="fav-btn">
                <span href="" className="favme dashicons dashicons-heart">х</span>
            </div>
        </div>
    )
}

const Comment = ({ comment }) => (
    <article className="media thread-comments" >
        <figure className="media-left">
            <p className="image is-96x96">
                <img src={comment.creator.avatar || noneAvatarUrl} />
            </p>
            <div className="author-username">
                <small>{'@' + comment.creator.username.toString() + ' '}</small>
            </div>
        </figure>
        <div className="media-content">
            <div className="content">
                <div className="subject details">
                    <strong>{comment.subject}</strong>
                    <div className="is-pulled-right">
                        <small>{dateDifference(comment.created_at) == 'day' ? 'today' : dateDifference(comment.created_at)}</small>
                    </div>
                    <p className="details">{comment.comment.content}</p>
                </div>
            </div>
        </div>


        <div className="flexbox">
            <div className="fav-btn">
                <span href="" className="favme dashicons dashicons-heart"></span>
            </div>
        </div>

    </article>
);


function CommentList(comments) {
    var comment_list = comments.comments.map(function (elem) {
        return <Comment comment={elem} key={uuid()} />
    })
    return (
        <div>{comment_list}</div>
    )
}


function CommentForm(props) {
    // TODO: User Avatar
    return (
        <article className="media thread-comments" >
            <figure className="media-left">
                <p className="image is-96x96">
                    <img src={props.profile_avatar} />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <div className="subject details">

                        {/* форма */}
                        <form className="form" action="/comment">
                            <div className="field">
                                <textarea className="textarea" placeholder="Write a comment..." name="comment" onChange={props.handleInputChange} value={props.value}></textarea>
                            </div>
                            <div className="field is-pulled-right">
                                <button className="button is-link" type="submit" onClick={props.handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </article>
    )
}


class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            fetching: false,
            err: false,
            comments: [],
            comment: '',
            user: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {

        const url = window.location.href + 'True';

        this.setState({ fetching: true });

        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    this.setState({ err: true })
                } else {
                    return response.json();
                }
            }).then(data => {
                this.setState({ data: data, fetching: false, comments: data.comments });
                // console.log('Loaded:\n', this.state.data, (new Date()).toUTCString());
                // console.log('Comments:\n', this.state.comments)
            })
            .catch(err => {
                console.warn(err);
            });

    }

    componentDidMount() {
        const url = 'http://127.0.0.1:8000/' + 'user'
        const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };
        fetch(url, config)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({
                    user: json
                })
            });

        console.log(this.state.user)
    }


    handleInputChange(event) {
        // console.log('Input...')
        var value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        // отослать и в случае успеха прикрепить новый элемент-коммент нахуй
        // console.log('Submiting')
        event.preventDefault();
        event.stopPropagation();
        // console.log(this.state.comment)
        if (!this.state.comment) {
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

        // console.log('Sending request...');

        axios({
            method: 'post',
            url: '/comment/',
            data: userFormData,
            config: config
        }).then((response) => {
            if (response.status == 200) {

                var updated_comments = this.state.comments;
                updated_comments.push(response.data);
                this.setState({
                    comments: updated_comments,
                    comment: '',
                });
            }
        }).catch(function (response) {
            console.log(response);
        });


    }


    render() {
        return (

            this.state.fetching ? <a className="button is-loading">Loading</a> : (
                <div className="component_wrapper">
                    <ThreadStart data={this.state.data} />


                    <CommentList comments={this.state.comments} />


                    {localStorage.getItem('token') ?
                        <CommentForm handleInputChange={this.handleInputChange}
                            handleSubmit={this.handleSubmit}
                            profile_avatar={this.state.user ? this.state.user.avatar : noneAvatarUrl}
                            value={this.state.comment}

                        /> : null}
                </div>

            )

        )
    }
}

export default Comments;







// function CommentMapper(props) {
//     const data = props.data;
//     var res = [];
//     data.is_comment = false;
//     res.push(<Comment comment={data} key={uuid()}/>);
//     if (data.comments.length > 0) {
//         var elements = data.comments;
//         res.push(<Comment comment={data} key={uuid()} />)

//         for (let i = 0; i < elements.length; i++) {
//             res.push(<Comment comment={elements[i]} key={uuid()} />)
//         }
//     } else {
//         res.push(<Comment comment={data} key={data.entity} />);
//     }
//     if (props.isLoggedIn) {
//         res.push(<CommentForm key={uuid()}/>)
//     }
//     return (<div>{res}</div>)
// }