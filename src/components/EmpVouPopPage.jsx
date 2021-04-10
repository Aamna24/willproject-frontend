import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import * as auth from "../services/adminService";
import * as autherize from "../services/authService";
import { toast } from "react-toastify";
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
  const filter = discount.data.filter((x) => x.type === "Employee Voucher");
  const filteredProduct = products.data.filter(
    (x) => x.name === "willcreation"
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

  const handleSubmit = async () => {
    const user = auth.getCurrentUser();
    const userid = user.id;
    const discountID = filter[0]._id;
    const paymentNumber = 0;
    const response = await autherize.generateVoucher(
      userid,
      discountID,
      paymentNumber,
      quantity
    );
    if (response.status === 200) {
      toast.success("vouchers created");
    }
  };
  return (
    <div className="container">
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

      {amount && (
        <div>
          <label>Your total amount is: {amount}</label>
        </div>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Checkout
      </Button>
    </div>
  );
};

export default EmployeeVoucherPopPage;
