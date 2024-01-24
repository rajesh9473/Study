import { Button, Checkbox } from "@material-tailwind/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import baseurl from "../../Config";

const ManageStudentTable = ({ item, getStudentStatusList }) => {
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);

  const onApproveClick = (regno, status) => {
    // Post Api For Posting Data
    fetch(`${baseurl}/api/approvestatus/${regno}?status=${status}`, {
      method: "PUT",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        toast.success("Approved Successfully");
        getStudentStatusList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Reject Click
  function deleteData(id) {
    if (window.confirm("Are you sure You want to Reject ?")) {
      fetch(baseurl + "/api/reqststatus/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          toast.success("Rejected");
          getStudentStatusList();
        });
    }
  }
  return (
    <>
      <tr className="bg-white border-b">
        <td className=" py-4">
          <Checkbox />
        </td>
        <td className="px-6 py-4 font-semibold text-black">{item?.name || 'test' }</td>
        {/* <td className="px-6 py-4 hidden sm:table-cell max-w-xs">CCC</td> */}
        <td className="px-6 py-4 hidden sm:table-cell">{item?.regno || '123456'}</td>
        <td className="px-6 py-4 max-w-xs">{item?.status || 'Active'}</td>
        <td className="px-1 py-4">
          <div className="flex flex-wrap md:flex-nowrap ">
            <Button
              className="m-1 h-fit w-24"
              size="sm"
              
            >
              Prmotion
            </Button>
            <Button
              className="m-1 h-fit w-24"
              size="sm"
              color="red"
            >
              Demotion
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ManageStudentTable;
