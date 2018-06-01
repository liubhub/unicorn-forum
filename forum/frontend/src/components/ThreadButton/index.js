import React, { Component } from 'react';
import ThreadModalForm from './ThreadModal';
import {render} from 'react-dom'

class ThreadButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isClicked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(event) {
        console.log('clicked');
        this.setState({
            isClicked: !this.state.isClicked,
        });
    }

    render() {
        console.log('Thread button is rrendering')
        return localStorage.getItem('token') ? (<div className="control">
            <div className="button is-primary">
                <div onClick={this.handleClick}>Create Thread</div>

                {
                    this.state.isClicked && (
                        // код модального окна
                       <ThreadModalForm />
                    )
                }


            </div>
        </div>)
            : null;
    }
}
export default ThreadButton;
render(<ThreadButton/>, document.getElementById('createThread'));