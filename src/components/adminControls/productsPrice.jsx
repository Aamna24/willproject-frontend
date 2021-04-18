import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import * as auth from "../../services/adminService";
import { toast } from "react-toastify";
toast.configure();

const ProductsPrice = () => {
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState();

  const handleSubmit = async () => {
    const response = await auth.updatePrice(product, amount);
    console.log(response);
    if (response.status === 200) {
      toast.success("Price updated successfully");
      window.location.href = "/admin/products-listing";
    }
  };

  return (
    <div className="container">
      <h5>Set Products Price</h5>
      <br />
      <Form>
        <div class="form-group ">
          <div className="row">
            <div className="col-md-6">
              <label>Product</label>
            </div>
            <div classname="col">
              <select
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              >
                <option>Please Select One</option>
                <option value="Will Creation">Will Creation</option>
                <option value="Codicil Creation">Codicil Creation</option>
                <option value="Basic Will and Will Documents Registeration">
                  Basic Will and Will Documents Registeration
                </option>
                <option value="Basic Will Search">Basic Will Search</option>
                <option value="Executor Will Copy request">
                  Executor Will Copy request
                </option>
                <option value="Probate Registry Will">
                  Probate Registry Will
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Enter Price</label>
          </div>
          <div>
            <input
              type="number"
              placeholder="enter amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>Setup price</Button>
      </Form>
    </div>
  );
};

export default ProductsPrice;
