import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";

const WillCreationForm = ({ history }) => {
  const [condition1, setCondition1] = useState();

  const [condition2, setCondition2] = useState();

  const [condition3, setCondition3] = useState();
  const [makingFor, setMakingFor] = useState();
  const [validated, setValidated] = useState(false);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      if (makingFor === "Yes") {
        window.location = "/making-for";
      } else {
        window.location = "/willcreation/personal";
      }
    }

    setValidated(true);
  };

  return (
    <FormContainer>
      <h3>Step1</h3>

      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Form.Group controlId="conditions">
          <Form.Label>
            In order for the will to be legally binding, the conditions below
            must be met. Confirm the following
          </Form.Label>
          <Form.Check
            value={condition1}
            onChange={(e) => setCondition1(e.target.value)}
            required
            label="Above 18"
            feedback="You must agree before submitting."
          />
          <Form.Check
            value={condition2}
            onChange={(e) => setCondition2(e.target.value)}
            required
            label="Of Sound Mind"
            feedback="You must agree before submitting."
          />
          <Form.Check
            value={condition3}
            onChange={(e) => setCondition3(e.target.value)}
            required
            label="Making the will voluntarily"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Are you making for someone else?</Form.Label>
          <Form.Control
            as="select"
            required
            value={makingFor}
            onChange={(e) => setMakingFor(e.target.value)}
          >
            <option selected disabled value="">
              [Please select one]
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please fill the required field.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary">
          Save Progress & Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default WillCreationForm;
