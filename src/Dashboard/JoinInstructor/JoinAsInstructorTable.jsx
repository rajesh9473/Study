import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import ModalEditJoinAsInstructor from "./ModalEditJoinAsInstructor";
import { Link, useNavigate } from "react-router-dom";

const JoinAsInstructorTable = ({ item, getJoinInstructorList }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();

  function deleteData(id) {
    if (window.confirm("Are you sure You want to delete ?")) {
      fetch(baseurl + `/api/joininstructor/` + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          toast.success("Deleted Successfully");
          getJoinInstructorList();
        });
    }
  }

  return (
    <>
      <tr className="bg-white border-b">
        <td className=" py-4">
          <Checkbox />
        </td>
        <td scope="row" className="px-3 py-4 font-semibold text-black">
          <div>{item.name}</div>
        </td>
        <td className="px-3 py-4 ">{item.email ? item.email : "-"}</td>
        <td className="px-3 py-4 ">{item.contact}</td>
        <td className="px-3 py-4 max-w-xs break-words truncate">
          {item.qualification}
        </td>
        <td className="px-3 py-4 ">{item.exp} yrs</td>
        <td className="px-3 py-4  max-w-sm">
          <Link
            // onClick={() => navigate(`${baseurl}/api/showcontactcv/${item.cv}`)}
            to={`${item.cv}`}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeWidth="0"
                fill="var(--bg-dark-blue)"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeWidth="0"
                fill="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
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
                  <div onClick={handleOpen} className="flex ">
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
            <ModalEditJoinAsInstructor
              item={item}
              getJoinInstructorList={getJoinInstructorList}
              open={open}
              handleOpen={handleOpen}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default JoinAsInstructorTable;
