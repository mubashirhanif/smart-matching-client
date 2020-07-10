import React, { Component } from 'react';
import './Navigation.css';
import { connect } from 'react-redux';
import { setGlobalCounter } from '../../actions/GlobalActions';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import axios from 'axios';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  incrementCounter = () => {
    this.props.setGlobalCounter(this.props.count + 1);
    console.log(`counter: ${this.props.count}`);
  }

  async testApiJSON() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(response.data);
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
            <IconButton onClick={ this.incrementCounter } >
              <i className="material-icons">Increment Counter</i>
            </IconButton>
            <IconButton onClick={ this.testApiJSON } >
              <i className="material-icons">Test JSON get</i>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGlobalCounter: count => { dispatch(setGlobalCounter(count)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
