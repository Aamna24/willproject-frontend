import React from "react";
import { Button, Grid, Paper } from "@material-ui/core/";
import { Link } from "react-router-dom";

const InHome = () => {
  return (
    <div className="container">
      <h5>Hello User!</h5>

      <Grid item xs={12} className="mb-3">
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/products/willcreation"
        >
          Create Will
        </Button>
      </Grid>
      <Grid item xs={12} className="mb-3">
        <Button color="primary" variant="contained" component={Link} to="">
          Manage Profile
        </Button>
      </Grid>
      <Grid item xs={12} className="mb-3">
        <Button color="primary" variant="contained" component={Link} to="">
          Manage Will
        </Button>
      </Grid>
      <Grid item xs={12} className="mb-3">
        <Button color="primary" variant="contained" component={Link} to="">
          Create Codicil
        </Button>
      </Grid>

      <Grid item xs={12} className="mb-3">
        <Button color="primary" variant="contained" component={Link} to="">
          Register Will Document
        </Button>
      </Grid>
      <Grid item xs={12} className="mb-3">
        <Button color="primary" variant="contained" component={Link} to="">
          Setup Reminder
        </Button>
      </Grid>
    </div>
  );
};

export default InHome;
