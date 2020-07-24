import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
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
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  imageButton: {
    marginLeft: theme.spacing(14.75),
  }
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        passwordrepeat: "",
        image: "",
        baseImage: "",
      },
      errors: {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        passwordrepeat: "",
        image: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleChange(event) {
    let state = this.state;
    let name = event.target.name;
    if ("image" === name) {
      let reader = new FileReader();
      reader.onload = () => {
        state.fields.baseImage = reader.result;
        this.setState(state);
      };
      state.fields.image = event.target.files[0];
      reader.readAsDataURL(state.fields.image);
    } else {
      state.fields[name] = event.target.value;
    }
    state.errors[name] = "";
    this.setState(state);
  }
  submitHandler(event) {
    let cont = true;
    let state = this.state;
    if (!state.fields.firstName) {
      cont = false;
      state.errors.firstName = "Please provide a firstName";
    }
    if (!state.fields.lastName) {
      cont = false;
      state.errors.lastName = "Please provide a lastName";
    }
    if (!state.fields.email) {
      cont = false;
      state.errors.email = "Please provide a email";
    } else {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(state.fields.email)) {
        cont = false;
        state.errors.email = "Please provide a valid email";
      }
    }
    if (!state.fields.username) {
      cont = false;
      state.errors.username = "Please provide a username";
    }
    if (!state.fields.password) {
      cont = false;
      state.errors.password = "Please provide a password";
    }
    if (!state.fields.passwordrepeat) {
      cont = false;
      state.errors.passwordrepeat = "Please confirm your password";
    } else if (state.fields.passwordrepeat !== state.fields.password) {
      cont = false;
      state.errors.passwordrepeat = "Passwords do not match";
    }
    this.setState(state);
    if (cont) {
      this.registerUser(this.state.fields);
    }
    event.preventDefault();
  }

  componentDidMount() {
    document.title = "Sign Up | Smart Matching";
  }

  async registerUser(userData) {
    let response = null;
    let userFormData = new FormData();
    for (const [key, value] of Object.entries(userData)) {
      userFormData.append(key, value);
    }
    try {
      response = await axios.post(`${this.props.url}/user/`, userFormData);
    } catch (e) {
      response = {...e.response};
    } finally {
      console.log(response);

      if (response.status === 200) {
        this.props.notificationHandler(
          "success",
          "Registered Successfully!",
          "Don't forget to check your email."
        );
        this.props.setUser(response.data.data);
        this.props.setIsLoggedIn(true);
        this.props.history.push("/");
      } else if (response.status === 400) {
        this.props.notificationHandler(
          "error",
          "Error!!",
          "Username or Email already in the system"
        );
      } else {
        this.props.notificationHandler("error", "Something's not right", "");
      }
    }

    console.log();
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
              <input
                type="file"
                name="image"
                ref={"image-input"}
                style={{ display: "none" }}
                accept="image/*"
                onChange={this.handleChange}
              />
              <Button
                className={classes.imageButton}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(e) => {
                  this.refs["image-input"].click();
                }}
              >
                <Avatar
                  src={
                    !!this.state.fields.baseImage
                      ? this.state.fields.baseImage
                      : "https://via.placeholder.com/150"
                  }
                  className={classes.large}
                />
              </Button>
              <TextField
                error={!!this.state.errors.firstName}
                helperText={this.state.errors.firstName}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                error={!!this.state.errors.lastName}
                helperText={this.state.errors.lastName}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                onChange={this.handleChange}
                autoFocus
              />
            </div>
            <TextField
              error={!!this.state.errors.email}
              helperText={this.state.errors.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
              autoFocus
            />
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <TextField
              error={!!this.state.errors.passwordrepeat}
              helperText={this.state.errors.passwordrepeat}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="passwordrepeat"
              label="Repeat Password"
              type="password"
              name="passwordrepeat"
              autoComplete="passwordrepeat"
              onChange={this.handleChange}
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
)(withStyles(useStyles, { theme: true })(Signup));
