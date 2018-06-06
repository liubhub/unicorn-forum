import React, { Component } from 'react';
import PropTypes from "prop-types";
import mui from 'material-ui';

import ForumIcon from 'react-material-icons/icons/communication/forum';
import '../thread.css';
import axios from 'axios';

export let iconStyles = {
  fontSize: '12px',
  color: 'grey'
}
// const noneAvatarUrl = "https://bulma.io/images/placeholders/128x128.png";
export const noneAvatarUrl = '/static/avatar/avatar.png';
export const max_thread_content = 90;

export function dateDifference(date) {
  if (!date) {
    return '';
  }
  var diff = (new Date() - new Date(date));
  diff = Math.ceil(diff / (1000 * 3600 * 24));
  return diff > 30 ? (new Date(date)).toLocaleDateString() : diff > 1 ? ' ' + diff.toString() + ' days' : 'day';
}


export class MediaElement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      errFetchData: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const thread_url = '/thread/' + event.currentTarget.id.toString();

    window.location.href = thread_url;

  }

  render() {
    // console.log('This')
    // console.log(this.props.thread.user.avatar)
    // return null;
    return (!this.props.thread ? <div> Nothing to show </div> : (
      <article className="media" id={'t' + this.props.thread.entity.toString()} onClick={this.handleClick}>
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={this.props.thread.user.avatar || noneAvatarUrl} />
          </p>
        </figure>

        <div className="media-content">
          <div className="content">
            <div className="subject details">
              <strong>{this.props.thread.subject}</strong> <small>{'@' + this.props.thread.user.username.toString() + ' '}</small>
              <small>{dateDifference(this.props.thread.created_at) == 'day' ? 'today' : dateDifference(this.props.thread.created_at)}</small>
              <p className="details">{this.props.thread.content.length > max_thread_content ? this.props.thread.content.slice(0, max_thread_content) : this.props.thread.content}</p>
              <small className="category">{this.props.thread.category.category_name}</small>
              <ForumIcon style={iconStyles} />
              <small className="num-of-replies">{this.props.thread.comments.length.toString() + " replies"}</small>
            </div>
          </div>
        </div>

        {this.props.thread.comments.length > 0 ? (
          <div className="media-right is-hidden-mobile ">
            <figure className="author-of-comment is-pulled-left ">
              <p className="image is-64x64">
                <img src={this.props.thread.last_meta_data.last_commented_avatar || noneAvatarUrl} />
              </p>
            </figure>
            <div className="author-of-comment is-pulled-right">
              <p><strong>{this.props.thread.last_meta_data.last_commented_username}</strong></p>
              <p><small>{dateDifference(this.props.thread.last_meta_data.last_commented_date)}</small></p>
            </div>
          </div>) : ''

        }

      </article>
    )
    )
  }

}


MediaElement.propTypes = {
  thread: PropTypes.object.isRequired
};