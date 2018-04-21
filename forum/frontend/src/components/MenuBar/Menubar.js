import React, {Component} from 'react'
import ReactDOM from 'react-dom'; 
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit *3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Navbar extends Component {
  render() {
    const {classes} = this.props;

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="contrast" onClick={this.props.toggleDrawer}><MenuIcon/></IconButton>
          <Typography className={classes.flex} type="title" color="inherit">
            Unicorn forum
          </Typography>
          <div>
            <IconButton color="contrast" onClick={this.props.login}>
              <AccountCircle/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

const StyledAppBar = withStyles(styles)(Navbar);

ReactDOM.render(<StyledAppBar />, document.getElementById('menu')); 



// export default withStyles(styles)(Navbar);

// import React from 'react';
// import ReactDOM from 'react-dom'; 
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
// import AppBar from 'material-ui/AppBar';
// import Toolbar from 'material-ui/Toolbar';
// import Typography from 'material-ui/Typography';
// import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';
// // import MenuIcon from 'material-ui/icons/Menu';

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   flex: {
//     flex: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
//             {/* <MenuIcon /> */}
//           </IconButton>
//           <Typography variant="title" color="inherit" className={classes.flex}>
//             Title
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// const StyledAppBar = withStyles(styles)(ButtonAppBar);

// // export default withStyles(styles)(ButtonAppBar);

// ReactDOM.render(<StyledAppBar />, document.getElementById('menu')); 

// import React, { Component } from 'react';      
// import ReactDOM from 'react-dom';      
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';      
// import AppBar from 'material-ui/AppBar';                                 
// // import registerServiceWorker from './registerServiceWorker';      

// class App extends Component {                                                                            
//   render () {                                                                                            
//     return (                                                                                             
//       <MuiThemeProvider>                                                                                 
//         <AppBar />                                                                                       
//       </MuiThemeProvider>                                                                                
//     );                                                                                                   
//   };                                                                                                     
// };                                                                                                       

// ReactDOM.render(<App />, document.getElementById('menu'));                                               
// registerServiceWorker();                     


// import React from 'react'
// import ReactDOM from "react-dom";
// import {AppBar, Tabs, Tab} from 'material-ui'

// class Nav extends React.Component {
//   render() {
//     return (
//       <AppBar title="My App">
//         <Tabs>
//           <Tab label="Item 1" />
//           <Tab label="Item 2" />
//           <Tab label="Item 3" />
//           <Tab label="Item 4" />
//         </Tabs>
//       </AppBar>
//     )
//   }
// }

// ReactDOM.render(<Nav />, document.querySelector("#menu"))





// import React from 'react';
// // import { render, ReactDOM } from 'react-dom';
// // import Button from 'material-ui/Button';
// import ReactDOM from "react-dom";
// import AppBar from 'material-ui';
// // import f from 'mat'

// function MenuBar() {
//   return (
//     <AppBar className="MenuBar" title='unicorn forum'></AppBar>
//   );
// }

// const wrapper = document.getElementById("menu");
// console.log("Wrapper: ", wrapper)
// wrapper ? ReactDOM.render(<MenuBar />, wrapper) : null;