import React from "react";
import * as auth from "../../services/adminService";
import * as autherize from "../../services/authService";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
toast.configure();
const EmployeeVoucherInvoiceCreation = () => {
  const [users, setUser] = React.useState([]);
  const [b2bClient, setName] = React.useState();
  const [noOfVoucher, setQuantity] = React.useState();
  const [products, setProducts] = React.useState();
  const [amount, SetAmount] = React.useState();
  const [show, setShow] = React.useState();
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
  const getData = () => {
    auth
      .getUsersList()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(users);
    return users;
  };
  //getData();
  React.useEffect(getData, []);
  if (!users || users.length === 0) return <p>No Users to show</p>;
  if (!products || products.length === 0) return <p>Cannot find any posts</p>;

  const filtered = users.data.filter(
    (x) => x.type === "B2B" && x.status === "Activate"
  );
  const filteredProduct = products.data.filter(
    (x) => x.name === "Will Creation"
  );
  const handleSubmit = async () => {
    const user = auth.getCurrentUser();
    var data = new FormData();
    data.append("b2bClient", b2bClient);
    data.append("amount", amount);
    const processedBy = user.name;
    const userID = "";
    const discountID = "";
    const paymentNumber = "";
    const quantity = parseInt(noOfVoucher);
    const response = await autherize.generateVoucher(
      userID,
      discountID,
      paymentNumber,
      noOfVoucher,
      b2bClient,
      processedBy,
      amount
    );

    //window.location.href = "/admin/invoice-listing";
    if (response.status === 200) {
      toast.success("Successfully created");
    }
  };
  return (
    <div className="container">
      <Form>
        <div class="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>B2B Client Name</label>
            </div>
            <div className="col">
              <select
                for="exampleInputEmail1"
                name="b2bClient"
                class="form-control"
                id="exampleInputEmail1"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                <option>[Please select one]</option>
                {filtered.map((post) => {
                  return <option>{post.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Enter Quantity Field</label>
            </div>
            <div className="col-md-6">
              <input
                name="noOfVoucher"
                type="number"
                className="form-control"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div classname="col-md-6">Amount</div>
            <div className="col-md-6">
              {show && <div>{amount}</div>}

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  setShow(true);
                  SetAmount(noOfVoucher * filteredProduct[0].basePrice);
                }}
              >
                Calculate Amount
              </Button>
            </div>
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Complete
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeVoucherInvoiceCreation;
