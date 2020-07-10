import React, { Component } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';

class Navigation extends Component {
  test() {
    alert("test");
  }
  render() {
    return (
      <div className="Navigation">
        <AppBar position="static" color="default">
          <Toolbar>
            <div>
              <Link to="/">Home</Link>
              <Link to="/Error">Error</Link>
            </div>
            <IconButton onClick={ this.test } >
              <i className="material-icons">Test Button</i>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navigation;
