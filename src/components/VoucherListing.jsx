import React from "react";
import * as auth from "../services/authService";
import * as admin from "../services/adminService";
import { CButton, CDataTable } from "@coreui/react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const VoucherListing = () => {
  const [voucher, setVoucher] = React.useState();
  const getData = () => {
    auth
      .getVouchersList()
      .then((res) => {
        setVoucher(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(voucher);
    return voucher;
  };
  //getData();
  React.useEffect(getData, []);
  const user = admin.getCurrentUser();
  const id = user.id;

  if (!voucher || voucher.length === 0) return <p>Cannot find any posts</p>;
  const filtered = voucher.data.filter((x) => x.userID === id);
  if (!filtered || filtered.length === 0) return <p>Cannot find any posts</p>;

  const arr = [];
  const obj = Object.entries(filtered);
  obj.forEach(([key, value]) => arr.push(value));

  console.log("arr", arr);
  const fields = [
    { key: "date", label: "Date" },
    { key: "voucherCode", label: "Code" },
    { key: "voucherStatus", label: "Status" },
    { key: "quantity", label: "Quantity" },
    { key: "invoiceID", label: "Invoice ID" },
    {
      key: "email",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "print",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "view",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div className="container">
      <Button variant="contained" color="primary" component={Link} to="/test">
        Generate Voucher
      </Button>
      <br />
      <br />
      <br />
      <CDataTable
        items={arr}
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
          email: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                >
                  Email
                </CButton>
              </td>
            );
          },
          print: (item, index) => {
            return (
              <div>
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                  >
                    Print
                  </CButton>
                </td>
              </div>
            );
          },
          view: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={(e) => {
                    window.location.href = "/voucherdetail/?code=" + item._id;
                  }}
                >
                  View
                </CButton>
              </td>
            );
          },
        }}
      />
    </div>
  );
};

export default VoucherListing;
