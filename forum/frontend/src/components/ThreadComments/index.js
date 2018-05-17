import React, {Component} from 'react';
import mui from 'material-ui';
import ForumIcon from 'react-material-icons/icons/communication/forum';

import '../thread.css';
import {dateDifference, noneAvatarUrl, max_thread_content, iconStyles} from '../Thread';


class Comments extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div>Comments</div>)
    }
}

export default Comments;



// fetch(thread_url)
    //   .then(response => {
    //     if (response.status !== 200) {
    //       this.setState({ errFetchData: true })
    //     } else {
    //       return response.json();
    //     }
    //   }).then(data => {
    //     console.log(data);
    //     window.location.href = thread_url;
    //   })
    //   .catch(err => {
    //     console.warn(err);
    //   });