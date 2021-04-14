import React, { Component } from "react";
import * as auth from "../services/authService";
import { CButton, CDataTable } from "@coreui/react";

const CommissionListing = () => {
  const [commission, setCommission] = React.useState();
  const user = auth.getCurrentUser();

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
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                >
                  Generate Balance Withdrawl
                </CButton>
              </td>
            );
          },
        }}
      />
    </div>
  );
};

export default CommissionListing;
