import React, { Component } from 'react';
import shortid from 'shortid';
import axios from 'axios';

import DataProvider from '../Thread/DataProvider';
import '../thread.css';
import './comments.css';
import { noneAvatarUrl } from '../Thread';
import Comment from './Comment';
import CommentForm from './CommentForm';
import ThreadStart from './ThreadStart';

const uuid = shortid.generate;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


function CommentList(comments, user) {
    var comment_list = comments.map(function (elem) {
        return <Comment comment={elem} key={uuid()} user={user}/>
    })
    return comment_list;
}

class CommentsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            fetching: false,
            err: false, // TODO: this error
            comments: [],
            comment: '',
            user: null,
            currentPage: 1,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }

    componentWillMount() {

        const thread_data_url = window.location.href + 'True';

        this.setState({ fetching: true });

        fetch(thread_data_url)
            .then(response => {
                if (response.status !== 200) {
                    this.setState({ err: true })
                } else {
                    return response.json();
                }
            }).then(data => {
                this.setState({ data: data, fetching: false, comments: data.comments });
            })
            .catch(err => {
                console.warn(err);
            });
    }

    componentDidMount() {
        if(!localStorage.getItem('token')){
            return;
        }
        const url = 'http://127.0.0.1:8000/' + 'api/user'
        const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };
        fetch(url, config)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({
                    user: json
                })
            });

        // console.log(this.state.user)
    }

    handlePagination(event){
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleInputChange(event) {
        var value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
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

        // const { comments, currentPage, commentsPerPage } = this.state;

        const commentsPerPage = 5;

        const indexOfLast = this.state.currentPage * commentsPerPage;
        const indexOfFirst = indexOfLast - commentsPerPage;
        const currentComments = this.state.comments.slice(indexOfFirst, indexOfLast);

        // console.log('render',this.state.user)
        
        const renderComments = CommentList(currentComments, this.state.user);
        //  <CommentList comments={currentComments} user={this.state.user}/>

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.comments.length / commentsPerPage); i++) {
          pageNumbers.push(i);
        }


        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li key={number} id={number} onClick={this.handlePagination}>
                {number}
              </li>
            );
          });

        return (

            this.state.fetching ? <a className="button is-loading">Loading</a> : (
                <div className="component_wrapper">
                    <ThreadStart data={this.state.data} user={this.state.user}/>

                    {/* <CommentList comments={renderComments} /> */}

                    {renderComments}

                    {localStorage.getItem('token') ?
                        <CommentForm handleInputChange={this.handleInputChange}
                            handleSubmit={this.handleSubmit}
                            profile_avatar={this.state.user ? this.state.user.avatar : noneAvatarUrl}
                            value={this.state.comment}

                        /> : null}


                        <ul className="page-numbers">
                            {renderPageNumbers}
                        </ul>
                </div>

            )

        )
    }
}

export default CommentsApp;