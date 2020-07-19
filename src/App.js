import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import TypoGraphy from "@material-ui/core/Typography";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Search from "./components/Search/Search";
import Navigation from "./components/Navigation/Navigation";
import { connect } from "react-redux";
import {
  setApiUrl,
  setTheme,
  setNotificationHandler,
} from "./actions/GlobalActions";
import axios from "axios";
import { toast } from "react-toastify";
import Geocode from "react-geocode";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

toast.configure({
  autoClose: 3000,
  draggable: true,
  pauseOnHover: true,
  position: "bottom-right",
});
Geocode.setApiKey("AIzaSyChmiFhlkbfTmX4m2PiUtH6kYRVjibxKE4");
Geocode.setLanguage("en");

class App extends Component {
  constructor(props) {
    super(props);
    this.url = `http://localhost:8080`;
    console.log(this.url);
    this.props.setApiUrl(this.url);
    this.props.setNotificationHandler(this.notificationHandler);
    axios.defaults.withCredentials = true;
  }

  notificationHandler(type, title, message) {
    toast[type](
      <div>
        <TypoGraphy color="primary" component="div" variant="subtitle1">
          {title}
        </TypoGraphy>
        <TypoGraphy
          color="secondary"
          component="p"
          color="inherit"
          variant="inherit"
        >
          {message}
        </TypoGraphy>
      </div>
    );
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider
          theme={createMuiTheme({ palette: { type: this.props.theme } })}
        >
          <CssBaseline />
          <div className="App">
            <Navigation />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/users" component={User} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/signup" component={Signup} exact />
              <Route path="/search" component={Search} exact />
              <Route path="/*" component={Error} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setApiUrl: (url) => {
      dispatch(setApiUrl(url));
    },
    setTheme: (theme) => {
      dispatch(setTheme(theme));
    },
    setNotificationHandler: (notificationHandler) => {
      dispatch(setNotificationHandler(notificationHandler));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
