import React, { useEffect, useState } from "react";
import baseurl from "../Config";
import { useNavigate } from "react-router-dom";
// import StudentHeader from "../Components/StudentHeader";
import { Tooltip } from "@material-tailwind/react";
import moment from "moment/moment";

const Classes = ({ auth, updateAuth }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  // console.log(eventsData);

  useEffect(() => {
    getScheduleData();
    getEventsData();
  }, []);

  const getScheduleData = () => {
    fetch(baseurl + "/api/class", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setScheduleData(result);
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getEventsData = () => {
    fetch(baseurl + "/api/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setEventsData(result);
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const time = (t) => {
    const HHMM = t.split(":");
    let classTime = 0;
    if (HHMM[0] > 12) {
      classTime = Number(HHMM[0]) - 12 + ":" + HHMM[1] + " PM";
    } else {
      classTime = Number(HHMM[0]) + ":" + HHMM[1] + " AM";
    }
    return classTime;
  };

  const date = (d) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const nd = d.slice(0, 10).split("-").reverse();
    nd[1] = months[Number(nd[1])];
    return nd;
  };

  // console.log(date("2023-06-22T00:00:00.000Z"));

  return (
    <>
      <section className=" p-3 sm:p-5 lg:py-5 lg:px-10 mt-5 border-b  border-[var(--secondary-color)]">
        <div className="flex justify-around flex-wrap my-10">
          <div className="m-3 bg-white flex items-center w-fit p-5 rounded-lg shadow-xl hover:-translate-y-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 h-12 mr-3 text-[var(--theme-color)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
            <div className="">
              <div className="text-[var(--theme-color)] text-3xl">01</div>
              <div className="text-[var(--secondary-color)] font-semibold">
                Total Courses
              </div>
            </div>
          </div>
          <div className="m-3 bg-white flex items-center w-fit p-5 rounded-lg shadow-xl hover:-translate-y-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 h-12 mr-3 text-[var(--theme-color)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            <div className="">
              <div className="text-[var(--theme-color)] text-3xl">01</div>
              <div className="text-[var(--secondary-color)] font-semibold">
                Active Courses
              </div>
            </div>
          </div>
          <div className="m-3 bg-white flex items-center w-fit p-5 rounded-lg shadow-xl hover:-translate-y-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 h-12 mr-3 text-[var(--theme-color)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
            <div className="">
              <div className="text-[var(--theme-color)] text-3xl">0</div>
              <div className="text-[var(--secondary-color)] font-semibold">
                Completed Courses
              </div>
            </div>
          </div>
        </div>

        <div className=" p-2">
          <h2 className="  text-3xl font-semibold text-[var(--secondary-color)] text-center sm:text-start my-5 sm:my-7 md:my-10">
            Notifications / Notice
          </h2>
          {/* Notification */}

          {eventsData.length == 0 ? (
            <div className="text-3xl mx-auto text-center">No Notice</div>
          ) : (
            <div className="flex justify-around items-center flex-wrap">
              {eventsData.map((item) => {
                return (
                  <div className="my-5 bg-white px-3 py-2 rounded-md sm:max-w-xl">
                    <h3 className="my-5 sm:my-1 text-center text-[var(--secondary-color)] text-xl font-bold">
                      {item.event}
                    </h3>
                    <div className="flex items-center flex-wrap">
                      <div>
                        <img
                          src={`${baseurl}/api/eventpic/${item.img}`}
                          className="w-28 h-20 rounded-lg"
                          alt=""
                        />
                      </div>
                      <div className="m-3">
                        <div className="text-[var(--para-color)] max-w-sm my-1 sm:mx-2 truncate">
                          <Tooltip
                            placement="bottom-end"
                            content={item.desc}
                            className="max-w-sm mx-auto bg-[var(--theme-color)] "
                          >
                            {item.desc}
                          </Tooltip>
                        </div>
                        <div className="my-2 text-[var(--secondary-color)] ">
                          {item.from} - {item.to}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Scheduled Classes */}
        <div>
          {scheduleData.length == 0 ? (
            ""
          ) : (
            <>
              {/* Heading */}
              <h2 className="text-3xl font-semibold text-[var(--secondary-color)] text-center sm:text-start my-5 sm:my-7 md:my-10">
                Scheduled Classes
              </h2>
              {/* Schedule - 1 */}
              <div className="flex flex-col md:flex-row items-center justify-around md:flex-wrap my-5 sm:my-7 md:my-10">
                {scheduleData.length == 0 ? (
                  <div className="text-3xl mx-auto text-center">No Classes</div>
                ) : (
                  scheduleData.map((item) => {
                    return (
                      <>
                        <div className="sm:max-w-md bg-white flex flex-row items-center shadow-lg rounded-lg">
                          <div className="m-4 flex flex-col items-center">
                            <div className="text-6xl text-[var(--theme-color)] font-bold">
                              {date(item.date)[0]}
                            </div>
                            <div className="text-[var(--secondary-color)] text-xl font-semibold">
                              {date(item.date)[1]}
                            </div>
                          </div>
                          <div className="m-4 px-3 flex flex-col ">
                            <div className="text-2xl font-semibold my-5 text-[var(--secondary-color)]">
                              {item.topic}
                            </div>
                            <div className="flex sm:flex-row sm:space-x-5 justify-center sm:justify-norma">
                              <div className="flex items-center">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2 text-[var(--secondary-color)]"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                    />
                                  </svg>
                                </div>
                                <div>{item.course}</div>
                              </div>
                              {/* Duration */}
                              <div className="flex my-2">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2 text-[var(--secondary-color)]"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                                <div>{moment(item.date).format('LT')}</div>
                              </div>
                            </div>
                            <p className="my-2 text-[var(--para-color)]">
                              {/* <Link to={item.link}>Join here</Link> */}
                            </p>
                          </div>
                        </div>
                        {/* <div>
                  <img src={AI} className="w-64 h-40 rounded-lg" alt="" />
                </div> */}
                      </>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Classes;
