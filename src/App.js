import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './components/Error/Error';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import User from './components/User/User';
import { connect } from 'react-redux';
import { setApiUrl } from './actions/GlobalActions';
import axios from 'axios';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.url = `http://localhost:8080`;
    console.log(this.url);
    this.props.setApiUrl(this.url)
    axios.defaults.withCredentials = true;
  }
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={ Home } exact />
            <Route path="/users" component={ User } exact />
            <Route component={ Error } />
          </Switch>
        </div>
      </Router>
    );
  }

}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setApiUrl: url => { dispatch(setApiUrl(url)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
