import React, { useEffect, Fragment, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import baseurl from "../../Config";
import ModalAddInstructor from "./ModalAddInstructor";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import InstructorDocument from "./InstructorDocument";
import ModalOneViewProfile from "./ModalOneViewProfile";

const InstructorList = () => {
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [filterBy, setFilterBy] = useState("all");
  const [viewInsPro, setViewInsPro] = useState(false)
  const [selectedData, setSelectedData] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [documentopen, setDocumentOpen] = useState(false);

  const handleInstructorProfile = (instructor) => {
    setSelectedInstructor(instructor);
    setViewInsPro(true);
  };

  const handleCloseInstructorProfie = () => {
    setSelectedInstructor(null);
    setViewInsPro(false);
  };

  const handleDocumentOpen = (data) => {
    setDocumentOpen(!documentopen);
    setSelectedData(data);
  };

  useEffect(() => {
    getInstructorList();
  }, [page, filterBy]);

  const getInstructorList = () => {
    fetch(baseurl + "/api/instructor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // setProduct(result);
        if (filterBy === "all") {
          setProduct(result);
        } else {
          let filteredData = result.filter(
            (instructor) => instructor.status === filterBy
          );
          setProduct(filteredData);
        }

        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function deleteData(id) {
    console.log(id);
    if (window.confirm("Are you sure You want to delete ?")) {
      fetch(baseurl + `/api/instructor/` + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          toast.info("Deleted Successfully");
          getInstructorList();
        });
    }
  }

  //handle Next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };
  //handlePrevious
  const handlePrevious = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };
  //console.log(pageCount)

  useEffect(() => {
    const pagedatacount = Math.ceil(product.length / 5);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 5;
      const skip = LIMIT * page;
      const dataskip = product.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [product]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <div className="mt-3 mx-auto  p-5 shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Instructors
          </h2>
          {/* Students */}
          <div className="flex items-center flex-col sm:flex-row">
            <div className="flex items-center">
              <div className="text-[var(--secondary-color)]">
                Filter By Status
              </div>{" "}
              <div>
                <select
                  name="filter"
                  id="filter"
                  value={filterBy}
                  onChange={(e) => {
                    setFilterBy(e.target.value);
                    setLoader(true);
                  }}
                  className="w-32 p-2 mx-2"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="leave">Leave</option>
                </select>
              </div>
            </div>
            <div className=" w-48 mx-2">
              <div className="relative flex w-full flex-wrap items-stretch">
                <input
                  type="textarea"
                  className="relative m-0 block w-[1%] min-w-0 pl-2 pr-8 py-2  flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-[var(--theme-color)] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Search by name"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                <div
                  className=" absolute bottom-1 right-1 input-group-text flex items-center whitespace-nowrap rounded px-1 py-1.5 text-center text-base font-normal text-neutral-700  cursor-pointer"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Button onClick={handleOpen} className="h-fit">
              + Add
            </Button>
          </div>
        </div>
        <ModalAddInstructor
          open={open}
          handleOpen={handleOpen}
          getInstructorList={getInstructorList}
        />

        {/* Student Table */}
        <div className="my-10">
          <div className="relative mx-auto ">
            {loader ? (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="relative overflow-x-scroll">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                    <tr>
                      <th scope="col" className="">
                        Instructor
                      </th>
                      <th scope="col" className="">
                        Address
                      </th>
                      <th scope="col" className="">
                        Contact
                      </th>
                      <th scope="col" className="">
                        Gender
                      </th>
                      <th scope="col" className="">
                        DOB
                      </th>
                      <th scope="col" className="">
                        Qualification
                      </th>
                      <th scope="col" className="">
                        Degree
                      </th>
                      <th scope="col" className="">
                        Salary
                      </th>
                      <th scope="col" className="">
                        Document
                      </th>
                      <th scope="col" className="">
                        Status
                      </th>
                      <th className="px-1 py-4">
                        <div>Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((item) => {
                      if (
                        item.name
                          .toLowerCase()
                          .includes(search.trim().toLowerCase())
                      ) {
                        return (
                          <tr className="bg-white border-b " key={item._id}>

                            <td
                              onClick={() => handleInstructorProfile(item?._id)}
                              className=" truncate max-w-sm cursor-pointer"
                            >
                              <div className="p-3">
                                <div className="flex items-center">
                                  <img
                                    className="min-w-3 w-12 h-12 rounded-full"
                                    src={`${baseurl}/${item?.profilePic}`}
                                    alt="teacherimg"
                                  />
                                  <div className="ml-2">
                                    <div className="font-semibold text-blue-700">{item?.name}</div>
                                    <div className="font-light my-1 text-gray-500">
                                      {item?.email}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="pr-6 py-4 truncate max-w-sm">
                              {item.address}
                            </td>
                            <td className="">{item?.contact}</td>
                            <td className="">{item?.gender}</td>
                            <td className="">{item?.dob}</td>
                            <td className="">{item?.qualification}</td>
                            <td className="">{item?.degree}</td>
                            <td className="">{item?.salary}</td>
                            <td className="">
                              <Button
                                onClick={() => handleDocumentOpen(item)}
                                size="sm"
                              >
                                View
                              </Button>
                            </td>
                            <td
                              className={`${item.status === "active"
                                ? "text-teal-500"
                                : item.status === "leave"
                                  ? "text-amber-500"
                                  : ""
                                } px-6 py-4 hidden md:table-cell capitalize`}
                            >
                              {item.status}
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
                                        to={"/admin/editInstructor/" + item._id}
                                        className="flex "
                                        state={item}
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
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end">
              <nav aria-label="Page navigation example">
                <ul className="pagination flex space-x-5 border w-fit px-2 py-1 mx-5 mt-5">
                  <li className="page-item">
                    <a
                      className="page-link"
                      sty
                      href="#"
                      aria-label="Previous"
                      onClick={handlePrevious}
                      disabled={page === 1}
                    >
                      <span
                        aria-hidden="true"
                        className="border px-2 py-1 shadow-xl rounded-lg"
                      >
                        &laquo;
                      </span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {Array(pageCount)
                    .fill(null)
                    .map((ele, index) => {
                      return (
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#"
                            active={page === index + 1 ? true : false}
                            onClick={() => {
                              setPage(index + 1);
                            }}
                          >
                            {index + 1}
                          </a>
                        </li>
                      );
                    })}
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={handleNext}
                      disabled={page === pageCount}
                    >
                      <span
                        aria-hidden="true"
                        className="border px-2 py-1 shadow-xl rounded-lg"
                      >
                        &raquo;
                      </span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <InstructorDocument
          item={selectedData}
          open={documentopen}
          handleDocumentOpen={handleDocumentOpen}
        />
        <ModalOneViewProfile
          open={viewInsPro}
          handleOpen={handleCloseInstructorProfie}
          instructor={selectedInstructor}
        />

      </div>
      {/* Footer */}
      <div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </div>
  );
};

export default InstructorList;
