import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TypoGraphy from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ServiceItem from "./ServiceItem/ServiceItem";
import Geocode from "react-geocode";
import { getTags } from "../../services/tags.service";
import { searchServices } from "../../services/services.service";
import qs from "qs";
import "react-google-places-autocomplete/dist/index.min.css";
import "./Search.css";
import { Button } from "@material-ui/core";

Geocode.setLanguage("en");

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
  submit: {
    marginTop: 10,
  },
});
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceItems: [],
      fields: {
        location: "",
        searchTerm: "",
        tags: [],
        priceRange: [0, 1000],
      },
      tags: [],
    };
    this.state.fields = {
      ...this.state.fields,
      ...qs.parse(this.props.location.search, { ignoreQueryPrefix: true }),
    };
    this.userLocationHandler = this.userLocationHandler.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchServices = this.fetchServices.bind(this);
    this.filteredSearch = this.filteredSearch.bind(this);
  }

  componentDidMount() {
    getTags(`${this.props.url}/tag/`, (res, err) => {
      if (err) {
        this.props.notificationHandler(
          "error",
          "Server Error",
          "Something went wrong!"
        );
        console.error(err);
      } else {
        let state = this.state;
        state.tags = res;
        this.setState(state);
      }
    });
    this.fetchServices(this.state.fields);
  }

  filteredSearch(serviceItems) {
    return serviceItems;
  }

  fetchServices(filterObject) {
    let _filterObject = filterObject;
    _filterObject.tags = filterObject.tags.map((tag)=>tag.toLowerCase());

    searchServices(`${this.props.url}/service`, _filterObject, (res, err) => {
      if (err) {
        this.props.notificationHandler("error", "Something went wrong!");
        console.error(err);
      } else {
        let state = this.state;
        state.serviceItems = res;
        this.setState(state);
      }
    });
  }

  handleChange(event) {
    let state = this.state;
    state.fields[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleLocationSelect(location) {
    let state = this.state;
    state.fields.location = location.description;
    this.setState(state);
  }

  userLocationHandler() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            const address = response.results[6].formatted_address;
            let state = this.state;
            state.fields.location = address;
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
    const { classes } = this.props;
    const serviceItems = [];
    for (const item of this.filteredSearch(this.state.serviceItems)) {
      serviceItems.push(
        <Grid item>
          <ServiceItem key={item.id} serviceItem={{ ...item }} />
        </Grid>
      );
    }
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
                <div className="places-autocomplete">
                  <IconButton
                    onClick={this.userLocationHandler}
                    aria-label="search"
                  >
                    <MyLocationIcon />
                  </IconButton>
                  <GooglePlacesAutocomplete
                    onSelect={this.handleLocationSelect}
                    initialValue={this.state.fields.location}
                    renderInput={(props) => (
                      <TextField
                        fullWidth
                        id="filled-location"
                        label="Location"
                        name="location"
                        {...props}
                      />
                    )}
                  />
                </div>
              </ListItem>
              <ListItem>
                <TextField
                  fullWidth
                  id="filled-search"
                  label="Search field"
                  type="search"
                  name="searchTerm"
                  onChange={this.handleChange}
                  value={this.state.fields.searchTerm}
                />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <Autocomplete
                  multiple
                  fullWidth
                  name="tags"
                  id="tags-outlined"
                  options={this.state.tags}
                  onChange={(event, value) => {
                    this.handleChange({
                      target: { name: "tags", value: value },
                    });
                  }}
                  defaultValue={this.state.fields.tags}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Tags"
                      placeholder="Tags"
                    />
                  )}
                />
              </ListItem>
              <ListItem>
                <div className="price-input">
                  <TypoGraphy id="price-range-slider" gutterBottom>
                    Price range
                  </TypoGraphy>
                  <Slider
                    name="priceRange"
                    value={this.state.fields.priceRange}
                    onChange={(event, value) => {
                      this.handleChange({
                        target: { name: "priceRange", value: value },
                      });
                    }}
                    valueLabelDisplay="auto"
                    aria-labelledby="price-range-slider"
                  />
                </div>
              </ListItem>
            </List>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => this.fetchServices(this.state.fields)}
            >
              Update Search
            </Button>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Grid container spacing={10}>
            {serviceItems}
          </Grid>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    notificationHandler: state.notificationHandler,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { theme: true })(Search));
