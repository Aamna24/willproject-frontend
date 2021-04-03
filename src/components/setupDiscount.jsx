import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../services/adminService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Login extends Form {
  state = {
    data: { type: "", fromNoQty: "", toNoQty: "", discountPercentage: "" },
    errors: {},
  };

  schema = {
    type: Joi.string().required().label("Type"),
    fromNoQty: Joi.string().required().label("From No Quantity"),
    toNoQty: Joi.string().required().label("To No Quantity"),
    discountPercentage: Joi.number().required().label("From No Quantity"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      const percentage = parseInt(data.discountPercentage);

      await auth.setupDiscount(
        data.type,
        data.fromNoQty,
        data.toNoQty,
        data.discountPercentage
      );
    } catch (ex) {
      if (ex.response && ex.respone.status === 404) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("An error occurred");
      }
    }
  };

  render() {
    return (
      <div
        className="col-xl-3 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4"
        style={{}}
      >
        <h1 style={{ marginBottom: "53px" }}>Setup Discount</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderDropDown(
            "type",
            "Type",
            "[Please Select One]",
            "Employee Voucher",
            "Will Ambassador"
          )}
          {this.renderInput("fromNoQty", "From No Quantity")}
          {this.renderInput("toNoQty", "To No Quantity")}
          {this.renderInput("discountPercentage", "Discount Percetage")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default Login;
