import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import "./Home.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import TypoGraphy from "@material-ui/core/Typography";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Geocode from "react-geocode";
import { Link as RouterLink } from "react-router-dom";
import qs from "qs";
import "react-google-places-autocomplete/dist/index.min.css";
Geocode.setLanguage("en");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { location: "", searchTerm: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.userLocationHandler = this.userLocationHandler.bind(this);
  }
  handleChange(event) {
    let state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    let cont = true;
    if (!this.state.location) {
      this.props.notificationHandler("error", "", "Please Select a location");
      cont = false;
    }
    if (!this.state.searchTerm) {
      this.props.notificationHandler("error", "", "Please type a search term");
      cont = false;
    }
    if (cont) {
      //redirect to search component.
      this.props.notificationHandler("success", "", "Under construction");
      this.props.history.push({
        pathname: "/search",
        search: `?${qs.stringify({
          location: this.state.location,
          searchTerm: this.state.searchTerm,
        })}`,
      });
      console.log(this.state.location, this.state.searchTerm);
    }
    event.preventDefault();
  }

  handleLocationSelect(location) {
    let state = this.state;
    state.location = location.description;
    this.setState(state);
  }

  userLocationHandler() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            const address = response.results[6].formatted_address;
            let state = this.state;
            state.location = address;
            this.setState(state);
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
      <div>
        <Grid className="search-container" container spacing={1}>
          <Grid item xs={6} className="search-outer">
            <div className="search-middle">
              <TypoGraphy component="div" variant="h2">
                Be a local
              </TypoGraphy>
              <TypoGraphy component="div" variant="h2">
                With a local
              </TypoGraphy>
              <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <Paper component="div" className="search-bar-root">
                  <IconButton
                    onClick={this.userLocationHandler}
                    aria-label="search"
                  >
                    <MyLocationIcon />
                  </IconButton>
                  <div className="places-autocomplete-home">
                    <GooglePlacesAutocomplete
                      onSelect={this.handleLocationSelect}
                      renderInput={(props) => (
                        <div>
                          <TextField
                            id="filled-location"
                            label="Location"
                            name="location"
                            variant="filled"
                            {...props}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div className="search-input-container">
                    <TextField
                      id="filled-search"
                      className="search-input"
                      label="Search field"
                      type="search"
                      name="searchTerm"
                      onChange={this.handleChange}
                      variant="filled"
                      value={this.state.searchTerm}
                    />
                  </div>
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </form>
            </div>
          </Grid>
          <Grid item xs={6} className="search-side">
            <img src="https://source.unsplash.com/random" alt="image" />
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
