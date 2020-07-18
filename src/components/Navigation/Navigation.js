import React, { Component } from 'react';
import styles from './Navigation.css';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { setGlobalCounter } from '../../actions/GlobalActions';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';


const SMLink = styled(Link)({
  textDecoration: 'none',
  cursor: 'pointer',
  color: 'black'
});
class Navigation extends Component {

  render() {
    const linkStyle = [styles.link, 'white'].join(' ')
    return (

      <div>
        <AppBar color="default" position="static">
          <Toolbar>
            <TypoGraphy color="inherit" variant="title">
              <SMLink color="primary" to={"/"} component={RouterLink} >SmartMatching </SMLink>
            </TypoGraphy>

            <List component="nav">
              <ListItem component="div">
                <ListItemText inset>
                  <TypoGraphy color="inherit" variant="title">
                    <SMLink to={"/"} component={RouterLink} variant="inherit">How it Works</SMLink>
                  </TypoGraphy>
                </ListItemText>

                <ListItemText inset>
                  <TypoGraphy color="inherit" variant="title">
                    <SMLink to={"/users"} component={RouterLink}>Find a Service</SMLink>
                  </TypoGraphy>
                </ListItemText>

                <ListItemText inset>
                  <TypoGraphy color="inherit" variant="title">
                    <SMLink to={"/Error"} component={RouterLink}>Login</SMLink>
                  </TypoGraphy>
                </ListItemText>

                <ListItemText inset>
                  <TypoGraphy color="inherit" variant="title">
                    <SMLink to={"/Error"} component={RouterLink}>Sign Up</SMLink>
                  </TypoGraphy>
                </ListItemText>
              </ListItem >
            </List>
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}

export default Navigation;
