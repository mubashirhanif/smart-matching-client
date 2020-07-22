import React, { Component } from "react";
import {
  withRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
import CreateService from "./components/CreateService/CreateService";
import { connect } from "react-redux";
import {
  setApiUrl,
  setNotificationHandler,
  setIsLoggedIn,
  setUser,
} from "./actions/GlobalActions";
import axios from "axios";
import { toast } from "react-toastify";
import Geocode from "react-geocode";
import qs from "qs";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

toast.configure({
  autoClose: 3000,
  draggable: true,
  pauseOnHover: true,
  position: "bottom-right",
});
Geocode.setApiKey(`${process.env.REACT_APP_MAP_API_KEY}`);
Geocode.setLanguage("en");

const ProtectedRoute = ({
  component: Component,
  isLoggedIn,
  notificationHandler,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.props.setApiUrl(process.env.REACT_APP_API_URL);
    this.props.setNotificationHandler(this.notificationHandler);
    this.bindApiInterceptor = this.bindApiInterceptor.bind(this);
    this.flashMessageMiddleware = this.flashMessageMiddleware.bind(this);
    axios.defaults.withCredentials = true;
  }

  componentDidMount() {
    // Bind interceptors;
    this.bindApiInterceptor();
    this.flashMessageMiddleware(this.props.location);
  }

  componentDidUpdate(prevProps) {
    this.flashMessageMiddleware(this.props.location);
  }

  bindApiInterceptor() {
    axios.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401) {
        this.props.setUser(null);
        this.props.setIsLoggedIn(false);
        this.notificationHandler("warning", "", "Not logged in!");
        return Promise.reject(error);
      }
    });
    axios.post(`${this.props.url}/user/verifylogin`);
  }

  flashMessageMiddleware(location) {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    if(!!query.flashMsgType && !!query.flashMsg){
      this.notificationHandler(query.flashMsgType, query.flashMsg);
      delete query.flashMsgType;
      delete query.flashMsg;
      this.props.history.push({
        pathname: location.pathName,
        search: `?${qs.stringify(query)}`,
      });
    }
  }

  notificationHandler(type, title, message) {
    toast[type](
      <div>
        <TypoGraphy color="inherit" component="div" variant="subtitle1">
          {title}
        </TypoGraphy>
        <TypoGraphy color="inherit" component="p" variant="inherit">
          {message}
        </TypoGraphy>
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider
        theme={createMuiTheme({ palette: { type: this.props.theme } })}
      >
        <CssBaseline />
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/search" component={Search} exact />
            <ProtectedRoute
              path="/user"
              component={User}
              notificationHandler={this.notificationHandler}
              isLoggedIn={this.props.isLoggedIn}
              exact
            />
            <ProtectedRoute
              path="/service/create-service"
              component={CreateService}
              notificationHandler={this.notificationHandler}
              isLoggedIn={this.props.isLoggedIn}
              exact
            />
            <Route path="/*" component={Error} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    isLoggedIn: state.isLoggedIn,
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setApiUrl: (url) => {
      dispatch(setApiUrl(url));
    },
    setNotificationHandler: (notificationHandler) => {
      dispatch(setNotificationHandler(notificationHandler));
    },
    setIsLoggedIn: (isLoggedIn) => {
      dispatch(setIsLoggedIn(isLoggedIn));
    },
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
