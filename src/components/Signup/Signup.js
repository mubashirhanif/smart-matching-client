import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { setUser, setIsLoggedIn } from "../../actions/GlobalActions";

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

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: {
          value: "",
          errorText: "",
        },
        password: {
          value: "",
          errorText: "",
        },
        email: {
          value: "",
          errorText: "",
        },
        firstname: {
          value: "",
          errorText: "",
        },
        lastname: {
          value: "",
          errorText: "",
        },
        passwordrepeat: {
          value: "",
          errorText: "",
        },
      },
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChangeHandler(event) {
    let state = this.state;
    state.fields[event.target.name].value = event.target.value;
    state.fields[event.target.name].errorText = "";
    this.setState(state);
  }
  submitHandler(event) {
    let cont = true;
    let state = this.state;
    if (!state.fields.firstname.value) {
      cont = false;
      state.fields.firstname.errorText = "Please provide a firstname";
    }
    if (!state.fields.lastname.value) {
      cont = false;
      state.fields.lastname.errorText = "Please provide a lastname";
    }
    if (!state.fields.email.value) {
      cont = false;
      state.fields.email.errorText = "Please provide a email";
    }
    if (!state.fields.username.value) {
      cont = false;
      state.fields.username.errorText = "Please provide a username";
    }
    if (!state.fields.password.value) {
      cont = false;
      state.fields.password.errorText = "Please provide a password";
    }
    if (!state.fields.passwordrepeat.value) {
      cont = false;
      state.fields.passwordrepeat.errorText = "Please confirm your password";
    }
    else if (state.fields.passwordrepeat.value !== state.fields.password.value){
      cont = false;
      state.fields.passwordrepeat.errorText = "Passwords do not match";
    }
    this.setState(state);
    if (cont) {
      // we continue here
      this.props.notificationHandler("success", "", "");
    }
    event.preventDefault();
  }
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            onSubmit={this.submitHandler}
            className={classes.form}
            noValidate
          >
            <div>
              <TextField
                error={!!this.state.fields.firstname.errorText}
                helperText={this.state.fields.firstname.errorText}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                onChange={this.onChangeHandler}
                autoFocus
              />
              <TextField
                error={!!this.state.fields.lastname.errorText}
                helperText={this.state.fields.lastname.errorText}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                onChange={this.onChangeHandler}
                autoFocus
              />
            </div>
            <TextField
              error={!!this.state.fields.email.errorText}
              helperText={this.state.fields.email.errorText}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={this.onChangeHandler}
              autoFocus
            />
            <TextField
              error={!!this.state.fields.username.errorText}
              helperText={this.state.fields.username.errorText}
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
              error={!!this.state.fields.password.errorText}
              helperText={this.state.fields.password.errorText}
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
            <TextField
              error={!!this.state.fields.passwordrepeat.errorText}
              helperText={this.state.fields.passwordrepeat.errorText}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="passwordrepeat"
              label="Repeat Password"
              type="password"
              name="passwordrepeat"
              autoComplete="passwordrepeat"
              onChange={this.onChangeHandler}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/login"} component={RouterLink} variant="body2">
                  {"Already a member? Sign in"}
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
)(withStyles(useStyles, { theme: true })(Signup));
