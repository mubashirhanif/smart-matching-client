import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const useStyles = {
  root: {
    width: 250,
    height: 300,
  },
  media: {
    height: 140,
  },
};

class ServiceItem extends Component {
  render() {
    const { classes, serviceItem } = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={serviceItem.image}
            title={serviceItem.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {serviceItem.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {serviceItem.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography gutterBottom variant="body2" component="p">
            EUR: {serviceItem.price}
          </Typography>
        </CardActions>
      </Card>
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
)(withStyles(useStyles)(ServiceItem));
