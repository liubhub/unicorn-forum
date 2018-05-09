import React, { Component } from 'react'


class ThreadButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'unregistered': true
        }
        this.handleStorage = this.handleStorage.bind(this);
    }

    // это не имеет смысла
    handleStorage(){
        if(localStorage.getItem('token')){
            console.log('We have token');
            this.state.unregistered = false;
        }else{
            this.state.unregistered = true;
        }
    }

    render() {

        this.state.unregistered = localStorage.getItem('token') ? false : true;

        return !this.state.unregistered ? (<div className="control">
            <div className="button is-primary">
                <div>Create Thread</div>
            </div>
        </div>) : null;
    }
}
export default ThreadButton;