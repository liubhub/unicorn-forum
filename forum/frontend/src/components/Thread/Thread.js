import React, {Component} from 'react';
import mui from 'material-ui';

import ForumIcon from 'react-material-icons/icons/communication/forum';

let iconStyles = {
    fontSize: '12px',
    color: 'grey'
}

class Alarm extends Component {
  render() {
    return (
      <ForumIcon style={iconStyles}/>
    );
  }
}

export default Alarm;