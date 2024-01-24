import React, { useEffect, useState } from "react";
import baseurl from "../../Config";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrintReceipt from "./PrintReceipt";
import html2canvas from "html2canvas";
import { useAuthContext } from "../../context/useStateContext";

const StudentPayments = ({ auth }) => {
  const [studentFees, setStudentFees] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [totalpaid, setTotalpaid] = useState([]);
  const { currentUser, setCurrentUser, getStudentData } = useAuthContext();
  const [loader, setLoader] = useState(true);

  // useEffect(() => {
  //   getStudentData();
  // }, []);

  useEffect(() => {
    getStudentFees();
    getTotalpaid();
  }, [currentUser]);

  const getStudentFees = () => {
    fetch(`${baseurl}/api/fee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        let filteredData = result.filter(
          (fee) => fee.regno === currentUser.regno
        );
        setStudentFees(filteredData);
        // setStudentFees(result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getStudentData = () => {
  //   fetch(`${baseurl}/api/students/${auth}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setStudentData(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getTotalpaid = () => {
    fetch(`${baseurl}/api/totalpaidfee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        let filteredData = result.filter(
          (paid) => paid._id === currentUser.regno
        );
        setTotalpaid(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="p-2 sm:p-5 md:p-10 mt-5 border-b  border-[var(--secondary-color)]">
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-3xl font-semibold text-[var(--secondary-color)] text-center sm:text-start">
              Students Payments {}
            </h2>

            <div>
              <div className="my-1">
                <span className="font-semibold">Total Fees :</span>{" "}
                {studentFees[0] ? studentFees[0].amount : ""}
              </div>
              <div className="my-1">
                <span className="font-semibold">Paid :</span>{" "}
                <span className="text-green-500 font-semibold ">
                  {totalpaid[0] ? totalpaid[0].totalpaid : ""}
                </span>
              </div>
              <div className="my-1">
                <span className="font-semibold">Pending :</span>{" "}
                <span className="text-red-500 font-semibold ">
                  {studentFees[0] && totalpaid[0]
                    ? studentFees[0].amount - totalpaid[0].totalpaid
                    : ""}
                </span>
              </div>
            </div>
          </div>
          {loader ? (
            <div className="w-full h-[90vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="my-5">
              <table className="table-auto w-full">
                <thead className="border-b border-b-gray-600  text-[var(--secondary-color)]">
                  <tr className="uppercase text-start">
                    {/* <th className="px-3 py-3 text-start ">Course</th> */}
                    <th className="px-3 py-3 text-start">Date</th>
                    <th className="px-3 py-3 text-start hidden md:table-cell">
                      Total Amt.
                    </th>
                    <th className="px-3 py-3 text-start ">Paid</th>
                    <th className="px-3 py-3 text-start hidden lg:table-cell ">
                      Pending
                    </th>
                    <th className="px-1 py-3 text-start ">Receipt</th>
                  </tr>
                </thead>
                <tbody className="">
                  {studentFees.map((item) => {
                    return (
                      <tr key={item._id}>
                        {/* <td className="px-3 py-5 text-sm">{item.course}</td> */}
                        <td className="px-3 py-5 text-sm">{item.date}</td>
                        <td className="px-3 py-5 hidden lg:table-cell text-sm">
                          {item.amount}
                        </td>
                        <td className="px-3 py-5  ">
                          <span className="text-teal-500">{item.paid}</span>{" "}
                        </td>
                        <td className="px-3 py-5 hidden md:table-cell">
                          <span className="text-amber-500">
                            {item.amount - item.paid}
                          </span>
                        </td>
                        <td className="px-1 py-5 text-sm">
                          {loader ? (
                            <Loader />
                          ) : (
                            <div className="w-9 h-9 flex justify-center items-center bg-green-100 rounded-full cursor-pointer">
                              <Link
                                to="/students/payments/receipt"
                                state={{ auth, item }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                  />
                                </svg>
                              </Link>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default StudentPayments;
