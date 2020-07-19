import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import "./Home.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import TypoGraphy from "@material-ui/core/Typography";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Geocode from "react-geocode";
import "react-google-places-autocomplete/dist/index.min.css";
// import SearchIcon from '@material-ui/icons/Search';
Geocode.setLanguage("en");

class Home extends Component {
  userLocationHandler() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            const address = response.results[0].formatted_address;
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
      });
    } else {
      this.props.notificationHandler("error", "", "Can't get your location");
    }
  }
  render() {
    return (
      <div className="search-container">
        <Grid container spacing={3}>
          <Grid item xs={6} className="search-outer">
            <div className="search-middle">
              <TypoGraphy component="div" variant="h2">
                  Progress
              </TypoGraphy>
              <Paper component="form" className="search-bar-root">
                <IconButton
                  onClick={this.userLocationHandler}
                  aria-label="search"
                >
                  <MyLocationIcon />
                </IconButton>
                <div className="search-input">
                  <GooglePlacesAutocomplete onSelect={console.log} />
                </div>
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notificationHandler: state.notificationHandler,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
