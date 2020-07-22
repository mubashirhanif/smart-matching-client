import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import "./User.css";
import Typography from "@material-ui/core/Typography";


const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class User extends Component {
  constructor(props) {
    super(props);
  }  

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem>
                <Typography variant="h5">
                  {this.props.user.firstName} {this.props.user.lastName}
                </Typography>
              </ListItem>
              <ListItem>
                {this.props.user.email}
              </ListItem>
            </List>
            
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Grid container spacing={10}>
            
          </Grid>
        </main>
      </div>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { theme: true })(User));
