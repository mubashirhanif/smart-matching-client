import React, { Component } from "react";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { setUser, setTheme, setIsLoggedIn } from "../../actions/GlobalActions";

function LoginButton(props) {
  return (
    <Button to={"/login"} component={RouterLink} onClick={props.onClick}>
      Login
    </Button>
  );
}

function LogoutButton(props) {
  return (
    <Button to={"/logout"} component={RouterLink} onClick={props.onClick}>
      Logout
    </Button>
  );
}

class Navigation extends Component {
  switchTheme = (event) => {
    const theme = event.target.checked ? "dark" : "light";
    this.props.setTheme(theme);
  };

  handleLoginClick = () => {
    this.props.setIsLoggedIn(true);
    this.props.notificationHandler(
      "success",
      "Logged In!",
      "User logged in successfully"
    );
  };

  handleLogoutClick = () => {
    this.props.setIsLoggedIn(false);
    this.props.notificationHandler(
      "success",
      "Logged Out!",
      "User logged out successfully"
    );
  };

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div className="root">
        <AppBar color="inherit" position="static">
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
            <TypoGraphy component="div" color="inherit" variant="inherit">
              <Button to={"/about"} component={RouterLink} variant="text">
                How it Works
              </Button>
            </TypoGraphy>
            <TypoGraphy
              component="div"
              color="inherit"
              variant="inherit"
              className="links"
            >
              <Button to={"/about"} component={RouterLink} variant="text">
                Find a Service
              </Button>
            </TypoGraphy>
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
