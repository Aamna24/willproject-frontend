import React from "react";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import Button from "@material-ui/core/Button";
const Review = ({ setForm, formData, navigation }) => {
  const { go } = navigation;
  const {
    requesterTitle,
    requesterFname,
    requesterMname,
    requesterLname,
    requesterAdd,
    requesterEmail,
    requesterPhNo,
    requesterAddLine1,
    requesterAddLine2,
    requesterTown,
    requesterCountry,
    requesterPostCode,
    promotionCode,
    willOwnerTitle,
    willOwnerFname,
    willOwnerSurname,
    willOwnerEmail,
    willOwnerMname,
    willOwnerDob,
    willOwnerGender,
    willOwnerAddLine1,
    willOwnerAddLine2,
    willOwnerCity,
    willOwnerCountry,
    willOwnerUK,
    willOwnerPostcode,
    willOwnerPhNo,
    dateOfWill,
    storedWillAdd,
    additionalIns,
    willReminderFr,
  } = formData;
  return (
    <div className="col-xl-8 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-4">
      <h3>Review your data</h3>
      <div>
        Requster Title: {`${requesterTitle}`},
        <br />
        Requester First Name: {`${requesterFname}`},
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          // formData["requesterSelfie"] = img;
          console.log(formData);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Review;
