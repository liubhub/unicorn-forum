import React, {Component} from 'react';
import axios from 'axios';
import shortid from 'shortid';

import './style.css';
import { dateDifference, noneAvatarUrl } from '../Thread';

var uuid = shortid.generate;
 
class User extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const users = this.props.data.map(el => {
            return (<article className="media" key={uuid()}>

                 <figure className="media-left">
                    <p className="image is-96x96">
                        <img src={el.avatar || noneAvatarUrl} />
                    </p>

                    <div className="username">
                        {'@' + el.username}
                    </div>
                </figure>


                <div className="media-content">
                    <div className="content">

                        <div className="is-pulled-left">
                            <div className="num">
                            {el.num_of_threads.toString() + ' threads created'}
                            </div>
                        </div>
                        <div className="is-pulled-right">
                            <div className="num">
                                {el.num_of_comments.toString() + ' comments created'}
                            </div>
                        </div>


                    </div>
                </div>


            </article>)
        });

        return <div>{users}</div>
    }
}


class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            fetching: true
        }
    }
    componentWillMount(){
        axios({
            method:'get',
            url: '/api/users',
        }).then((response) => {
            this.setState({
                data: response.data,
                fetching: false,
            });
        }).catch((err) => {
            console.warn(err);
        })
        console.log('data in state:', this.state)
    }

    render(){

        return (
        this.state.fetching ? <a className="button is-loading">Loading</a> : (
            <User data={this.state.data}/>
        )
    )
    }
}


export default Users;