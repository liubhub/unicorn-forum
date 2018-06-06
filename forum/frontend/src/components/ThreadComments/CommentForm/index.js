import React, { Component } from 'react';

function CommentForm(props) {
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

export default CommentForm;