import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import Geocode from "react-geocode";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "./CreateService.css";
import { Grid } from "@material-ui/core";
import { getTags } from "../../services/tags.service";

const useStyles = {
  root: {
    marginTop: 150,
  },
  imageCard: {
    width: 300,
  },
  description: {
    marginTop: 10,
  },
  submit: {
    marginTop: 10,
  },
  media: {
    height: 140,
  },
};

class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        title: "",
        image: "",
        description: "",
        price: "",
        location: "",
        tags: [],
      },
      errors: {
        title: "",
        image: "",
        description: "",
        price: "",
        location: "",
        tags: "",
      },
      tags: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userLocationHandler = this.userLocationHandler.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
  }

  componentDidMount() {
    getTags(`${this.props.url}/tag/`, (res, err) => {
      if(err) {
        this.props.notificationHandler("error", "Server Error", "Something went wrong!");
        console.error(err);
      }
      else {
        let state = this.state;
        state.tags = res;
        this.setState(state);
      }
    });
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

  handleChange(event, newValue) {
    let state = this.state;
    let name = event.target.name;
    if ("image" === name) {
      let reader = new FileReader();
      reader.onload = () => {
        state.fields.image = reader.result;
        this.setState(state);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      state.fields[name] = newValue;
    }
    this.setState(state);
  }

  handleSubmit() {
    console.log(this.state.fields);
  }
  render() {
    const { classes, serviceItem } = this.props;
    return (
      <Grid
        component="form"
        onSubmit={this.handleSubmit}
        className={classes.root}
        container
        spacing={1}
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <Card className={classes.imageCard}>
            <CardActionArea>
              <CardMedia
                component="img"
                className={classes.media}
                src={
                  !!this.state.fields.image
                    ? this.state.fields.image
                    : "https://via.placeholder.com/150"
                }
              />
            </CardActionArea>
            <CardActions>
              <input
                accept="image/*"
                type="file"
                name="image"
                ref={"image-input"}
                onChange={this.handleChange}
                style={{ display: "none" }}
                id="icon-button-file"
              />
              <Button
                size="large"
                color="primary"
                onClick={(e) => {
                  this.refs["image-input"].click();
                }}
              >
                {!!this.state.fields.image ? "Replace Image" : "Upload Image"}
              </Button>
              <Button
                size="large"
                color="primary"
                onClick={(e) => {
                  let s = this.state;
                  s.fields.image = "";
                  this.setState(s);
                }}
              >
                Clear Image
              </Button>
            </CardActions>
            <Autocomplete
              multiple
              id="tags-filled"
              options={
                //Get all the tags from the website.
                this.state.tags
              }
              name="tags"
              onChange={this.handleChange}
              defaultValue={this.state.fields.tags}
              freeSolo
              fullWidth
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="tags"
                  onChange={this.handleChange}
                  label="Tags"
                  value={this.state.fields.tags}
                  variant="filled"
                  placeholder="Space Seperated tags"
                />
              )}
            />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id="service-title"
            label="Title"
            type="text"
            name="title"
            onChange={this.handleChange}
          />
          <TextField
            fullWidth
            multiline
            name="description"
            label="Description"
            InputProps={{
              rows: 4,
            }}
            className={classes.description}
            onChange={this.handleChange}
          />
          <Grid container>
            <Grid item xs={6}>
              <div className="create-place-autocomplete">
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="price"
                label="Price(EUR)"
                type="number"
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Service
          </Button>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
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
)(withStyles(useStyles)(CreateService));
