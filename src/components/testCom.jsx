import React from "react";
import { PaystackButton } from "react-paystack";

const config = {
  reference: new Date().getTime(),
  email: "user@example.com",
  amount: "1",
  currency: "ZAR",
  publicKey: "pk_test_6ad7daa084d40f22350038852006a020e49a4428",
};

function testCom() {
  // you can call this function anything
  const handlePaystackSuccessAction = (email) => {
    // Implementation for whatever you want to do with email and after success call.
    console.log("hello");
    console.log(email);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (email) => handlePaystackSuccessAction(email),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className="App">
      <PaystackButton {...componentProps} />
    </div>
  );
}

export default testCom;
