import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import ModalViewStudent from "./ModalViewStudent";
import StudenDocument from "./StudenDocument";
import moment from "moment/moment";

const Student = ({ item, getStudentList, checked, updateAuth }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);

  const [documentopen, setDocumentOpen] = useState(false);

  const handleDocumentOpen = () => setDocumentOpen(!documentopen);

  function deleteData(id) {
    if (window.confirm("Are you sure You want to delete ?")) {
      fetch(baseurl + `/api/students/` + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          toast.success("Deleted Successfully");
          getStudentList();
        });
    }
  }

  const ShowStudent = (student) => {
    sessionStorage.setItem("auth", JSON.stringify(student._id));
    updateAuth();
    navigate("/student/dashboard");
  };

  return (
    <>
      <tr className="bg-white border-b">
        <td className=" py-4">
          <Checkbox checked={checked} />
        </td>
        {/* <td className="px-6 py-4">{index}</td> */}
        <td className="px-6 py-4 font-semibold text-black">
          <div onClick={handleOpen} className="flex cursor-pointer">
            <div className=" text-white">
              <img
                className="rounded-full w-10 h-10"
                src={
                  baseurl + `/${item?.profilePic}` ||
                  "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"
                }
                alt="profile"
              />
            </div>
            <div className="ml-2">
              <div onClick={() => ShowStudent(item)}>{item.name}</div>
              <div className="font-light my-1 text-gray-500">{item.email}</div>
            </div>
          </div>
          <ModalViewStudent open={open} handleOpen={handleOpen} item={item} />
        </td>
        <td onClick={handleOpen} className="">
          {item.regno}
        </td>
        <td className="">{item.course ? item.course : "-"}</td>
        <td className="">{item.fname}</td>
        <td className="max-w-xs break-words truncate">{item.address}</td>
        <td className="">{item.contact}</td>
        <td className="px-3 py-4">{item.gender}</td>
        <td className="px-3 py-4">{moment(item.dob).format("MMMM Do YYYY")}</td>
        <td className="">
          <p>{moment(item.admdate).format("MMMM Do YYYY")}</p>
          {/* {moment(item.admdate).format('h:mm:ss a')} */}
        </td>

        <td className="">{item.library ? item.library : "-"}</td>
        <td className="">
          <Button onClick={handleDocumentOpen} size="sm">
            View
          </Button>
        </td>
        <td className="">{item.shift}</td>
        <td className="">
          <span
            className={
              item.status.toLowerCase() === "active"
                ? "text-teal-500"
                : item.status.toLowerCase() === "pending"
                ? "text-yellow-500"
                : item.status.toLowerCase() === "completed"
                ? "text-green-500"
                : item.status.toLowerCase() === "absconded"
                ? "text-red-500"
                : ""
            }
          >
            {item.status}
          </span>
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
                  <Link
                    to={"/admin/editStudent/" + item._id}
                    state={item}
                    className="flex "
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    Edit
                  </Link>
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
          </div>
        </td>
      </tr>
      <StudenDocument
        item={item}
        open={documentopen}
        handleDocumentOpen={handleDocumentOpen}
      />
    </>
  );
};

export default Student;
