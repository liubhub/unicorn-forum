import React, {Component} from 'react';
import axios from 'axios';
import mui from 'material-ui';

import ForumIcon from 'react-material-icons/icons/communication/forum';

let iconStyles = {
    fontSize: '12px',
    color: 'grey'
}

// class ForumIconElement extends Component {
//   render() {
//     return (
//       <ForumIcon style={iconStyles}/>
//     );
//   }
// }

class Thread extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }


  componentWillMount(){
    console.log('Component will mount');
    console.log('Sending ajax');

    // get data

    const url = '/api/threads';

    axios(url)
        .then(data => {
            this.setState({
                data : data
            })
        })
        .catch(err => console.warn('Error:', err));
  }

  render() {
    console.log(this.state.data);
    return (<div> Hello </div>)
  }
}



export default Thread;