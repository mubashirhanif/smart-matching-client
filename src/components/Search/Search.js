import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import "./Search.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import TypoGraphy from "@material-ui/core/Typography";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Geocode from "react-geocode";
import qs from "qs";
import "react-google-places-autocomplete/dist/index.min.css";
// import SearchIcon from '@material-ui/icons/Search';
Geocode.setLanguage("en");

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
  }
  render() {
    return (
      <div className="container">
        {this.state.location}, {this.state.searchTerm}
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
