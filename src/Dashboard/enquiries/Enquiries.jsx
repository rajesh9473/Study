import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@material-tailwind/react";
import baseurl from "../../Config";
import EnquiryTable from "./EnquiryTable";
import Loader from "../../Components/Loader";
import ModalAddEnquiry from "./ModalAddEnquiry";
import { CSVLink } from "react-csv";
import PrintableEnquiryForm from "./PrintableEnquiryForm";

const Enquiries = () => {
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState("");
  const [open, setOpen] = useState(false);

  var today = new Date();

  // Get the date six months ago
  var sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  const formatDate = function (date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  };
  const handleOpen = () => setOpen(!open);
  const [selectAll, setSelectAll] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState({
    to: formatDate(today),
    from: formatDate(sixMonthsAgo),
  });

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedPageData = pageData.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setPageData(updatedPageData);
  };

  const handleSelectChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleRowSelect = (index) => {
    const updatedPageData = [...pageData];
    updatedPageData[index].selected = !updatedPageData[index].selected;
    setPageData(updatedPageData);

    const allSelected = updatedPageData.every((item) => item.selected);
    setSelectAll(allSelected);
  };

  useEffect(() => {
    getEnquiryList();
  }, [page]);

  const getEnquiryList = () => {
    setLoader(true);
    fetch(baseurl + "/api/enquiry ", {
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
        let a = 10;
        console.log(err);
      });
  };

  const deleteData = async (id) => {
    //console.warn(id)
    var result = fetch(baseurl + `/api/students/${id}`, {
      method: "DELETE",
    });
    alert("Are You Sure To Delete Data...?");
    result = await result.json();
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
    const selectedDateFrom = filterDate?.from
      ? new Date(filterDate.from)
      : null;
    const selectedDateTo = filterDate?.to ? new Date(filterDate.to) : null;

    // Set the time component of selectedDateFrom to the start of the day (midnight)
    if (selectedDateFrom) {
      selectedDateFrom.setHours(0, 0, 0, 0);
    }

    // Set the time component of selectedDateTo to the end of the day (just before midnight)
    if (selectedDateTo) {
      selectedDateTo.setHours(23, 59, 59, 999);
    }

    const filteredList = product.filter((item) => {
      const createdAt = new Date(item?.createdAt);
      if (selectedDateFrom && selectedDateTo) {
        return createdAt >= selectedDateFrom && createdAt <= selectedDateTo;
      } else {
        return true; // Include all products if no date range is specified
      }
    });

    setPageCount(Math.ceil(filteredList.length / 5)); // Update pageCount based on filteredList

    if (page) {
      const LIMIT = 5;
      const skip = LIMIT * page;
      const dataskip = filteredList.slice(page === 1 ? 0 : skip - LIMIT, skip); // Use filteredList here
      setPageData(dataskip);
    }
  }, [product, filterDate, page]);

  return (
    <div>
      <div className="mt-5 mx-auto px-3 sm:px-5 py-5 ml-auto shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Enquiries
          </h2>
          {console.log(filterDate)}
          <div className="flex items-center gap-2">
            <h6 className="text-gray-500">from Date</h6>
            <input
              type="date"
              className="p-2 rounded-lg"
              value={filterDate.from}
              onChange={(e) => {
                setFilterDate({ ...filterDate, from: e.target.value });
                console.log(e.target.value);
              }}
            />
            <h6 className="text-gray-500">To Date</h6>
            <input
              type="date"
              className="p-2 rounded-lg"
              value={filterDate.to}
              min={filterDate.from}
              onChange={(e) => {
                setFilterDate({ ...filterDate, to: e.target.value });
              }}
            />
          </div>
          {/* Enquiries */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
            <div className="flex items-center">
              <label
                className="uppercase tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="course"
              >
                Filter Status
              </label>
              <select
                id="courseSelect"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={filterStatus}
                onChange={handleSelectChange}
              >
                <option value="">All</option>
                <option value="joined">Joined</option>
                <option value="pending">Pending</option>
                <option value="not-interested">Not Interested</option>
              </select>
            </div>
            <div className="flex items-center">
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
            </div>

            <Button onClick={handleOpen} className="h-fit">
              + Add Enquiry
            </Button>
            <Button className="h-fit ml-1">
              <CSVLink data={pageData} filename={"enquiries.csv"}>
                Download CSV
              </CSVLink>
            </Button>
          </div>

          {/* <ModalAddEnquiry
            open={open}
            handleOpen={handleOpen}
            getEnquiryList={getEnquiryList}
          /> */}
          <PrintableEnquiryForm
            open={open}
            handleOpen={handleOpen}
            getEnquiryList={getEnquiryList}
          />
        </div>

        {/* Enquiries Table */}
        <div className="my-10">
          <div className="relative mx-auto ">
            {loader ? (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="relative overflow-x-scroll">
                <table className="w-full  text-sm text-left text-gray-500 ">
                  <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                    <tr>
                      <th scope="col" className="px-3">
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th scope="col" className="min-w-[60px]">
                        Sr. No.
                      </th>
                      <th scope="col" className="min-w-[150px]">
                        Name
                      </th>
                      <th scope="col" className="min-w-[120px]">
                        Father Name
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Address
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Contact
                      </th>
                      <th scope="col" className="min-w-[70px]">
                        Gender
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Marital Status
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        DOB
                      </th>
                      <th scope="col" className="min-w-[150px]">
                        Academic Qualifications
                      </th>
                      <th scope="col" className="min-w-[150px]">
                        Computer Awareness
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Previous knowledge
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Counsellor
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Course
                      </th>
                      <th scope="col" className="min-w-[150px]">
                        Personality Development
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Career Classes
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Referred By
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Enq. Date
                      </th>
                      <th scope="col" className="min-w-[100px]">
                        Status
                      </th>
                      <th scope="col" className="min-w-[60px]">
                        Enroll
                      </th>
                      <th scope="col" className="min-w-[50px]">
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
                    {pageData.map((item, index) => {
                      const isNameMatch = item.name
                        .toLowerCase()
                        .includes(search.trim().toLowerCase());
                      const isStatusMatch = item.status
                        .toLowerCase()
                        .includes(search.trim().toLowerCase());
                      const isFilterStatusMatch =
                        filterStatus === "" || item.status === filterStatus;

                      if (
                        (isNameMatch || isStatusMatch) &&
                        isFilterStatusMatch
                      ) {
                        return (
                          <EnquiryTable
                            key={item.id}
                            item={item}
                            index={index}
                            getEnquiryList={getEnquiryList}
                            handleRowSelect={() => handleRowSelect(index)}
                            checked={selectAll}
                          />
                        );
                      }

                      return null;
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

export default Enquiries;
