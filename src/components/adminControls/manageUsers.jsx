import React, { useState } from "react";
import * as auth from "../../services/adminService";
import { CButton, CDataTable, CCollapse, CCardBody } from "@coreui/react";
import { toast } from "react-toastify";
toast.configure();
const ManageUsers = () => {
  const [users, setUsers] = React.useState();
  const [details, setDetails] = useState([]);

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
    { key: "type", label: "User Type" },
    {
      key: "view",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "deactivate",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "activate",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  const handleDisableUser = async (id) => {
    const response = await auth.DisableUser(id);
    if (response.status === 200) {
      toast.success("User is disabled");
      window.location.reload();
    }
  };
  const handleActivateUser = async (id) => {
    const response = await auth.activateUser(id);
    if (response.status === 200) {
      toast.success("User is re-activated");
      window.location.reload();
    }
  };

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

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
                  onClick={() => handleDisableUser(item._id)}
                >
                  Deactivate
                </CButton>
              </td>
            );
          },
          activate: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  shape="square"
                  size="sm"
                  onClick={() => handleActivateUser(item._id)}
                >
                  Activate
                </CButton>
              </td>
            );
          },
          view: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "View Details"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <p>Name:{item.name}</p>
                  <p>Email: {item.email}</p>
                  <p>Phone Number: {item.phoneNo}</p>
                  <p>Address Line 1: {item.add1}</p>
                  <p>Address Line 2: {item.add2}</p>
                  <p>Town: {item.town}</p>
                  <p>Country: {item.country}</p>
                </CCardBody>
              </CCollapse>
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
