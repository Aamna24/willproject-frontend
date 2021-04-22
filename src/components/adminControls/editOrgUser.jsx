import React from "react";
import Button from "@material-ui/core/Button";
import auth from "../../services/adminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
toast.configure();
const EditOrgUser = () => {
  const querystring = window.location.search;
  const URLParams = new URLSearchParams(querystring);
  const profile_id = URLParams.get("profile");

  const [user, setUser] = React.useState();

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [selfie, setSelfie] = React.useState(null);
  const [phoneNo, setPhoneNo] = React.useState(null);
  const [add1, setAdd1] = React.useState(null);
  const [add2, setAdd2] = React.useState(null);
  const [town, setTown] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [name, setName] = React.useState(null);
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

  const handleUpdate = async () => {
    const data = new FormData();
    if (name === null) {
      setName(filter[0].name);
    }
    if (email == null) {
      setEmail(filter[0].email);
    }
    if (password === null) {
      setPassword(filter[0].password);
    }
    if (country === null) {
      setCountry(filter[0].country);
    }
    if (town === null) {
      setTown(filter[0].town);
    }
    if (add1 === null) {
      setAdd1(filter[0].add1);
    }
    if (add2 === null) {
      setAdd2(filter[0].add2);
    }
    if (phoneNo === null) {
      setPhoneNo(filter[0].phoneNo);
    }

    const id = profile_id;

    // console.log(d);
    const response = await auth.updateProfile(
      id,
      name,
      email,
      password,
      town,
      country,
      add1,
      add2,
      phoneNo
    );
    if (response.status === 200) {
      toast.success("Profile Updated");
    }
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
            defaultValue={filter[0].email}
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
            defaultValue={filter[0].password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Town</label>
          <input
            type="text"
            class="form-control"
            name="text"
            defaultValue={filter[0].town}
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
            defaultValue={filter[0].add1}
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
            defaultValue={filter[0].add2}
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
            defaultValue={filter[0].phoneNo}
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
            defaultValue={filter[0].country}
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
