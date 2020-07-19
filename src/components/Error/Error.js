import React, { Component } from "react";
import TypoGraphy from "@material-ui/core/Typography";
import "./Error.css";
import image_404 from "./404-logo.png";

class Error extends Component {
  render() {
    return (
      <div className="error">
        <TypoGraphy component="div" variant="h1">
            ERROR #404
        </TypoGraphy>
        <div>
          <img src={image_404} alt="image" className="image-404" />
        </div>
      </div>
    );
  }
}

export default Error;
