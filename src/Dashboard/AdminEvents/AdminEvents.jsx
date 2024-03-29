import React, { useEffect, Fragment, useState } from "react";
import { Button, ButtonGroup } from "@material-tailwind/react";
import baseurl from "../../Config";
import { Checkbox } from "@material-tailwind/react";
import ModalAddEvent from "./ModalAddEvent";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";
import AdminEventsTable from "./AdminEventsTable";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ModalAddHoliday from "./ModalAddHoliday";
import { useAuthContext } from "../../context/useStateContext";

const AdminEvents = () => {
  const { GetAllholidays, HolidaysList } = useAuthContext();
  const [addEvent, setAddevent] = useState(true);
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const localizer = momentLocalizer(moment);

  const myEventsList = [
    {
      start: new Date(2023, 9, 6, 10, 0), // October 6, 2023, 10:00 AM
      end: new Date(2023, 9, 7, 12, 0), // October 6, 2023, 12:00 PM
      title: "Custom Event 1",
    },
    {
      start: new Date(2019, 6, 10, 14, 0), // July 10, 2019, 2:00 PM
      end: new Date(2019, 6, 10, 16, 0), // July 10, 2019, 4:00 PM
      title: "Custom Event 2",
    },
  ];

  const HolidayList = HolidaysList?.data?.map((item) => ({
    start: new Date(item?.from),
    end: new Date(item?.to),
    title: item?.name,
  }));

  const [eventsData, setEventsData] = useState(myEventsList);

  // Function to update events data
  const updateEventsData = (newEvent) => {
    setEventsData([...eventsData, newEvent]);
  };

  useEffect(() => {
    getEventsList();
    GetAllholidays();
  }, [page]);

  const getEventsList = () => {
    fetch(baseurl + "/api/event ", {
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
  const [hoidayopen, setHoildayOpen] = useState(false);
  const handleHolidayOpen = () => setHoildayOpen(!hoidayopen);

  return (
    <>
      <div className="p-5 shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5">
        <ButtonGroup className="">
          <Button onClick={() => setAddevent(true)}>Event</Button>
          <Button onClick={() => setAddevent(false)}>Holiday</Button>
        </ButtonGroup>

        {addEvent ? (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
                Events
              </h2>
              {/* Students */}
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
                <Button onClick={handleOpen} className="h-fit">
                  + Add Event
                </Button>
              </div>
            </div>
            <ModalAddEvent
              getEventsList={getEventsList}
              open={open}
              handleOpen={handleOpen}
            />

            {/* Student Table */}
            <div className="my-10">
              <div className="relative mx-auto ">
                {loader ? (
                  <div className="w-full h-[60vh] flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                      <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                        <tr>
                          <th scope="col" className=" py-3">
                            <Checkbox />
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Event
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3">
                            From
                          </th>
                          <th scope="col" className="px-6 py-3">
                            To
                          </th>
                          <th scope="col" className="px-6 py-3">
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
                        {pageData.map((item) => {
                          if (
                            item.event
                              .toLowerCase()
                              .includes(search.trim().toLowerCase())
                          ) {
                            return (
                              <>
                                <AdminEventsTable
                                  getEventsList={getEventsList}
                                  item={item}
                                />
                              </>
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
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
                Holiday
              </h2>
              {/* Students */}
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
                <Button onClick={handleHolidayOpen} className="h-fit">
                  + Add Hoilday
                </Button>
              </div>
            </div>
            <ModalAddHoliday
              open={hoidayopen}
              handleOpen={handleHolidayOpen}
              updateEventsData={updateEventsData}
            />

            {/* Student Table */}
            <div className="my-10">
              <div className="relative mx-auto ">
                {loader ? (
                  <div className="w-full h-[60vh] flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="relative overflow-x-auto">
                    <Calendar
                      localizer={localizer}
                      events={HolidayList}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 500 }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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

export default AdminEvents;