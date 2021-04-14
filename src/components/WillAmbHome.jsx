import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const WillAHomePage = ({ user }) => {
  if (!user || user.length == 0) return <p></p>;
  return (
    <div className="container">
      <h6 className="text-right">Promotion Code to be used: {user.code}</h6>
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
};

export default WillAHomePage;
