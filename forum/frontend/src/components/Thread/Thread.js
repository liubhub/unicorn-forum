import React, { Component } from 'react';
import PropTypes from "prop-types";
import mui from 'material-ui';

import ForumIcon from 'react-material-icons/icons/communication/forum';
import './thread.css';

let iconStyles = {
  fontSize: '12px',
  color: 'grey'
}
const noneAvatarUrl = "https://bulma.io/images/placeholders/128x128.png";

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
          <strong>{thread.subject}</strong> <small>{thread.author_username}</small>
          <small>{thread.creation_date}</small>
          <p className="details">{thread.content}</p>
          <small>{thread.category}</small>
          <ForumIcon style={iconStyles}/>
          <small className="num-of-replies">{thread.number_of_replies.toString() + " replies"}</small>
        </div>
      </div>
    </div>

    <div className="media-right is-hidden-mobile ">
    <figure className="author-of-comment is-pulled-left "> 
      <p className="image is-64x64">
        <img src={thread.last_commented_avatar || noneAvatarUrl}/>
      </p>
   </figure>
  <div className="author-of-comment is-pulled-right">
    <p><strong>{thread.last_commented_username}</strong></p>
    <p><small>{thread.last_commented_date}</small></p>
  </div>
  </div>
    </article>
  );

MediaElement.propTypes = {
  thread: PropTypes.object.isRequired
};

export default MediaElement;