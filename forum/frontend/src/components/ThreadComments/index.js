import React, { Component } from 'react';
import mui from 'material-ui';
import ForumIcon from 'react-material-icons/icons/communication/forum';

import '../thread.css';
import { dateDifference, noneAvatarUrl, max_thread_content, iconStyles } from '../Thread';


const Comment = ({comment}) => 
  !comment ? ( <div> Nothing to show </div> ) : (
    <article className="media" >
    <figure className="media-left">
      <p className="image is-64x64">
        <img src={comment.author_avatar || noneAvatarUrl} />
      </p>
    </figure>

    <div className="media-content">
      <div className="content">
        <div className="subject details">
          <strong>{comment.subject}</strong> <small>{'@'+comment.author_username.toString()+' '}</small>
          <small>{dateDifference(comment.creation_date) == 'day' ? 'today' : dateDifference(comment.creation_date)}</small>
          <p className="details">{comment.content.length > max_comment_content ? comment.content.slice(0,max_comment_content) : comment.content}</p>
          <small className="category">{comment.category}</small>
          <ForumIcon style={iconStyles}/>
          <small className="num-of-replies">{comment.number_of_replies.toString() + " replies"}</small>
        </div>
      </div>
    </div>

    { comment.number_of_replies > 0 ? (
    <div className="media-right is-hidden-mobile ">
    <figure className="author-of-comment is-pulled-left "> 
      <p className="image is-64x64">
        <img src={comment.last_commented_avatar || noneAvatarUrl}/>
      </p>
   </figure>
  <div className="author-of-comment is-pulled-right">
    <p><strong>{comment.last_commented_username}</strong></p>
    <p><small>{dateDifference(comment.last_commented_date)}</small></p>
  </div>
  </div>) : ''

    }

    </article>
  );


// class CommentMapper extends Component{
//     constructor(props){
//         super(props)
//     }

//     componentDidMount(){
//         console.log(this.props.data)
//     }

//     render(){
//         return (
//             this.props.data.map(elem => <Comment comment={elem}/>)
//         )
//     }
// }

function CommentMapper(props){
    console.log('Function props', props.data);
    const els = props.data.map(function(el){
        return <p>ololo</p>
    })
}


class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            fetching: false,
            err: false
        }
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad(event) {
        console.log('Getting data...')

        const url = window.location.href + '/True';

        this.setState({fetching: true});

        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    this.setState({ err: true })
                } else {
                    return response.json();
                }
            }).then(data => {
                this.setState({data: data, fetching: false});
                console.log(this.state.data);
            })
            .catch(err => {
                console.warn(err);
            });

    }

    render() {
        return (

            this.state.fetching ? 
                <a className="button is-loading">Loading</a>   
            : <CommentMapper data={this.state.data}/>

    
        )
    }
}

export default Comments;