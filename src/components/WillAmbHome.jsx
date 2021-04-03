import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
class WillAHomePage extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <Button
            component={Link}
            to="/will-ambassador/flyer-listing"
            variant="contained"
            color="primary"
          >
            Download Flyer
          </Button>
        </div>
        <br />
        <div className="row">
          <Button
            component={Link}
            to="/commission-listing"
            variant="contained"
            color="primary"
          >
            Generate Balance
          </Button>
        </div>
      </div>
    );
  }
}

export default WillAHomePage;
