import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const B2BHome = () => {
  return (
    <>
      <div className="row mb-5 ml-5">
        <Button
          component={Link}
          to="/voucherlisting"
          variant="contained"
          color="primary"
        >
          Generate Employee Voucher
        </Button>
      </div>
      <div className="row mb-5 ml-5">
        <Button
          component={Link}
          to="/transactionlist"
          variant="contained"
          color="primary"
        >
          View Transaction List
        </Button>
      </div>
    </>
  );
};

export default B2BHome;
