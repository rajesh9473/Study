import React, { useEffect, Fragment, useState } from "react";
import { Button } from "@material-tailwind/react";
import baseurl from "../../Config";
import { Checkbox } from "@material-tailwind/react";
import ModalAddResult from "./ModalAddResult";
import InstructorResultTable from "./InstructorResultTable";
import Loader from "../../Components/Loader";
import InstructorHeader from "../../Components/InstructorHeader";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import AddTypingResultModal from "./AddTypingResultModal";

const InstructorResultList = () => {
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [view, setView] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    getMarksList();
  }, [page]);

  const getMarksList = () => {
    fetch(baseurl + "/api/marks ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setProduct(result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  const [openTyping, setOpenTyping] = useState(false);
  const handleOpenTyping = () => setOpenTyping(!openTyping);
  const [typingResults, setTypingResults] = useState([])

  const getFetchResult = async () => {
    try {

      const response = await fetch(`${baseurl}/api/typing-result/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setTypingResults(result.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };

  useEffect(() => {
    getFetchResult()
  }, [])

  return (
    <>
      <div className="p-5 ml-auto shadow-lg scrollbar-hide bg-[#f5f6fa] mt-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Result
          </h2>
          {/* Result */}
          <div className="flex items-center flex-col sm:flex-row">
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
            <Button onClick={handleOpen} className="h-fit mr-1">
              + Add Result
            </Button>
            <Button onClick={handleOpenTyping} className="h-fit">
              + Add Typing Result
            </Button>
          </div>
        </div>
        <ModalAddResult
          open={open}
          handleOpen={handleOpen}
          getMarksList={getMarksList}
        />

        <AddTypingResultModal
          open={openTyping}
          handleClose={handleOpenTyping}
          getFetchResult={getFetchResult}
        />


        <div className="flex gap-4">
          <Button onClick={() => setView(true)} >View Course Result</Button>
          <Button onClick={() => setView(false)} >View Typing Result</Button>
        </div>

        <div>
          {view ?
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
                        <th scope="col" className=" py-3">
                          <Checkbox />
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Student
                        </th>
                        <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                          Reg. No.
                        </th>
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                          Topic
                        </th>
                        <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                          Course
                        </th>
                        <th scope="col" className="px-3 py-3 hidden lg:table-cell">
                          Total Marks
                        </th>
                        <th scope="col" className="px-3 py-3 ">
                          Obtained Marks
                        </th>
                        <th scope="col" className="px-3 py-3 hidden lg:table-cell">
                          Date
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
                      {pageData.map((item) => {
                        if (
                          item.name
                            .toLowerCase()
                            .includes(search.trim().toLowerCase())
                        ) {
                          return (
                            <>
                              <InstructorResultTable
                                item={item}
                                getMarksList={getMarksList}
                              />
                            </>
                          );
                        }
                      })}
                    </tbody>
                  </table>
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
            </div> :
            <div>
              <table className="min-w-full border border-gray-300 my-2">
                <thead>
                  <tr>
                    {/* Header columns */}
                    <th className="border border-gray-300 p-2">Student Name</th>
                    <th className="border border-gray-300 p-2">Reg. No.</th>
                    <th className="border border-gray-300 p-2">Language</th>
                    <th className="border border-gray-300 p-2">Father Name</th>
                    <th className="border border-gray-300 p-2">Address</th>
                    <th className="border border-gray-300 p-2">Speed</th>
                    <th className="border border-gray-300 p-2">Accuracy</th>
                    <th className="border border-gray-300 p-2">From</th>
                    <th className="border border-gray-300 p-2">To</th>
                    <th className="border border-gray-300 p-2">Total Marks</th>
                    <th className="border border-gray-300 p-2">Obtained Marks</th>
                    <th className="border border-gray-300 p-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table rows go here */}
                  {
                    typingResults.map((item, index) => (
                      <tr className="border border-gray-300">
                        <td className="border border-gray-300 p-2">{item?.student?.name}</td>
                        <td className="border border-gray-300 p-2">{item?.regno}</td>
                        <td className="border border-gray-300 p-2">{item?.typingLang}</td>
                        <td className="border border-gray-300 p-2">{item?.fname}</td>
                        <td className="border border-gray-300 p-2"><p>{item?.student?.address}</p></td>
                        <td className="border border-gray-300 p-2">{item?.speed}</td>
                        <td className="border border-gray-300 p-2">{item?.accuracy}</td>
                        <td className="border border-gray-300 p-2">{moment(item?.from).format('MM Do YYYY')}</td>
                        <td className="border border-gray-300 p-2">{moment(item?.to).format('MM Do YYYY')}</td>
                        <td className="border border-gray-300 p-2">{item?.total_marks}</td>
                        <td className="border border-gray-300 p-2">{item?.obtain_marks}</td>
                        <td className="border border-gray-300 p-2">{

                          item?.obtain_marks < 60
                            ? 'B'
                            : item?.obtain_marks >= 60 && item?.obtain_marks <= 80
                              ? 'A'
                              : item?.obtain_marks > 80
                                ? 'A+'
                                : null

                        }</td>
                      </tr>
                    ))
                  }
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>

          }
        </div>
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

export default InstructorResultList;
