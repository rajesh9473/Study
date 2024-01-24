import React, { useEffect, useState } from "react";
import ModalUploadAssignment from "./ModalUploadAssignment";
import { Button } from "@material-tailwind/react";
import baseurl from "../../Config";
import { Link } from "react-router-dom";
import AssignmentTable from "./AssignmentTable";
import Loader from "../../Components/Loader";
import { useAuthContext } from "../../context/useStateContext";

const StudentAssignments = ({ auth }) => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [studentData, setStudentData] = useState("");
  const [loader, setLoader] = useState(true);
  const { currentUser } = useAuthContext();
  // useEffect(() => {
  //   getStudentData();
  // }, []);

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

  useEffect(() => {
    getAssignmentData();
  }, []);

  const getAssignmentData = () => {
    fetch(`${baseurl}/api/assign`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setAssignmentData(result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="p-2 sm:p-5 md:p-10 mt-5 border-b  border-[var(--secondary-color)]">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-[var(--secondary-color)] text-center sm:text-start my-5">
          Submit Assignments
        </h2>
        {loader ? (
          <div className="w-full h-[90vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="my-10">
            <table className="table-auto w-full">
              <thead className="border-b border-b-gray-600">
                <tr className="uppercase text-start">
                  <th className="px-3 py-3 text-start ">Assignment</th>
                  <th className="px-3 py-3 text-start hidden md:table-cell">
                    Description
                  </th>
                  <th className="px-3 py-3 text-start hidden lg:table-cell">
                    Due Date
                  </th>
                  <th className="px-3 py-3 text-start hidden lg:table-cell">
                    Document
                  </th>
                  <th className="px-3 py-3 text-start">Submit</th>
                </tr>
              </thead>
              <tbody>
                {assignmentData.map((item) => {
                  return (
                    <>
                      <AssignmentTable studentData={currentUser} item={item} />
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

export default StudentAssignments;
