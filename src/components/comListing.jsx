import React, { Component, useState } from "react";
import * as auth from "../services/authService";
import { CButton, CDataTable } from "@coreui/react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
toast.configure();
const CommissionListing = () => {
  const [commission, setCommission] = React.useState();
  const user = auth.getCurrentUser();
  const [show, setShow] = useState(false);
  const [bankAccNo, setAccNo] = useState();
  const [bankName, setBankName] = useState();
  const [bankAccName, setAccName] = useState();
  const [commissionBalance, setCommissionBalance] = React.useState();

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setCommissionBalance(item);
  };
  const handleSubmit = async () => {
    const user = await auth.getCurrentUser();
    const userName = user.name;
    const res = await auth.generateBalanceReq(
      userName,
      bankName,
      bankAccName,
      bankAccNo,
      commissionBalance
    );
    if (res.status === 201) {
      toast.success("Req generated");
    }
  };
  const getData = () => {
    auth
      .getCommissionList(user.id)
      .then((res) => {
        setCommission(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return commission;
  };
  //getData();
  React.useEffect(getData, []);

  if (!commission || commission.length === 0)
    return <p>No commissions to show</p>;
  const arr = [];
  const obj = Object.entries(commission);
  obj.forEach(([key, value]) => arr.push(value));

  const fields = [
    { key: "productName", label: "Product Name" },
    { key: "userName", label: "Individual Name" },
    { key: "commissionEarned", label: "Commission Earned in %" },
    { key: "commissionBalance", label: "commission Balalnce" },
    { key: "commissionStatus", label: "Status" },

    {
      key: "balance_withdrawl",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div className="container">
      <CDataTable
        items={arr[1]}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          balance_withdrawl: (item, index) => {
            return (
              <>
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => handleShow(item.commissionBalance)}
                  >
                    Generate Balance Withdrawl
                  </CButton>
                </td>
              </>
            );
          },
        }}
      />
      {!show && (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Bank Details</Modal.Title>
            </Modal.Header>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <label>Enter Bank Account Name</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="accName"
                    onChange={(e) => {
                      setAccName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <label>Enter Bank Name</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="bankName"
                    onChange={(e) => {
                      setBankName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <label>Enter Bank Account Number</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="accNo"
                    onChange={(e) => {
                      setAccNo(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <br />

            <Modal.Footer>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {show && (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Bank Details</Modal.Title>
            </Modal.Header>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <label>Enter Bank Account Name</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="accName"
                    onChange={(e) => {
                      setAccName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <label>Enter Bank Name</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="bankName"
                    onChange={(e) => {
                      setBankName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <label>Enter Bank Account Number</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="accNo"
                    onChange={(e) => {
                      setAccNo(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <br />

            <Modal.Footer>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CommissionListing;
