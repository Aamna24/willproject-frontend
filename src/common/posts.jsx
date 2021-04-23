import React from "react";
import { CButton, CDataTable } from "@coreui/react";
const Formdata = (props) => {
  const handleEmail = () => {
    console.log("clicked");
  };
  const { posts } = props;
  if (!posts || posts.length === 0) return <p>Cannot find any posts</p>;
  const arr = [];

  const obj = Object.entries(posts.data);

  obj.forEach(([key, value]) => arr.push(value));

  const fields = [
    { key: "name", _style: { width: "30%" } },
    "img",
    "description",

    {
      key: "buttons",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
    {
      key: "button1",
      label: "",
      _style: { width: "1%" },
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
          buttons: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={handleEmail}
                >
                  Email
                </CButton>
              </td>
            );
          },
          button1: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  <a href={item.img} download="My_File.png">
                    Download
                  </a>
                  <br />
                </CButton>
              </td>
            );
          },
          img: (item, index) => {
            return (
              <td className="py-2">
                <img src={item.img} alt="flyer" />
              </td>
            );
          },
        }}
      />
    </div>
  );
};

export default Formdata;
