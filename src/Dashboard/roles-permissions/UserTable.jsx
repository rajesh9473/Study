import React, { useState } from "react";
import baseurl from "../../Config";
// import ModalEditCourse from "./ModalEditCourse";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalEditUser from "./ModalEditUser";
import ModalPermissions from "./ModalPermissions";

const UserTable = ({ item, getUserList }) => {
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);
  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(!open3);

  const permissions = {
    id: item._id,
    enquiries: true,
    courseList: true,
    categories: true,
    studentList: true,
    instructorList: true,
    cashLedger: true,
    fees: true,
    scheduleClasses: true,
    events: true,
    manageStudent: true,
    scheduleBatches: true,
    monthlyAchievers: true,
    rolesPermission: false,
    // joinInstructor: true,
    // contact: true,
  };

  const initPermissions = () => {
    // Post Api For Posting Data
    fetch(baseurl + "/api/permission", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permissions),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.code === 200) {
          toast.success("Permissions initialised Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(permissions);
  };

  function deleteData(id) {
    if (window.confirm("Are you sure You want to delete ?")) {
      fetch(baseurl + "/api/admin/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          toast.info("Deleted Successfully");
          getUserList();
        });
    }
  }

  console.log(item)

  return (
    <>
      <tr className="bg-white border-b">
        <td className=" py-4">
          <Checkbox />
        </td>
        <td className="px-6 py-4 font-black">
          {item.role === "0"
            ? "Super Admin"
            : item.role === '1'
            ? "Admin"
            : item.role === '2'
            ? "Back Office"
            : "-"}
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-semibold text-black flex items-center"
        >
          <div className="text-md">{item.name}</div>
        </th>
        {/* <td className="px-6 py-4">Development</td> */}
        <td className="px-6 py-4 hidden md:table-cell max-w-xs">
          {item.email}
        </td>
        <td className="px-6 py-4 hidden md:table-cell">{item.contact}</td>
        <td className="px-6 py-4 hidden sm:table-cell">{item.address}</td>
        {/* <td className="px-3 py-4">
                          <span className="text-orange-600">Pending</span>
                        </td> */}
        <td className="px-3 py-4 hidden sm:table-cell">{item.gender}</td>
        <td className="px-6 py-4 ">
          <Button
            size="sm"
            onClick={() => {
              initPermissions();
              handleOpen3();
            }}
          >
            Update
          </Button>
          <ModalPermissions
            open={open3}
            initPermissions={initPermissions}
            handleOpen={handleOpen3}
            item={item}
          />
        </td>
        <td className="px-1 py-4">
          <div>
            <Menu>
              <MenuHandler>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <div onClick={handleOpen2} className="flex ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mx-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    Edit
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    className="flex "
                    onClick={() => {
                      deleteData(item._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mx-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                      />
                    </svg>
                    Delete
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
            <ModalEditUser
              item={item}
              open={open2}
              handleOpen={handleOpen2}
              getUserList={getUserList}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserTable;
