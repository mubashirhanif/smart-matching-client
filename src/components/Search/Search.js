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

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ServiceItem from "./ServiceItem/ServiceItem";
import Geocode from "react-geocode";
import qs from "qs";
import "react-google-places-autocomplete/dist/index.min.css";
import "./Search.css";
// import SearchIcon from '@material-ui/icons/Search';
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
});
class Search extends Component {
  constructor(props) {
    super(props);
    let tags = [
      {
        id: "1",
        name: "test1",
      },
      {
        id: "2",
        name: "test2",
      },
      {
        id: "3",
        name: "test3",
      },
      {
        id: "4",
        name: "test4",
      },
    ];

    this.state = {
      tags: tags,
      priceRange: [10, 100],
      query: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }),
      serviceItems: [
        {
          imageLink: "https://source.unsplash.com/random",
          title: "Title 1",
          description: "Some Long Description 1 ..... ",
          id: "somehash1",
        },
        {
          imageLink: "https://source.unsplash.com/random",
          title: "Title 2",
          description: "Some Long Description 2 ..... ",
          id: "somehash2",
        },
        {
          imageLink: "https://source.unsplash.com/random",
          title: "Title 3",
          description: "Some Long Description 3 ..... ",
          id: "somehash3",
        },
        {
          imageLink: "https://source.unsplash.com/random",
          title: "Title 3",
          description: "Some Long Description 3 ..... ",
          id: "somehash3",
        },
        {
          imageLink: "https://source.unsplash.com/random",
          title: "Title 3",
          description: "Some Long Description 3 ..... ",
          id: "somehash3",
        },
        {
          imageLink: "https://source.unsplash.com/random",
          title: "Title 3",
          description: "Some Long Description 3 ..... ",
          id: "somehash3",
        },
      ],
    };
  }

  render() {
    const { classes } = this.props;
    const serviceItems = [];
    for (const item of this.state.serviceItems) {
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
                  <GooglePlacesAutocomplete
                    onSelect={this.handleLocationSelect}
                    initialValue={this.state.query.location}
                    renderInput={(props) => (
                      <TextField
                          id="filled-location"
                          label="Location"
                          name="location"
                          variant="filled"
                          {...props}
                      />
                    )}
                  />
                </div>
              </ListItem>
              <ListItem>
                <TextField
                  id="filled-search"
                  label="Search field"
                  type="search"
                  name="searchTerm"
                  onChange={this.handleChange}
                  variant="filled"
                  value={this.state.query.searchTerm}
                />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  className="tag-input"
                  options={this.state.tags}
                  getOptionLabel={(option) => option.name}
                  defaultValue={[]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
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
                    value={this.state.priceRange}
                    onChange={this.handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="price-range-slider"
                  />
                </div>
              </ListItem>
            </List>
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
