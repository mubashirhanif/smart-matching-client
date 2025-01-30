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
import Grid from "@material-ui/core/Grid";
import Geocode from "react-geocode";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { getTags } from "../../services/tags.service";
import axios from "axios";
import "./CreateService.css";

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
        baseImage: "",
        description: "",
        price: "",
        location: "",
        tags: [],
      },
      errors: {
        title: "",
        image: "",
        baseImage: "",
        description: "",
        price: "",
        location: "",
        tags: "",
      },
      tags: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createService = this.createService.bind(this);
    this.userLocationHandler = this.userLocationHandler.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
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
        state.fields.baseImage = reader.result;
        this.setState(state);
      };
      let image = event.target.files[0];
      state.fields.image = image;
      reader.readAsDataURL(image);
    } else {
      state.fields[name] = event.target.value;
    }
    this.setState(state);
  }

  handleSubmit(event) {
    let cont = true;
    let state = this.state;
    if (!state.fields.title) {
      cont = false;
      state.errors.title = "Please provide a title";
    }
    if (!state.fields.description) {
      cont = false;
      state.errors.description = "Please provide a description";
    }
    if (!state.fields.location) {
      cont = false;
      state.errors.location = "Please provide a location";
    }
    if (state.fields.tags == []) {
      cont = false;
      state.errors.tags = "Please provide some tags";
      this.props.notificationHandler("error", "Please provide some tags", "");
    }
    if (!state.fields.price && 0 >= state.fields.price) {
      cont = false;
      state.errors.price = "Please provide a valid price";
    }
    if (!state.fields.image) {
      cont = false;
      state.errors.image = "Please provide an Image";
      this.props.notificationHandler("error", "Image is required", "");
    }
    this.setState(state);
    if (cont) {
      let serviceFormData = new FormData();
      for (const [key, value] of Object.entries(this.state.fields)) {
        serviceFormData.append(key, value);
      }
      this.createService(serviceFormData);
    }
    event.preventDefault();
  }

  async createService(serviceFormData) {
    let response = {};
    try {
      response = await axios.post(
        `${this.props.url}/service/`,
        serviceFormData
      );
    } catch (e) {
      response = { ...e.response };
    } finally {
      console.log(response);
      if (response.status === 200) {
        this.props.notificationHandler(
          "success",
          "Service Created successfully",
          ""
        );
        this.props.history.push("/");
      } else {
        console.log(response);
        this.props.notificationHandler("error", "Something's not right", "");
      }
    }
  }
  render() {
    const { classes } = this.props;
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
                  !!this.state.fields.baseImage
                    ? this.state.fields.baseImage
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
                {!!this.state.fields.baseImage
                  ? "Replace Image"
                  : "Upload Image"}
              </Button>
              <Button
                size="large"
                color="primary"
                onClick={(e) => {
                  let s = this.state;
                  s.fields.image = "";
                  s.fields.baseImage = "";
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
              onChange={(event, value) => {
                this.handleChange({ target: { name: "tags", value: value } });
              }}
              defaultValue={this.state.fields.tags}
              freeSolo
              fullWidth
              autoSelect
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  error={!!this.state.errors.tags}
                  helperText={this.state.errors.tags}
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
            error={!!this.state.errors.title}
            helperText={this.state.errors.title}
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
            error={!!this.state.errors.description}
            helperText={this.state.errors.description}
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
                      error={!!this.state.errors.location}
                      helperText={this.state.errors.location}
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
                error={!!this.state.errors.price}
                helperText={this.state.errors.price}
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
