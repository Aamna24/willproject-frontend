import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as auth from "../services/authService";
class LandingPage extends Component {
  state = {};
  render() {
    const user = auth.getCurrentUser();

    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <div>
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/test"
          >
            Basic Search
          </Button>
        </div>
        <br />
        <div>
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/form"
          >
            Basic Will Registeration
          </Button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
