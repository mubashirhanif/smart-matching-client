import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Error from './components/Error/Error';
import { connect } from 'react-redux';
import { setApiUrl } from './actions/GlobalActions';
import axios from 'axios';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.url = `${process.env.API_SERVER}`;
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
