import React from "react";
import Button from "@material-ui/core/Button";
import auth from "../services/adminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
toast.configure();

const FlyerForm = () => {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [image, setImg] = React.useState();

  const handleSubmit = async () => {
    console.log(image);
    var data = new FormData();
    data.append("img", image);
    data.append("name", name);
    data.append("description", description);

    const response = await auth.uploadFlyer(data);
    toast.success("Flyer uploaded successfully");
  };

  return (
    <div className="container col-md-6">
      <Form>
        <div class="form-group">
          <label for="exampleInputEmail1">Flyer Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div class="custom-file">
          <label for="customFile">Flyer Image</label>
          <input
            type="file"
            name="img"
            onChange={(e) => {
              setImg(e.target.files[0]);
              console.log(image);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Flyer Description</label>
          <textarea
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Upload Flyer
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FlyerForm;
