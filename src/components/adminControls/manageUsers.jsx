import React from "react";
import * as auth from "../../services/adminService";
import { CButton, CDataTable } from "@coreui/react";

const ManageUsers = () => {
  const [users, setUsers] = React.useState();

  const getData = () => {
    auth
      .getUsersList()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return users;
  };
  //getData();
  React.useEffect(getData, []);

  if (!users || users.length === 0) return <p>No users found</p>;
  const filteredUsers = users.data.filter(
    (x) => x.type === "B2B" || x.type === "willAmbassador"
  );

  //converting fetched data into array
  const arr = [];
  const obj = Object.entries(filteredUsers);
  obj.forEach(([key, value]) => arr.push(value));

  // declaring fields for table
  const fields = [
    { key: "email", label: "Email" },
    { key: "selfie", label: "Selfie" },
    { key: "status", label: "Status" },

    {
      key: "deactivate",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div className="container">
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
          deactivate: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  shape="square"
                  size="sm"
                  onClick={(e) => {
                    console.log("clicked");
                  }}
                >
                  Deactivate
                </CButton>
              </td>
            );
          },

          selfie: (item, index) => {
            return (
              <td className="py-2">
                <img src={item.selfie} alt="selfie" />
              </td>
            );
          },
        }}
      />
    </div>
  );
};

export default ManageUsers;
