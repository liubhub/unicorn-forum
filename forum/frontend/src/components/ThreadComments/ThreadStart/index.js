import React, { Component } from 'react';

import { dateDifference, noneAvatarUrl } from '../../Thread';
import LikeButton from '../../LikeButton';


const ThreadStart = ({ data, user }) => (
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

        <LikeButton theme user={user} entity={data.entity}/>
    </article>
);

export default ThreadStart;