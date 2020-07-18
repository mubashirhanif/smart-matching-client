import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Home.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';



class Home extends Component {
  render() {
    return (
      <div className="App">

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper component="form" >
              <InputBase
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" aria-label="search">
                {/* <SearchIcon /> */}
              </IconButton>
              <IconButton color="primary" aria-label="directions">
                Find Service
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
        </Grid>
      </div>


    );
  }
}

export default Home;
