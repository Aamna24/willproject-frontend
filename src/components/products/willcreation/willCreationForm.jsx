import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
const steps = [
  { id: "step1" },
  { id: "step2" },
  { id: "step3" },
  { id: "step4" },
  { id: "step5" },
  { id: "step6" },
  { id: "step7" },
  { id: "step8" },
];

const defaultData = {
  prefix: "",
};
const WillCreationForm = ({ user }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;
  const props = { formData, setForm, navigation };

  switch (id) {
    case "step1":
      return <Step1 {...props} />;
    case "step2":
      return <Step2 {...props} />;
    case "step3":
      return <Step3 {...props} />;

    default:
      return null;
  }
};

export default WillCreationForm;
