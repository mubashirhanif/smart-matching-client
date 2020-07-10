import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route component={ Error } />
        </Switch>
      </Router>
    );
  }
}

export default App;
