import React, { Component } from 'react';

import { dateDifference, noneAvatarUrl } from '../../Thread';
import LikeButton from '../../LikeButton';

const Comment = ({ comment, user }) => (
    <article className="media thread-comments" >
        <figure className="media-left">
            <p className="image is-96x96">
                <img src={comment.creator.avatar || noneAvatarUrl} />
            </p>
            <div className="author-username">
                <small><a href={"/user/"+comment.creator.username.toString()}>{'@' + comment.creator.username.toString() + ' '}</a></small>
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

    <LikeButton user={user} entity={comment.id}/>
    </article>
);

export default Comment;