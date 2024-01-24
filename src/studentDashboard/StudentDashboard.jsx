import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentProfile from "./profile/StudentProfile";
import Classes from "./Classes";
import StudentAcademics from "./academics/StudentAcademics";
import StudentMarks from "./StudentMarks";
import StudentAssignments from "./assignments/StudentAssignments";
import StudentPayments from "./payments/StudentPayments";
import StudentQueries from "./queries/StudentQueries";
import baseurl from "../Config";
import { useAuthContext } from "../context/useStateContext";
import Syllabus from "./Syllabus/Syllabus";
import DayByday from "./DayByDay/DayByday";

const StudentDashboard = ({ auth }) => {
  const [student, setStudent] = useState([]);

  const navigate = useNavigate();
  // console.log(student);

  const { currentUser, setCurrentUser, getStudentData } = useAuthContext();
  useEffect(() => {
    getStudentData(auth);
  }, []);

  const goto = (url) => {
    navigate(url);
  };
  return (
    <>
      {currentUser ? (
        <section className=" px-5 py-2 bg-[var(--body-color)]">
          <div className="bg-[var(--theme-color)] mt-5 mb-5">
            <h1 className="font-extrabold text-3xl text-center text-white px-2 py-5">
              Welcome to SMS Education
            </h1>
          </div>
          {/* Profile */}
          <StudentProfile />
          <hr />
          <Syllabus />
          <hr />
          <Classes />
          <hr />
          <StudentAcademics />
          <hr />
          <StudentMarks />
          <hr />
          <StudentAssignments />
          <hr />
          <StudentPayments />
          <hr />
          <StudentQueries />

          {/* Footer */}
          <div className="bg-[var(--theme-color)] mt-5">
            <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
              &#169; 2023 SMS Education | All Rights Reserved
            </h1>
          </div>
        </section>
      ) : (
        <div className="text-xl font-semibold my-20 text-center">
          {" "}
          You are not authorized to view this page
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
