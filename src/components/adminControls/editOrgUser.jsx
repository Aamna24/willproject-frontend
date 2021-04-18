import React from "react";
import Button from "@material-ui/core/Button";
import auth from "../../services/adminService";
import Form from "react-bootstrap/Form";

const EditOrgUser = () => {
  const querystring = window.location.search;
  const URLParams = new URLSearchParams(querystring);
  const profile_id = URLParams.get("profile");

  const [user, setUser] = React.useState();

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [selfie, setSelfie] = React.useState();
  const [phoneNo, setPhoneNo] = React.useState();
  const [add1, setAdd1] = React.useState();
  const [add2, setAdd2] = React.useState();
  const [town, setTown] = React.useState();
  const [country, setCountry] = React.useState();
  const [name, setName] = React.useState();
  const getData = () => {
    auth
      .getUsersList()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return user;
  };
  //getData();
  React.useEffect(getData, []);
  if (!user || user.length === 0) return <p></p>;

  const filter = user.data.filter((userf) => userf._id === profile_id);

  const handleUpdate = () => {
    var data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("add1", add1);
    data.append("add2", add2);
    data.append("phoneNo", phoneNo);
    data.append("town", town);
    data.append("country", country);
    console.log("data", town);
  };
  return (
    <div className="container">
      <h5 className="mb-5">Edit Profile</h5>
      <Form>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="name"
            class="form-control"
            name="name"
            defaultValue={filter[0].name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            value={filter[0].email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input
            type="password"
            class="form-control"
            name="password"
            value={filter[0].password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div class="custom-file">
          <label for="customFile">Selfie</label>
          <input type="file" name="selfie" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Town</label>
          <input
            type="text"
            class="form-control"
            name="text"
            value={filter[0].town}
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
            value={filter[0].add1}
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
            value={filter[0].add2}
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
            value={filter[0].phoneNo}
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
            value={filter[0].country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            className="mb-5"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditOrgUser;
