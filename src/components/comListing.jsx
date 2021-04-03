import React, { Component } from "react";

const CommissionListing = () => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Sales No</th>
            <th>Product Name</th>
            <th>Individual Name</th>
            <th>Commission Earned</th>
            <th>Commission Balance</th>
            <th>Commission Status</th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default CommissionListing;
