import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../Config";
import Loader from "../Components/Loader";
import { GrCertificate } from "react-icons/gr";
import { BiSolidReport } from "react-icons/bi";
import { TfiLayoutSlider } from "react-icons/tfi";




const AdminDashboard = ({ adminAuth }) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [user, setUserData] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
    getUserPermissions();
  }, [adminAuth]);

  const goto = (url) => {
    navigate(url);
  };

  const getUserPermissions = () => {
    fetch(baseurl + "/api/permission/" + adminAuth, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setLoader(false);
        setUserPermissions(result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = () => {
    fetch(baseurl + "/api/admin/" + adminAuth, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // setLoader(false);
        setUserData(result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section className=" px-5 py-2">
        <div className="bg-[var(--theme-color)] mt-5 mb-10">
          <h1 className="font-extrabold text-3xl text-center text-white px-2 py-5">
            Welcome to SMS Education
          </h1>
        </div>
        {loader ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {userPermissions ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
                {/* Enquiries */}
                {userPermissions.enquiries ? (
                  <div
                    onClick={() => goto("/admin/enquiries")}
                    className=" w-48 h-48 p-10 m-3 text-xl text-[#8f15b5] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#8f15b5] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <div>Enquiries</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Courses */}
                {userPermissions.courseList ? (
                  <div
                    onClick={() => goto("/admin/courselist")}
                    className=" w-48 h-48 p-10 m-3 text-xl text-[#41ad6b] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#41ad6b] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                    <div>Course List</div>
                  </div>
                ) : (
                  ""
                )}

                {/* {userPermissions.categories ? (
                  <div
                    onClick={() => goto("/admin/categories")}
                    className=" w-48 h-48 p-10 m-3 text-xl text-[#af7b94] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#af7b94] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                        />
                      </svg>
                    </div>
                    <div>Categories</div>
                  </div>
                ) : (
                  ""
                )} */}

                {/* Students */}
                {userPermissions.studentList ? (
                  <div
                    onClick={() => goto("/admin/students")}
                    className=" w-48 h-48 p-10 m-3 text-xl text-[#878d15] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#878d15] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                    </div>
                    <div> Student List</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Instructors */}
                {userPermissions.instructorList ? (
                  <div
                    onClick={() => goto("/admin/instructorList")}
                    className=" w-48 h-48 p-10 m-3 text-xl text-[#f489bc] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#f489bc] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                      </svg>
                    </div>
                    <div> Instructor List</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Cash Ledger */}
                {userPermissions.cashLedger ? (
                  <div
                    onClick={() => goto("/admin/funds")}
                    className=" w-48 h-48 p-10 m-3 text-xl text-[#6a7279] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#6a7279] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>Cash Ledger</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Fees */}
                {userPermissions.fees ? (
                  <div
                    onClick={() => goto("/admin/student-fees")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#f1a81a] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#f1a81a] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                    </div>
                    <div>Fees</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Schedule Classes */}
                {userPermissions.scheduleClasses ? (
                  <div
                    onClick={() => goto("/admin/schedule-classes")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#ee8ddd] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#ee8ddd] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
                        />
                      </svg>
                    </div>
                    <div>Schedule Classes</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Events */}
                {userPermissions.events ? (
                  <div
                    onClick={() => goto("/admin/admin-events")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#ec9464] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#ec9464] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                    </div>
                    <div>Events</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Queries */}
                {/* {userPermissions.manageStudent ? : ""} */}
                <div
                  onClick={() => goto("/admin/admin-queries")}
                  className=" w-48 h-48 p-10 m-3 text-2xl text-[#e74f4d] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#e74f4d] ring-offset-1"
                >
                  <div className="py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div>Student & Teacher Queries</div>
                </div>
                {/* Manage Student */}
                {userPermissions.manageStudent ? (
                  <div
                    onClick={() => goto("/admin/attendance")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#213363] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#213363] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                        />
                      </svg>
                    </div>
                    <div>Attendance</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Schedule Batches */}
                {userPermissions.scheduleBatches ? (
                  <div
                    onClick={() => goto("/admin/schedule-batches")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#00DFA2] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#00DFA2] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                        />
                      </svg>
                    </div>
                    <div>Batches</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Monthly Achievers */}
                {userPermissions.monthlyAchievers ? (
                  <div
                    onClick={() => goto("/admin/monthly-acheivers")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#FF2171] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#FF2171] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 80 80"
                        id="winner-medal"
                        stroke="currentColor"
                        className="w-11 h-11"
                      >
                        <path d="M63.379 5.445A.999.999 0 0 0 62.547 5H51.464c-.404 0-.769.244-.923.617L40 31.08 29.46 5.617A1.001 1.001 0 0 0 28.535 5H17.453a.999.999 0 0 0-.923 1.385l11.853 28.402a6.01 6.01 0 0 0-1.908 2.565 4.024 4.024 0 0 1-2.32 2.307 6.04 6.04 0 0 0-3.774 6.558 4.036 4.036 0 0 1-.865 3.182c-1.77 2.19-1.77 5.37.023 7.587a4.012 4.012 0 0 1 .842 3.155c-.446 2.786 1.142 5.543 3.792 6.564a4.022 4.022 0 0 1 2.308 2.318c1.015 2.633 3.77 4.228 6.557 3.775a4.036 4.036 0 0 1 3.183.865 5.981 5.981 0 0 0 3.77 1.325c1.35 0 2.704-.448 3.817-1.348a4.031 4.031 0 0 1 3.154-.842c2.79.453 5.543-1.142 6.563-3.793a4.028 4.028 0 0 1 2.32-2.308 6.037 6.037 0 0 0 3.774-6.556 4.032 4.032 0 0 1 .865-3.183c1.77-2.19 1.77-5.37-.023-7.587a4.016 4.016 0 0 1-.842-3.154c.445-2.785-1.142-5.543-3.792-6.565a4.025 4.025 0 0 1-2.308-2.318 5.972 5.972 0 0 0-1.901-2.55l11.852-28.4a1 1 0 0 0-.091-.939zM18.954 7h8.913l10.22 24.687a6.038 6.038 0 0 0-1.895 1.03 4.01 4.01 0 0 1-3.154.843 5.926 5.926 0 0 0-2.89.263L18.954 7zm36.172 34.526a4.028 4.028 0 0 1 2.519 4.374 6.038 6.038 0 0 0 1.284 4.757c1.182 1.461 1.182 3.582-.023 5.072a6.013 6.013 0 0 0-1.261 4.728 4.034 4.034 0 0 1-2.537 4.38 6.028 6.028 0 0 0-3.456 3.468 4.03 4.03 0 0 1-4.374 2.518 6.018 6.018 0 0 0-4.757 1.285c-1.46 1.182-3.58 1.184-5.07-.023a6.017 6.017 0 0 0-4.73-1.262c-1.855.298-3.697-.761-4.38-2.537a6.033 6.033 0 0 0-3.467-3.456 4.027 4.027 0 0 1-2.519-4.373 6.032 6.032 0 0 0-1.284-4.757c-1.182-1.46-1.182-3.582.023-5.071a6.018 6.018 0 0 0 1.261-4.729 4.033 4.033 0 0 1 2.537-4.38 6.03 6.03 0 0 0 3.456-3.467 3.983 3.983 0 0 1 1.583-1.915c.03-.01.062-.006.092-.019a.989.989 0 0 0 .294-.199 3.995 3.995 0 0 1 2.405-.386 6.029 6.029 0 0 0 4.757-1.285c1.46-1.18 3.581-1.182 5.07.023a6.009 6.009 0 0 0 4.73 1.262 3.996 3.996 0 0 1 2.405.387c.085.08.18.15.293.198.03.013.061.01.092.018a4.015 4.015 0 0 1 1.59 1.933 6.029 6.029 0 0 0 3.467 3.456zm-5.274-7.704a5.937 5.937 0 0 0-2.89-.262 4.033 4.033 0 0 1-3.183-.866 5.921 5.921 0 0 0-1.864-1.013L52.133 7h8.913L49.852 33.822z"></path>
                        <path d="M40 38.929c-7.857 0-14.25 6.392-14.25 14.25s6.393 14.25 14.25 14.25 14.25-6.393 14.25-14.25-6.393-14.25-14.25-14.25zm0 26.5c-6.755 0-12.25-5.495-12.25-12.25s5.495-12.25 12.25-12.25 12.25 5.495 12.25 12.25-5.495 12.25-12.25 12.25z"></path>
                        <path d="M38.247 48.628c-.78.608-1.503 1.02-2.169 1.239v2.314a8.79 8.79 0 0 0 3.294-1.933v9.61h2.55V46.5h-2.069c-.29.81-.826 1.52-1.606 2.128z"></path>
                      </svg>
                    </div>
                    <div>Monthly Achievers</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Roles and Permissions */}
                {userPermissions.rolesPermission ? (
                  <div
                    onClick={() => goto("/admin/roles-and-permissions")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#6527BE] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#6527BE] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </div>
                    <div>Roles & Permissions</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Instructor Leads */}
                {userPermissions.joinInstructor ? (
                  <div
                    onClick={() => goto("/admin/joinInstructor")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#41ad6b] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#41ad6b] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </div>
                    <div>Instructor Leads</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Contact Queries */}
                {userPermissions.contact ? (
                  <div
                    onClick={() => goto("/admin/contactQueries")}
                    className=" w-48 h-48 p-10 m-3 text-2xl text-[#f1a81a] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#f1a81a] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </div>
                    <div>Contact Queries</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Balance Report */}
                {userPermissions ? (
                  <div
                    onClick={() => goto("/admin/balance-report")}
                    className="w-48 h-48 p-10 m-3 text-2xl text-[#1af169] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#1af169] ring-offset-1"
                  >
                    <div className="py-1">
                      <BiSolidReport className="w-10 h-10" />
                    </div>
                    <div>Balance Report</div>
                  </div>
                ) : (
                  ""
                )}

                {/* Pending Work */}
                {userPermissions ? (
                  <div
                    onClick={() => goto("/admin/pending-work")}
                    className="w-48 h-48 p-10 m-3 text-2xl text-[#f1a81a] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#f1a81a] ring-offset-1"
                  >
                    <div className="py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </div>
                    <div>Pending Work</div>
                  </div>
                ) : (
                  ""
                )}

                <div
                  onClick={() => goto("/admin/certificate")}
                  className="w-48 h-48 p-10 m-3 text-2xl text-[#6bbd4a] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#6bbd4a] ring-offset-1"
                >
                  <div className="py-1 text-[#6bbd4a]">
                    <GrCertificate className="w-10 h-10" />
                  </div>
                  <div>Certificate</div>
                </div>

                <div
                  onClick={() => goto("/admin/websiteSliderMgmt")}
                  className="w-48 h-48 p-10 m-3 text-2xl text-[#6494d4] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#6494d4] ring-offset-1"
                >
                  <div className="py-1 text-[#6494d4]">
                    <TfiLayoutSlider className="w-10 h-10" />
                  </div>
                  <div>Slider Management</div>
                </div>

                {/* <div
                  onClick={() => goto("/admin/idCard")}
                  className="w-48 h-48 p-10 m-3 text-2xl text-[#e486bb] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#e486bb] ring-offset-1"
                >
                  <div className="py-1 text-[#e486bb]">
                    <TfiLayoutSlider className="w-10 h-10" />
                  </div>
                  <div>ID Card</div>
                </div> */}

              </div>
            ) : (
              <div className="text-xl font-semibold my-20 text-center">
                {" "}
                Please contact Administrator for enabling permissions
              </div>
            )}{" "}
          </>
        )}
      </section>
      {/* Footer */}
      <div className="bg-[var(--theme-color)] mt-5">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default AdminDashboard;
