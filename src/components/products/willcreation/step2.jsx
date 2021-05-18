import React from "react";
import Button from "@material-ui/core/Button";
import ItemForm from "./ItemForm";
const Step2 = ({ setForm, formData, navigation, user }) => {
  //const {} = formData;
  const { previous, next } = navigation;
  return (
    <div>
      <h4 className="text-center mb-4">Personal Details</h4>
      <div className="col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 ">
        <ItemForm label="" name="" onChange={setForm} type="text" />
      </div>
      <div className="col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4">
        <ItemForm label="First Name" name="" onChange={setForm} type="text" />
        <ItemForm label="Middle Name" name="" onChange={setForm} type="text" />
        <ItemForm label="Last Name" name="" onChange={setForm} type="text" />
      </div>
      <div className="col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4">
        <ItemForm label="Address" name="" onChange={setForm} type="text" />
        <ItemForm label="Town" name="" onChange={setForm} type="text" />
        <ItemForm label="Country" name="" onChange={setForm} type="text" />
      </div>
      <div className="col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4">
        <ItemForm label="Phone Number" name="" onChange={setForm} type="text" />
        <ItemForm label="Email" name="" onChange={setForm} type="text" />
        <ItemForm label="Gender" name="" onChange={setForm} type="text" />
        <ItemForm
          label="Marital Status"
          name=""
          onChange={setForm}
          type="text"
        />
      </div>
      <div className="container col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto  p-4 ">
        <Button
          className="m-3"
          variant="contained"
          color="primary"
          onClick={previous}
        >
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={next}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step2;
