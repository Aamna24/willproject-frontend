import React from "react";
import * as auth from "../../services/authService";
import { CButton, CDataTable } from "@coreui/react";

const TransactionList = ({ user }) => {
  const [vouchers, setVouchers] = React.useState();
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
  console.log(filtered);
  const fields = [
    { key: "date", label: "Date" },

    { key: "quantity", label: "Quantity" },
    { key: "paymentNumber", label: "Payment Number" },
    { key: "amount", label: "Amount Paid" },
  ];
  return (
    <div className="container">
      <h5 className="mb-5">Showing Transaction List </h5>
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
      />
    </div>
  );
};

export default TransactionList;
