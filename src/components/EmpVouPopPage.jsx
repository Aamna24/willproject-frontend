import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import * as auth from "../services/adminService";
import * as autherize from "../services/authService";
import { toast } from "react-toastify";
import { PaystackButton } from "react-paystack";

toast.configure();

const EmployeeVoucherPopPage = () => {
  const [quantity, setQuantity] = React.useState();
  const [amount, setAmount] = React.useState(null);
  const [discount, setDiscount] = React.useState();
  const [actualPrice, setActualPrice] = React.useState();
  const [products, setProducts] = React.useState();

  const getData = () => {
    auth
      .getDiscounts()
      .then((res) => {
        setDiscount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(discount);
    return discount;
  };
  //getData();
  React.useEffect(getData, []);

  //get products
  const getProducts = () => {
    autherize
      .getProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(products);
    return products;
  };
  //getData();
  React.useEffect(getProducts, []);
  if (!discount || discount.length === 0) return <p>Cannot find any posts</p>;
  if (!products || products.length === 0) return <p>Cannot find any posts</p>;

  // implementing discount of employee coucher/ b2b
  const filter = discount.data.filter((x) => x.type === "Employee Voucher");
  const filteredProduct = products.data.filter(
    (x) => x.name === "Will Creation"
  );

  const calAmount = () => {
    const fromNo = filter[0].fromNoQty;
    const toNo = filter[0].toNoQty;
    const dis = filter[0].discountPercentage;
    const basePrice = filteredProduct[0].basePrice;
    setActualPrice(basePrice * quantity);

    if (quantity >= fromNo && quantity <= toNo) {
      const d = actualPrice * (dis / 100);
      const discountedPrice = actualPrice - d;
      setAmount(discountedPrice);
    } else {
      setAmount(actualPrice);
    }
  };
  const user = auth.getCurrentUser();

  const config = {
    reference: new Date().getTime(),
    email: user.email,
    amount: amount,
    currency: "ZAR",
    publicKey: "pk_test_6ad7daa084d40f22350038852006a020e49a4428",
  };
  const handlePaystackSuccessAction = async (response) => {
    // Implementation for whatever you want to do with email and after success call.

    if (response.status === "success") {
      const userid = user.id;
      const discountID = filter[0]._id;
      const paymentNumber = 0;
      const b2bClient = "";
      const processedBy = "";
      const resp = await autherize.generateVoucher(
        userid,
        discountID,
        paymentNumber,
        quantity,
        b2bClient,
        processedBy,
        amount
      );

      const id = resp.data.data.invoiceID;

      const paymentID = response.reference;
      const result = await auth.updateInvoice(id, paymentID);
      if (result.status === 201) {
        window.location.href = "/voucherlisting";
      }
    }
  };
  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const componentProps = {
    ...config,
    text: "Checkout",
    onSuccess: (email) => handlePaystackSuccessAction(email),
    onClose: handlePaystackCloseAction,
  };

  const handleSubmit = async () => {
    const userid = user.id;
    const discountID = filter[0]._id;
    const paymentNumber = 0;
    const b2bClient = "";
    const processedBy = "";
    const response = await autherize.generateVoucher(
      userid,
      discountID,
      paymentNumber,
      quantity,
      b2bClient,
      processedBy,
      amount
    );
    if (response.status === 200) {
      toast.success("vouchers created");
    }
  };
  return (
    <div className="container">
      <h4>Employee Voucher Pop Page for B2B Client</h4>
      <br />
      <div className="form-group">
        <div className="row">
          <div className="col-md-4">
            <label>Enter Quantity Field</label>
          </div>
          <div className="col-md-4">
            <input
              name="quantity"
              type="number"
              className="form-control"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div>Double click to calculate amount</div>
      <Button variant="contained" color="primary" onClick={calAmount}>
        Calculate Amount
      </Button>
      <br />
      <br />
      {amount && (
        <div>
          <label>Your actual amount is: {actualPrice}</label>
          <br />
          <label>Discount % applied : {filter[0].discountPercentage}</label>
          <br />
          <label>Your final amount is: {amount}</label>
          <br />
        </div>
      )}

      <PaystackButton {...componentProps} />
    </div>
  );
};

export default EmployeeVoucherPopPage;
