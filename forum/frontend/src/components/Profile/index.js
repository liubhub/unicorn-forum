import React, { Component } from 'react';

import './profile.css';

const noneAvatarUrl = '/static/avatar/avatar.png';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            data: null,
        }
    }

    componentWillMount(){
        const user = window.location.href.split('user/')[1].split('/')[0]

        this.setState({user: user});

        axios.get('/api/user/'+user)
        .then((response) =>{
            return response.data;
        }).then((data)=>{
            console.log(data);
            this.setState({data: data});
        })


    }
    render(){
        if (this.state.data && this.state.data.city){
            var city = this.state.data.city;
        }else if(this.state.data &&  this.state.data.country){
            var country = this.state.data.country;
        }

        if(this.state.data && this.state.data.birth_date){
            var birth_date = new Date(this.data.birth_date);
        }
        
        return !this.state.data ? <a className="button is-loading">Loading</a> : ([
            <div className="media user-profile-data" key="#1">
                <div className="media-center user-image-container">
                    <img src={this.state.data.user_data.avatar || noneAvatarUrl} className="user-image" alt={this.state.user}/>
                </div>

                <div className="media-content has-text-centered user-details">
                    <p className="title article-title user-name">{this.state.user}</p>
                    <div className="subtitle is-6 article-subtitle location">

                            <figure className="image is-16x16">
                                <img src="/static/img/location_on_grey_18x18.png"/>
                            </figure>

                            { city ? <span>{this.state.data.city}</span> : null}
                            { country ? <span>{', '+this.state.data.country}</span> : null}
                            {!city && !country ? <span>Mother Earth</span> : null}

                        </div>
                </div>
            </div>,

            <div className="content article-body user-profile-details" key="#2">


            <div className="columns">
                <div className="column">
                    <div className="message-to-user">
                        <figure className="chat-icon image is-32x32">
                            <img src="/static/img/emoticon-chat.png"/>
                        </figure>
                        <p className="send-message is-size-6">Send Message</p>
                    </div>

                    <div className="gender detail">
                        <span>Gender: </span> <span>{this.state.data.gender ? "Female" : "Male"}</span>
                    </div>
                    { !birth_date ? null : (
                            <div className="birthday detail">
                                    <span>Birthday: </span> <span> {birth_date.toLocaleDateString()} </span>
                            </div>
                        )
                    }

                    {!this.state.data.bio ? null : (
                        <div className="about detail">
                            <h2 className="has-text-centered">About</h2>
                            <p className="about-text">
                                {this.state.data.bio}
                            </p>
                        </div>
                        )
                    }
                    <div className="social-media detail">
                        <div className="icon-container"><div className="icon is-medium">
                            <img src="/static/img/social/021-facebook.png" alt="Facebook"/>
                        </div></div>
                        <div className="icon-container"><div className="icon is-medium">
                            <img src="/static/img/social/021-instagram.png" alt="Instagram"/>
                        </div></div>
                        <div className="icon-container"><div className="icon is-medium">
                            <img src="/static/img/social/021-twitter.png" alt="Twitter"/>
                        </div></div>
                        <div className="icon-container"><div className="icon is-medium">
                            <img src="/static/img/social/021-youtube.png" alt="Youtube"/>
                        </div></div>
                    </div>

                </div>


                
                <div className="column user-history">
                    <div className="like history">
                        <span></span>
                        <span className="num-of-likes">{this.state.data.user_likes.length}</span> <span>likes</span>
                    </div>
                    <div className="comment history">
                            <span className="num-of-comments">{this.state.data.num_user_comments}</span> <span>comments</span>
                    </div>
                    <div className="theme history">
                            <span className="num-of-threads">{this.state.data.user_threads.length}</span> <span>threads</span>
                    </div>
                    <div className="since-date history">
                        Member Since: <span>{new Date(this.state.data.user_data.date_joined).toUTCString().slice(5,16)}</span>
                    </div>
                </div>
            </div>

            </div>]

        )
    }
}
export default Profile;