import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const InHome = () => {
  return (
    <div className="container">
      <h5>Hello User!</h5>
      <div className="row">
        <Button color="primary" variant="contained" component={Link} to="">
          Create Will
        </Button>
      </div>
    </div>
  );
};

export default InHome;
