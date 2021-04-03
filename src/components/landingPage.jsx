import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/searchform"
        >
          Basic Search
        </Button>
      </div>
    );
  }
}

export default LandingPage;
