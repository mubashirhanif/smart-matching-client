import React, { Component } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { setUser, setTheme, setIsLoggedIn } from "../../actions/GlobalActions";
import axios from "axios";
import "./Navigation.css";

function LoginButton(props) {
  return (
    <Button to={"/login"} component={RouterLink} onClick={props.onClick}>
      Login
    </Button>
  );
}

function ProfileButton(props) {
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={props.menuClickHandler}
      >
        {props.user ? (
          <Avatar>
            {props.user.firstName[0]}
            {props.user.lastName[0]}
          </Avatar>
        ) : (
          props.handleLogout()
        )}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={props.menuAnchorEl}
        open={Boolean(props.menuAnchorEl)}
        onClose={props.menuCloseHandler}
        keepMounted
      >
        <MenuItem
          to={"/user"}
          component={RouterLink}
          onClick={props.menuCloseHandler}
        >
          My Account
        </MenuItem>
        <MenuItem to={"/service/create-service"} component={RouterLink} onClick={props.menuCloseHandler}>
          Create Service
        </MenuItem>
        <MenuItem to={"/"} component={RouterLink} onClick={props.handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { menuAnchorEl: null };
    this.switchTheme = this.switchTheme.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.menuClickHandler = this.menuClickHandler.bind(this);
    this.menuCloseHandler = this.menuCloseHandler.bind(this);
  }

  switchTheme(event) {
    const theme = event.target.checked ? "dark" : "light";
    this.props.setTheme(theme);
  }

  menuCloseHandler() {
    let state = this.state;
    state.menuAnchorEl = null;
    this.setState(state);
  }

  menuClickHandler(event) {
    let state = this.state;
    state.menuAnchorEl = event.currentTarget;
    this.setState(state);
  }

  async handleLogout() {
    this.menuCloseHandler();
    try {
      await axios.get(`${this.props.url}/user/logout`);
    } catch (e) {
      console.log(e.response);
    } finally {
      this.props.setIsLoggedIn(false);
      this.props.setUser(null);
      document.cookie = "";
      this.props.notificationHandler(
        "success",
        "Logged Out!",
        "User logged out successfully"
      );
    }
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = (
        <ProfileButton
          handleLogout={this.handleLogout}
          user={this.props.user}
          menuAnchorEl={this.state.menuAnchorEl}
          menuCloseHandler={this.menuCloseHandler}
          menuClickHandler={this.menuClickHandler}
        />
      );
    } else {
      button = <LoginButton />;
    }
    return (
      <div className="root">
        <AppBar color="inherit" position="fixed">
          <Toolbar className="nav-container">
            <TypoGraphy component="div" variant="h6" className="header-logo">
              <Link
                underline="none"
                color="inherit"
                to={"/"}
                component={RouterLink}
              >
                SmartMatching
              </Link>
            </TypoGraphy>
            <div className="links"></div>
            <TypoGraphy component="div" variant="inherit">
              {button}
            </TypoGraphy>
            <TypoGraphy color="inherit" variant="inherit">
              <Switch
                checked={this.props.theme === "dark"}
                onChange={this.switchTheme}
                name="themeSwitch"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </TypoGraphy>
          </Toolbar>
        </AppBar>
      </div>
    );
    // <div className="root">
    //   <AppBar color="inherit" position="static">
    //     <Toolbar>
    //       <TypoGraphy color="default" variant="h4">
    //         <Link
    //           className="header-icon"
    //           color="default"
    //           to={"/"}
    //           component={RouterLink}
    //         >
    //           SmartMatching
    //         </Link>
    //       </TypoGraphy>

    //       <List component="nav" className="inline">
    //         <ListItem component="div" className="list">
    //           <ListItemText inset>
    //             <TypoGraphy color="default" variant="default">
    //               <Button
    //                 to={"/about"}
    //                 component={RouterLink}
    //                 variant="default"
    //               >
    //                 How it Works
    //               </Button>
    //             </TypoGraphy>
    //           </ListItemText>
    //           <ListItemText inset>
    //             <TypoGraphy color="default" variant="default">
    //               <Button to={"/service"} component={RouterLink}>
    //                 Find a Service
    //               </Button>
    //             </TypoGraphy>
    //           </ListItemText>
    //         </ListItem>

    //         <ListItem component="div">
    //           <ListItemText inset>
    //             <TypoGraphy color="default" variant="default">
    //               <Button to={"/login"} component={RouterLink}>
    //                 Login
    //               </Button>
    //             </TypoGraphy>
    //           </ListItemText>
    //           <ListItemText inset>
    //             <TypoGraphy color="default" variant="default">
    //               <Switch
    //                 checked={this.props.theme === "dark"}
    //                 onChange={this.switchTheme}
    //                 name="themeSwitch"
    //                 inputProps={{ "aria-label": "secondary checkbox" }}
    //               />
    //             </TypoGraphy>
    //           </ListItemText>
    //         </ListItem>
    //       </List>
    //     </Toolbar>
    //   </AppBar>
    // </div>
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    user: state.user,
    theme: state.theme,
    isLoggedIn: state.isLoggedIn,
    notificationHandler: state.notificationHandler,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    setTheme: (theme) => {
      dispatch(setTheme(theme));
    },
    setIsLoggedIn: (isLoggedIn) => {
      dispatch(setIsLoggedIn(isLoggedIn));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
