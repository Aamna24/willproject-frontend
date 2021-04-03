import React from "react";

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
      <div className="row">
        <label>Do you have reg no?</label>
        <select onChange={handleChange}>
          <option>Please Select One</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <br />
      {showFields && (
        <div className="row">
          <label>Will Registeration Number</label>
          <input name="registerationNo" />
        </div>
      )}

      {!showFields && (
        <div>
          <div className="row">
            <label>Name of Will Owner</label>
            <input />
          </div>
          <div className="row">
            <label>Phone of Will Owner</label>
            <input />
          </div>
          <div className="row">
            <label>DOB of Will Owner</label>
            <input />
          </div>
        </div>
      )}

      <div className="row">
        <label>Relationship with Will Owner</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Reasons for Search</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requestor Title</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requester First Name</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requestor Middle Name</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requestor Last Name</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requester Address</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requeter Email</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requestor Phone Number</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requestor Address Line 1</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requester Address Line 2</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requester Town</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requester Country</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requester Post Code</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Promotion Code</label>
        <input />
      </div>
      <br />
      <div className="row">
        <label>Requester Selfie Image</label>
        <input type="file" />
      </div>
      <br />
    </div>
  );
};

export default SearchForm;
