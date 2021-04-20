import React from "react";
import * as auth from "../../services/authService";
import { CButton, CDataTable } from "@coreui/react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
const B2bIndividualVoucherList = ({ user }) => {
  const [vouchers, setVouchers] = React.useState();
  const [show, setShow] = React.useState();
  const [email, setEmail] = React.useState();
  const getData = () => {
    auth
      .getVouchersList()
      .then((res) => {
        setVouchers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return vouchers;
  };
  //getData();
  React.useEffect(getData, []);
  if (!user || user.length == 0) return <p></p>;
  if (!vouchers || vouchers.length === 0) return <p>No vouchers to show</p>;
  const filtered = vouchers.data.filter(
    (voucher) => voucher.userID === user.id
  );

  const fields = [
    { key: "date", label: "Date Created" },
    { key: "voucherCode", label: "Voucher Code" },
    { key: "status", label: "Status" },
    { key: "paymentNumber", label: "Payment Number" },
    { key: "emailTo", label: "Emailed To" },

    {
      key: "email",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "view_details",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleEmail = async () => {};
  return (
    <div className="container">
      <h5 className="mb-5">Showing Individual Vouchers List </h5>
      <CDataTable
        items={filtered}
        fields={fields}
        columnFilter
        tableFilter
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          email: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => handleShow(item)}
                >
                  Email
                </CButton>
              </td>
            );
          },
          view_details: (item, index) => {
            return (
              <div>
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={(e) => {
                      window.location.href = "/details?d=" + item._id;
                    }}
                  >
                    Detail
                  </CButton>
                </td>
              </div>
            );
          },
        }}
      />

      {show && (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Email to</Modal.Title>
            </Modal.Header>
            <br />
            <br />
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <label>Enter Email Address</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
            </div>
            <Modal.Footer>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" color="primary" onClick={handleEmail}>
                Email
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default B2bIndividualVoucherList;
