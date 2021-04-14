import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import * as auth from "../../services/adminService";
import { CButton, CDataTable } from "@coreui/react";

import "react-toastify/dist/ReactToastify.css";
toast.configure();
const SetupDiscount = () => {
  const [type, setType] = React.useState();
  const [fromNoQty, setfromNoQty] = React.useState(null);
  const [toNoQty, settoNoQty] = React.useState(null);
  const [discountPercentage, setDisPercentage] = React.useState();
  const [commissionPercentage, setComPercentage] = React.useState();
  const [showFields, setShowField] = React.useState();

  const [discounts, setDis] = React.useState();
  const getData = () => {
    auth
      .getDiscounts()
      .then((res) => {
        setDis(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(discounts);
    return discounts;
  };
  //getData();
  React.useEffect(getData, []);
  if (!discounts || discounts.length === 0) return <p>Cannot find any posts</p>;
  //converting post data into array
  const arr = [];
  const obj = Object.entries(discounts);
  obj.forEach(([key, value]) => arr.push(value));

  console.log("arr", arr);
  const fields = [
    { key: "type", label: "Type" },
    { key: "fromNoQty", label: "From No Qty" },
    { key: "toNoQty", label: "To No Qty" },
    { key: "discountPercentage", label: "Discount %" },
    { key: "commissionPercentage", label: "Commission %" },
  ];

  const handleSubmit = async () => {
    console.log(
      type,
      fromNoQty,
      toNoQty,
      discountPercentage,
      commissionPercentage
    );
    const response = await auth.setupDiscount(
      type,
      fromNoQty,
      toNoQty,
      discountPercentage,
      commissionPercentage
    );
    if (response.status === 200) {
      toast.success("Discount Setup Successfully");
    }
  };
  const handleChange = (e) => {
    if (e.target.value === "Yes") {
      setShowField(e.target.value);
      setType("Employee Voucher");
    } else {
      setShowField(null);
      setType(e.target.value);
    }

    console.log("show", showFields);
  };

  return (
    <div className="container">
      <h4>Setup Discount</h4>
      <div className="row">
        <div className="col-md-6">
          <label>Type</label>
        </div>
        <div classname="col">
          <select onChange={handleChange}>
            <option>Please Select One</option>
            <option value="Yes">Employee Voucher</option>
            <option value="Will Ambassador">Will Ambassador</option>
            <option value="Will Ambassador B2B Discount">
              Will Ambassador B2B Discount
            </option>
            <option value="Organisation User B2B Discount">
              Organisation User B2B Discount
            </option>
          </select>
        </div>
      </div>
      <br />
      {showFields && (
        <div>
          <div className="row">
            <div className="col-md-6">
              <label>From No Quantity</label>
            </div>

            <input
              name="fromNoQty"
              onChange={(e) => {
                setfromNoQty(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="row">
            <div className="col-md-6">
              <label>To No Quantity</label>
            </div>

            <input
              name="fromNoQty"
              onChange={(e) => {
                settoNoQty(e.target.value);
              }}
            />
          </div>
        </div>
      )}
      <br />

      <div>
        <div className="row">
          <div className="col-md-6">
            <label>Discount Percentage</label>
          </div>
          <input
            type="number"
            onChange={(e) => {
              setDisPercentage(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            <label>Commission Percentage</label>
          </div>
          <input
            type="number"
            onChange={(e) => {
              setComPercentage(e.target.value);
            }}
          />
        </div>

        <br />

        <Button
          className="mb-4"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Setup Discount
        </Button>
      </div>

      <br />
      <h4>Already Setup Discounts</h4>
      <CDataTable
        items={arr[1]}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
      />
    </div>
  );
};

export default SetupDiscount;
