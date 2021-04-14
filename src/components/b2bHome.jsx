import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const B2BHome = () => {
  return (
    <div className="row">
      <Button
        component={Link}
        to="/voucherlisting"
        variant="contained"
        color="primary"
      >
        Generate Employee Voucher
      </Button>
    </div>
  );
};

export default B2BHome;
