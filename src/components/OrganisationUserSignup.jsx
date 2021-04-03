import React from "react";
import Button from "@material-ui/core/Button";
import auth from "../services/authService";
import Form from "react-bootstrap/Form";

const RegOrgUser = () => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [selfie, setSelfie] = React.useState();
  const [phoneNo, setPhoneNo] = React.useState();
  const [add1, setAdd1] = React.useState();
  const [add2, setAdd2] = React.useState();
  const [town, setTown] = React.useState();
  const [country, setCountry] = React.useState();

  const handleSubmit = async () => {
    console.log(selfie);
    var data = new FormData();

    data.append("email", email);
    data.append("password", password);
    data.append("selfie", selfie);
    data.append("add1", add1);
    data.append("add2", add2);
    data.append("phoneNo", phoneNo);
    data.append("town", town);
    data.append("country", country);

    const response = await auth.registerOrgUser(data);
    console.log(response);
  };

  return (
    <div className="container col-md-6">
      <Form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Password</label>
          <textarea
            type="password"
            class="form-control"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div class="custom-file">
          <label for="customFile">Selfie</label>
          <input
            type="file"
            name="selfie"
            onChange={(e) => {
              setSelfie(e.target.files[0]);
              console.log(selfie);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Town</label>
          <input
            type="text"
            class="form-control"
            name="text"
            onChange={(e) => {
              setTown(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">AddressLine 1</label>
          <input
            type="text"
            class="form-control"
            name="add1"
            onChange={(e) => {
              setAdd1(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Address Line 2</label>
          <input
            type="text"
            class="form-control"
            name="add2"
            onChange={(e) => {
              setAdd2(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Phone Number</label>
          <input
            type="number"
            class="form-control"
            name="phoneNo"
            onChange={(e) => {
              setPhoneNo(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Country</label>
          <input
            type="text"
            class="form-control"
            name="country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </div>

        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegOrgUser;