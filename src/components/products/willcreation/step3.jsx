import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Step2 = ({ setForm, formData, navigation, user }) => {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { name: "", dob: "", address: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };
  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };
  const handleAddFields = () => {
    setInputFields([...inputFields, { name: "", dob: "", add: "" }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const { next, previous } = navigation;
  return (
    <div>
      <h4 className="text-center mb-4">Wives</h4>
      <div className=" ">
        <div className="container col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto  p-4 ">
          <Container>
            <form className={classes.root} onSubmit={handleSubmit}>
              {inputFields.map((inputField) => (
                <div key={inputField.id}>
                  <TextField
                    name="name"
                    label="First Name"
                    variant="filled"
                    value={inputField.name}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <TextField
                    name="dob"
                    label="Last Name"
                    variant="filled"
                    value={inputField.dob}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <TextField
                    name="address"
                    label="Last Name"
                    variant="filled"
                    value={inputField.dob}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <IconButton
                    disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>
                </div>
              ))}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
                //endIcon={<Icon>send</Icon>}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </form>
          </Container>
          <Button variant="contained" color="primary" onClick={previous}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={next}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
