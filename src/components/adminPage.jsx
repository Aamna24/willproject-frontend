import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class AdminMainPage extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/register/orgaisationalUsers"
          >
            Create Organisation Users
          </Button>
        </div>
        <br />
        <div className="row">
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/admin/create-flyer"
          >
            Manage PDF Flyer
          </Button>
        </div>
        <br />
        <div className="row">
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/admin/balance-request"
          >
            Manage Will Ambassador Balance Request
          </Button>
        </div>
        <br />
        <div className="row">
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/admin/balance-request"
          >
            Manage B2B/Ambassador Account
          </Button>
        </div>

        <br />
        <div className="row">
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/admin/setup-discount"
          >
            Setup Discount
          </Button>
        </div>
      </div>
    );
  }
}

export default AdminMainPage;
