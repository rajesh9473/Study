import React, { useEffect, Fragment, useState } from "react";
import { Button } from "@material-tailwind/react";
import baseurl from "../../Config";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import AddStudentOfTheMonth from "./AddStudentOfTheMonth";
import EditStudentOfTheMonth from "./EditStudentOfTheMonth";
import InstructorOfTheMonth from "../inst-of-the-month/InstructorOfTheMonth";

const StudentOfTheMonth = () => {
  const [studentMonth, setStudentMonth] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    StudentOfTheMonthList();
  }, []);

  const StudentOfTheMonthList = () => {
    fetch(baseurl + "/api/studentofmonth ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setStudentMonth(result[0]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);

  return (
    <>
      <div className="p-5 ml-auto shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Student Of The Month
          </h2>
          {/* Student Of The Month */}
          <div className="flex items-center flex-col sm:flex-row">
            <div className=" w-48 mx-2">
              <div className="relative flex w-full flex-wrap items-stretch"></div>
            </div>
            <Button onClick={handleOpen} className="h-fit invisible">
              + Add Student
            </Button>
          </div>
        </div>
        <AddStudentOfTheMonth
          open={open}
          handleOpen={handleOpen}
          StudentOfTheMonthList={StudentOfTheMonthList}
        />

        {/* Student Of The Month Table */}
        <div className="my-10">
          <div className="relative overflow-x-auto ">
            {loader ? (
              <div className="w-full h-[60vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <>
                {studentMonth ? (
                  <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 hidden md:table-cell"
                        >
                          Regno
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 hidden sm:table-cell"
                        >
                          Course
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 hidden sm:table-cell"
                        >
                          Image
                        </th>
                        <th scope="col" className="px-1 py-3">
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
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Dummy Data Starts Here */}
                      <tr
                        className="bg-white border-b "
                        key={"hjb324324bhj23hj4bb3b43hb32hj4b324b32b32"}
                      >
                        <td className="px-6 py-4 font-semibold text-black">
                          {studentMonth.name ? studentMonth.name : ""}
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          {" "}
                          {studentMonth.regno ? studentMonth.regno : ""}
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          {studentMonth.course ? studentMonth.course : ""}
                        </td>
                        <td className="px-6 py-4 ">
                          {studentMonth.img ? (
                            <img
                              src={`${baseurl}/api/studentofmonth/${studentMonth.img}`}
                              className="h-20 w-20"
                              alt=""
                            />
                          ) : (
                            ""
                          )}
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
                                {/* <MenuItem>
                                  <div
                                    className="flex "
                                    // onClick={() => {
                                    //   deleteData(item.contact_instructor);
                                    // }}
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
                                </MenuItem> */}
                              </MenuList>
                            </Menu>
                            <EditStudentOfTheMonth
                              open={open2}
                              handleOpen={handleOpen2}
                              StudentOfTheMonthList={StudentOfTheMonthList}
                              studentMonth={studentMonth}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  "No Student Of The Month"
                )}
              </>
            )}
          </div>
        </div>

        <InstructorOfTheMonth />
      </div>
      {/* Footer */}
      <div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default StudentOfTheMonth;
