import React, { useEffect, Fragment, useState } from "react";
import { Button, Tooltip } from "@material-tailwind/react";
import baseurl from "../../Config";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import Loader from "../../Components/Loader";
import AddInstructorOfTheMonth from "./AddInstructorOfTheMonth";
import EditInstructorOfTheMonth from "./EditInstructorOfTheMonth";

const InstructorOfTheMonth = () => {
  const [instructorMonth, setInstructorMonth] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    InstructorOfTheMonthList();
  }, []);

  const InstructorOfTheMonthList = () => {
    fetch(baseurl + "/api/instructorofmonth ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setInstructorMonth(result[0]);
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
      <div className="py-5 overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Instructor Of The Month
          </h2>
          {/* Students */}
          <div className="flex items-center flex-col sm:flex-row">
            <div className=" w-48 mx-2">
              <div className="relative flex w-full flex-wrap items-stretch"></div>
            </div>
            <Button onClick={handleOpen} className="h-fit invisible">
              + Add Instructor
            </Button>
          </div>
        </div>
        <AddInstructorOfTheMonth
          open={open}
          handleOpen={handleOpen}
          InstructorOfTheMonthList={InstructorOfTheMonthList}
        />

        {/* Student Table */}
        <div className="my-10">
          <div className="relative overflow-x-auto ">
            {loader ? (
              <div className="w-full h-[60vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                  <tr>
                    <th scope="col" className="px-6 py-3 ">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3 hidden md:table-cell">
                      Desc
                    </th>
                    <th scope="col" className="px-6 py-3 hidden sm:table-cell">
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
                  {instructorMonth ? (
                    <tr className="bg-white border-b " key={"dsf56df"}>
                      <td className="px-6 py-4 font-semibold text-black">
                        {instructorMonth.name ? instructorMonth.name : ""}
                      </td>
                      <td className="px-6 py-4 ">
                        {instructorMonth.course ? instructorMonth.course : ""}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell max-w-0 truncate">
                        <Tooltip
                          content={`${
                            instructorMonth.desc ? instructorMonth.desc : ""
                          }`}
                          placement="bottom-end"
                          className="max-w-xs bg-[var(--theme-color)]"
                        >
                          {instructorMonth.desc ? instructorMonth.desc : ""}
                        </Tooltip>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell ">
                        {instructorMonth.img ? (
                          <img
                          className="h-20 w-20"
                            src={`${baseurl}/api/instructorofmonths/${instructorMonth.img}`}
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
                          <EditInstructorOfTheMonth
                            open={open2}
                            handleOpen={handleOpen2}
                            InstructorOfTheMonthList={InstructorOfTheMonthList}
                            instructorMonth={instructorMonth}
                          />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    "No Instructor Of the Month"
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorOfTheMonth;
