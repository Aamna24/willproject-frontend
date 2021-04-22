import React from "react";
import * as auth from "../../services/adminService";
import { CButton, CDataTable } from "@coreui/react";
import { toast } from "react-toastify";
toast.configure();

const BalanceRequests = () => {
  const [list, setList] = React.useState();
  const getData = () => {
    auth
      .getBalanceRequests()
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // eslint-disable-next-line
  React.useEffect(getData, []);
  if (!list || list.length === 0)
    return <p>No Balance requests at the moment</p>;

  const arr = [];
  const obj = Object.entries(list);
  obj.forEach(([key, value]) => arr.push(value));
  const fields = [
    { key: "reqDate", label: "Request Date" },
    { key: "userID", label: "User ID" },
    { key: "bankName", label: "Bank Name" },
    { key: "bankAccountName", label: "Bank Account Name" },
    { key: "bankAccNo", label: "Bank Account No" },
    { key: "reqStatus", label: "Status" },
    {
      key: "clear",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const handlePayments = async (id) => {
    await auth.clearCommissionStatus(id);
    const res = await auth.clearPayment(id);
    if (res.status === 200) {
      toast.success("Payment Cleared");
      window.location.reload();
    }
  };
  return (
    <div className="container">
      <h5>Showing list of balance requests</h5>
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
          clear: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    handlePayments(item.balanceReqID);
                  }}
                >
                  Clear Payment
                </CButton>
              </td>
            );
          },
        }}
      />
    </div>
  );
};

export default BalanceRequests;
