import React, { Component } from 'react';
import PropTypes from "prop-types";
import mui from 'material-ui';

import ForumIcon from 'react-material-icons/icons/communication/forum';
import './thread.css';

let iconStyles = {
  fontSize: '12px',
  color: 'grey'
}
// const noneAvatarUrl = "https://bulma.io/images/placeholders/128x128.png";
const noneAvatarUrl = '/static/avatar/avatar.png';
const max_thread_content = 90;

function dateDifference(date){
  if(!date){
    return '';
  }
  var diff = (new Date() - new Date(date));
  diff = Math.ceil(diff / (1000 * 3600 * 24));
  return diff > 30 ? (new Date(date)).toLocaleDateString() : diff > 1 ? ' '+diff.toString() + ' days' : 'day';
}

const MediaElement = ({thread}) => 
  !thread ? ( <div> Nothing to show </div> ) : (
    <article className="media">
    <figure className="media-left">
      <p className="image is-64x64">
        <img src={thread.author_avatar || noneAvatarUrl} />
      </p>
    </figure>
    
    <div className="media-content">
      <div className="content">
        <div className="subject details">
          <strong>{thread.subject}</strong> <small>{'@'+thread.author_username.toString()+' '}</small>
          <small>{dateDifference(thread.creation_date) == 'day' ? 'today' : dateDifference(thread.creation_date)}</small>
          <p className="details">{thread.content.length > max_thread_content ? thread.content.slice(0,max_thread_content) : thread.content}</p>
          <small className="category">{thread.category}</small>
          <ForumIcon style={iconStyles}/>
          <small className="num-of-replies">{thread.number_of_replies.toString() + " replies"}</small>
        </div>
      </div>
    </div>

    { thread.number_of_replies > 0 ? (
    <div className="media-right is-hidden-mobile ">
    <figure className="author-of-comment is-pulled-left "> 
      <p className="image is-64x64">
        <img src={thread.last_commented_avatar || noneAvatarUrl}/>
      </p>
   </figure>
  <div className="author-of-comment is-pulled-right">
    <p><strong>{thread.last_commented_username}</strong></p>
    <p><small>{dateDifference(thread.last_commented_date)}</small></p>
  </div>
  </div>) : ''

    }

    </article>
  );

MediaElement.propTypes = {
  thread: PropTypes.object.isRequired
};

export default MediaElement;