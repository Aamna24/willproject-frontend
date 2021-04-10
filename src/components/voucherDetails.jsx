import React from "react";
import * as auth from "../services/authService";

const VoucherDetails = () => {
  const querystring = window.location.search;
  const URLParams = new URLSearchParams(querystring);
  const id = URLParams.get("code");

  const [details, setDetails] = React.useState([]);

  const getData = () => {
    auth
      .getVoucherDetail(id)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //getData();
  React.useEffect(getData, []);
  if (!details || details.length === 0) return <p>Cannot find any posts</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">Voucher Date</div>

        <div className="">{details.data.date}</div>
      </div>

      <div className="row">
        <div className="col-md-6">User ID</div>
        <div className="col-md-6">{details.data.userID}</div>
      </div>
      <div className="row">
        <div className="col-md-6">Discount ID</div>
        <div className="col-md-6">{details.data.discountID}</div>
      </div>
      <div className="row">
        <div className="col-md-6">Voucher Code</div>
        <div className="col-md-6">{details.data.voucherCode}</div>
      </div>
      <div className="row">
        <div className="col-md-6">Voucher Status</div>
        <div className="col-md-6">{details.data.voucherStatus}</div>
      </div>

      <div className="row">
        <div className="col-md-6">Payment Number</div>
        <div className="col-md-6">{details.data.paymentNumber}</div>
      </div>
      <div className="row">
        <div className="col-md-6">Quantity</div>
        <div className="col-md-6">{details.data.quantity}</div>
      </div>
      <div className="row">
        <div className="col-md-6">Invoice No</div>
        <div className="col-md-6">{details.data.invoiceID}</div>
      </div>
    </div>
  );
};

export default VoucherDetails;
