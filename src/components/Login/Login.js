import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { setUser, setIsLoggedIn } from "../../actions/GlobalActions";
import axios from "axios";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
      },
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(userCredentials) {
    let response = null;
    try {
      response = await axios.post(
        `${this.props.url}/user/login`,
        userCredentials
      );
    } catch (e) {
      response = e.response;
    } finally {
      if (response.status === 200) {
        this.props.notificationHandler("success", "Logged in Successfully!");
        this.props.setUser(response.data.data);
        this.props.setIsLoggedIn(true);
        this.props.history.push("/");
      } else if (response.status === 401) {
        this.props.notificationHandler(
          "error",
          "Authentication Error!",
          "Username or Password not correct"
        );
      } else {
        this.props.notificationHandler("error", "Something not right", "");
      }
    }
  }

  onChangeHandler(event) {
    let state = this.state;
    state.fields[event.target.name] = event.target.value;
    state.errors[event.target.name] = "";
    this.setState(state);
  }

  submitHandler(event) {
    let cont = true;
    let state = this.state;
    if (!state.fields.username) {
      cont = false;
      state.errors.username = "Please provide a username";
    }
    if (!state.fields.password) {
      cont = false;
      state.errors.password = "Please provide a password";
    }
    this.setState(state);
    if (cont) {
      // we continue here

      this.loginUser(this.state.fields);
      //this.props.notificationHandler("success", "", "");
    }
    event.preventDefault();
  }

  componentDidMount() {
    document.title = "Log In | Smart Matching";
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            onSubmit={this.submitHandler}
            className={classes.form}
            noValidate
          >
            <TextField
              error={!!this.state.errors.username}
              helperText={this.state.errors.username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={this.onChangeHandler}
              autoFocus
            />
            <TextField
              error={!!this.state.errors.password}
              helperText={this.state.errors.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.onChangeHandler}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={"/forgot"} component={RouterLink} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/signup"} component={RouterLink} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    notificationHandler: state.notificationHandler,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    setIsLoggedIn: (isLoggedIn) => {
      dispatch(setIsLoggedIn(isLoggedIn));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { theme: true })(Login));
