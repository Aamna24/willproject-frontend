import React from "react";
import Button from "@material-ui/core/Button";
const SearchForm = () => {
  const [regNo, setRegNo] = React.useState();

  const [showFields, setShowField] = React.useState(null);
  const handleChange = (e) => {
    if (e.target.value === "Yes") {
      setShowField(e.target.value);
    } else {
      setShowField(null);
    }

    console.log("show", showFields);
  };
  return (
    <div className="container">
      <h4>Basic Search Form</h4>
      <div className="row">
        <div className="col-md-6">
          <label>Do you have reg no?</label>
        </div>
        <div classname="col">
          <select onChange={handleChange}>
            <option>Please Select One</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <br />
      {showFields && (
        <div className="row">
          <div className="col-md-6">
            <label>Will Registeration Number</label>
          </div>

          <input name="registerationNo" />
        </div>
      )}
      <br />
      {!showFields && (
        <div>
          <div className="row">
            <div className="col-md-6">
              <label>Name of Will Owner</label>
            </div>
            <input />
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Phone of Will Owner</label>
            </div>
            <input />
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>DOB of Will Owner</label>
            </div>
            <input />
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <label>Relationship with Will Owner</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Reasons for Search</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Title</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester First Name</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Middle Name</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Last Name</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Address</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Email</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Phone Number</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Address Line 1</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Address Line 2</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Town</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Country</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requester Post Code</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Promotion Code</label>
        </div>
        <input />
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Requster Selfie Image</label>
        </div>
        <input type="file" />
      </div>
      <br />

      <Button className="mb-4" variant="contained" color="primary">
        Search
      </Button>
    </div>
  );
};

export default SearchForm;
