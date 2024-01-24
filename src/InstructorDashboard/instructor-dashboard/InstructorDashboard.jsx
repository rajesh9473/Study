import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import baseurl from "../../Config";
import Loader from "../../Components/Loader";

const InstructorDashboard = ({ instructorAuth }) => {
  const [instructorData, setInstructorData] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getinstructorData();
  }, [instructorAuth]);

  const getinstructorData = () => {
    fetch(`${baseurl}/api/instructor/${instructorAuth}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        window.sessionStorage.setItem(
          "instructor-data",
          JSON.stringify(result[0])
        );
        setInstructorData(result[0]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goto = (url) => {
    navigate(url);
  };
  return (
    <>
      <section className=" px-5 py-2">
        <div className="bg-[var(--theme-color)] mt-5 mb-20">
          <h1 className="font-extrabold text-3xl text-center text-white px-2 py-5">
            Welcome to SMS Education
          </h1>
        </div>

        {!instructorData ? (
          <div className="min-h-[40vh] text-center text-xl font-bold ">
            You are not authorized to view This Page.
          </div>
        ) : loader ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center min-h-[43vh]">
            <div
              onClick={() => goto("/instructor/instructor-attendence")}
              className=" w-48 h-48 p-10 m-3 text-2xl text-[var(--secondary-color)] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#f1a81a] ring-offset-1"
            >
              <div className="py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#f1a81a"
                  className="w-9 h-9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </div>
              <div className="text-[#f1a81a]">Attendance</div>
            </div>
            <div
              onClick={() => goto("/instructor/assignments")}
              className=" w-48 h-48 p-10 m-3 text-2xl text-[var(--secondary-color)] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#886cc4] ring-offset-1"
            >
              <div className="py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#886cc4"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <div className="text-[#886cc4]">Assignment</div>
            </div>
            <div
              onClick={() => goto("/instructor/instructor-result")}
              className=" w-48 h-48 p-10 m-3 text-2xl text-[#18acb6] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#18acb6] ring-offset-1"
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
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </div>
              <div>Results</div>
            </div>
            <div
              // onClick={() => goto("/instructor/student-status")}
              onClick={() => goto("/instructor/instructor-students")}
              className=" w-48 h-48 p-10 m-3 text-2xl text-[#525FE1] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#525FE1] ring-offset-1"
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
              <div>Student Fees & Status</div>
            </div>
          </div>
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

export default InstructorDashboard;
