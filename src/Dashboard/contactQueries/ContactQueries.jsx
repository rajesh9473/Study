import React, { useEffect, Fragment, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import baseurl from "../../Config";
import Loader from "../../Components/Loader";
import ContactQueriesTable from "./ContactQueriesTable";
import ModalAddContactQueries from "./ModalAddContactQueries";

const ContactQueries = () => {
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [filterDate, setFilterDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    getContactQueriesList();
  }, [page, open]);

  const getContactQueriesList = () => {
    fetch(baseurl + "/api/contact ", {
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
  const filterAndPaginateProducts = (products, filterDate, page) => {
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

    const filteredList = products.filter((product) => {
      const createdAt = new Date(product?.createdAt);
      if (selectedDateFrom && selectedDateTo) {
        return createdAt >= selectedDateFrom && createdAt <= selectedDateTo;
      } else {
        return true; // Include all products if no date range is specified
      }
    });

    const LIMIT = 5;
    const pagedatacount = Math.ceil(filteredList.length / LIMIT);

    // Ensure that the page number is within a valid range
    const validPage = Math.min(Math.max(1, page), pagedatacount);

    const skip = (validPage - 1) * LIMIT;
    const paginatedData = filteredList.slice(skip, skip + LIMIT);

    return {
      pageCount: pagedatacount,
      pageData: paginatedData,
    };
  };

  // Usage in your component:
  useEffect(() => {
    const { pageCount, pageData } = filterAndPaginateProducts(
      product,
      filterDate,
      page
    );
    setPageCount(pageCount);
    setPageData(pageData);
  }, [product, filterDate, page]);

  return (
    <>
      <div className="mt-5 p-5 ml-auto  bg-[#f5f6fa]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Contact Queries
          </h2>
          {/* <div className="flex items-center gap-2">
            <h6 className="text-gray-500">Filter</h6>
            <select
              className="p-2 rounded-xl bg-light-blue-500 text-white outline-none"
              defaultValue="All"
              name=""
              id=""
            >
              <option value="All">All</option>
              <option value="last months">last months</option>
              <option value="6 months">6 months</option>
              <option value="8 months">8 months</option>
              <option value="this year">this year</option>
            </select>
          </div> */}
          <div className="flex items-center gap-2">
            <h6 className="text-gray-500">from Date</h6>
            <input
              type="date"
              className="p-2 rounded-lg"
              value={filterDate.from}
              max={filterDate.to}
              onChange={(e) => {
                setFilterDate({ ...filterDate, from: e.target.value });
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
          {/* Students */}
          <div className="flex items-center flex-col sm:flex-row">
            <div className=" w-48 mx-2">
              <div className="relative flex w-full flex-wrap items-stretch">
                <input
                  type="textarea"
                  className="relative m-0 block w-[1%] min-w-0  pl-2 pr-8 py-2  flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-[var(--theme-color)] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
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
              + Add Query
            </Button>
            <ModalAddContactQueries
              open={open}
              handleOpen={handleOpen}
              getContactQueriesList={getContactQueriesList}
            />
          </div>
        </div>

        {/* Join As Instructor Table */}
        <div className="my-10">
          <div className=" ">
            {loader ? (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="relative overflow-x-scroll">
                <table className=" w-full text-sm text-left text-gray-500 ">
                  <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                    <tr>
                      <th scope="col" className=" py-3">
                        <Checkbox />
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Contact
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Subject
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Description
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
                    {/* Dummy Data Ends Here */}
                    {pageData.map((item) => {
                      if (
                        item.name
                          .toLowerCase()
                          .includes(search.trim().toLowerCase())
                      ) {
                        return (
                          <ContactQueriesTable
                            item={item}
                            key={item._id}
                            getContactQueriesList={getContactQueriesList}
                          />
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

export default ContactQueries;