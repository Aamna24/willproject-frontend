import React, { useState } from "react";
import { CButton, CDataTable, CCollapse, CCardBody } from "@coreui/react";
import * as auth from "../../services/adminService";
import { toast } from "react-toastify";
toast.configure();

const OrgUserListing = () => {
  const [users, setUsers] = useState([]);
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

  if (!users || users.length === 0) return <p>Cannot find any posts</p>;
  const filter = users.data.filter((user) => user.type === "organisationUser");

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

  const fields = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "selfie", label: "Selfie" },
    { key: "phoneNo", label: "Contact Number" },

    {
      key: "view_detail",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "edit",
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
  ];
  const handleDisableUser = async (id) => {
    const response = await auth.DisableUser(id);
    if (response.status === 200) {
      toast.success("User is disabled");
      window.location.reload();
    }
  };
  return (
    <div className="container">
      <h5 className="mb-5">Showing List Of Organistion Users</h5>
      <CDataTable
        items={filter}
        fields={fields}
        columnFilter
        tableFilter
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          view_detail: (item, index) => {
            return (
              <div>
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleDetails(index);
                    }}
                  >
                    {details.includes(index) ? "Hide" : "View "}
                  </CButton>
                </td>
              </div>
            );
          },

          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h6>Invoice Date: {item.date}</h6>
                  <p>Invoice Number: {item.name}</p>
                  <p>B2B Type: {item.type}</p>
                  <p>Status: {item.status}</p>
                </CCardBody>
              </CCollapse>
            );
          },

          selfie: (item, index) => {
            return (
              <td className="py-2">
                <img src={item.selfie} alt="flyer" />
              </td>
            );
          },
          edit: (item, index) => {
            return (
              <div>
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      window.location.href = "/editorguser?profile=" + item._id;
                    }}
                  >
                    Edit
                  </CButton>
                </td>
              </div>
            );
          },
          deactivate: (item, index) => {
            return (
              <div>
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => handleDisableUser(item._id)}
                  >
                    Deactivate
                  </CButton>
                </td>
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default OrgUserListing;
