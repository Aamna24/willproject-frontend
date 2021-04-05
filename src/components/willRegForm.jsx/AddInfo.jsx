import React from "react";
import Button from "@material-ui/core/button";
import ItemForm from "./ItemForm";
import * as auth from "../../services/authService";
import { toast } from "react-toastify";
const Contact = ({ setForm, formData, navigation, user }) => {
  const { dateOfWill, storedWillAdd, additionalIns, willReminderFr } = formData;

  const { previous, next } = navigation;
  const [requesterSelfie, setSelfie] = React.useState();

  const handleSubmit = async () => {
    var form_data = new FormData();
    form_data.append("requesterTitle", formData.requesterTitle);
    form_data.append("requesterFname", formData.requesterFname);
    form_data.append("requesterMname", formData.requesterFname);
    form_data.append("requesterLname", formData.requesterFname);
    form_data.append("requesterAdd", formData.requesterAdd);
    form_data.append("requesterEmail", formData.requesterEmail);
    form_data.append("requesterPhNo", formData.requesterPhNo);
    form_data.append("requesterAddLine1", formData.requesterAddLine1);
    form_data.append("requeterAddLine2", formData.requesterAddLine2);
    form_data.append("requesterTown", formData.requesterTown);
    form_data.append("requesterCountry", formData.requesterCountry);
    form_data.append("requesterPostCode", formData.requesterPostCode);
    form_data.append("promotionCode", formData.promotionCode);
    form_data.append("requesterSelfie", formData.requesterSelfie);
    form_data.append("willOwnerTitle", formData.willOwnerTitle);
    form_data.append("willOwnerFname", formData.willOwnerFname);
    form_data.append("willOwnerMname", formData.willOwnerMname);
    form_data.append("willOwnerSurname", formData.willOwnerSurname);
    form_data.append("willOwnerEmail", formData.willOwnerEmail);
    form_data.append("willOwnerDob", formData.willOwnerDob);
    form_data.append("willOwnerGender", formData.willOwnerGender);
    form_data.append("willOwnerAddLine1", formData.willOwnerAddLine1);
    form_data.append("willOwnerAddLine2", formData.willOwnerAddLine2);
    form_data.append("willOwnerCity", formData.willOwnerCity);
    form_data.append("willOwnerCountry", formData.willOwnerCountry);
    form_data.append("willOwnerUK", formData.willOwnerUK);
    form_data.append("willOwnerPhNo", formData.willOwnerPhNo);
    form_data.append("willOwnerPostcode", formData.willOwnerPostcode);
    form_data.append("storedWillAdd", formData.storedWillAdd);
    form_data.append("additionalIns", formData.additionalIns);
    form_data.append("executorName", "");
    form_data.append("executorEmailAdd", "");
    form_data.append("executorPhoneNo", "");
    form_data.append("executorAddLine1", "");
    form_data.append("executorAddLine2", "");
    form_data.append("executorCity", "");
    form_data.append("executorCountry", "");
    form_data.append("willReminderFr", "");
    form_data.append("lastRemDate", "");
    form_data.append("nextRemDate", "");
    form_data.append("createdWillPDF", "");
    form_data.append("discountCode", "");
    form_data.append("discountAmount", "");

    const response = await auth.registerBasicWill(form_data, user.id);
    if (response.status === 201) {
      toast.success("Will Created");
    }
  };
  return (
    <div className="col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-4">
      <h3>Additional Information </h3>

      <ItemForm
        label="Address where will is stored"
        name="storedWillAdd"
        value={storedWillAdd}
        onChange={setForm}
      />
      <ItemForm
        label="Additional Instructions"
        name="additionalIns"
        value={additionalIns}
        onChange={setForm}
        type="textarea"
      />

      <div className="row">
        <div className="col-md-6">
          <label>Requester Selfie</label>
        </div>
        <div classname="col">
          <input
            type="file"
            name="requesterSelfie"
            onChange={(e) => {
              setSelfie(e.target.files[0]);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              formData["requesterSelfie"] = requesterSelfie;
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div>
        <Button
          className="m-3"
          variant="contained"
          color="primary"
          onClick={previous}
        >
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Contact;
