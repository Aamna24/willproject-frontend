import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const response = await auth.login(data.username, data.password);
      console.log("res", response);
      if (response.data[0].type === "individualUser") {
        window.location.href = "/individualuser/home";
      } else if (response.data[0].type === "willAmbassdor") {
        window.location.href = "/will-ambassador/home";
      } else if (response.data[0].type === "organisationUser") {
        window.location.href = "/orguserhome";
      }

      toast.success("Successful Login");
      return response;
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
        <h1 style={{ marginBottom: "53px" }}>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
