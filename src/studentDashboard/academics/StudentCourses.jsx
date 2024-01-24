import React, { useEffect, useState } from "react";
import StudentSingleCourse from "./StudentSingleCourse";
import baseurl from "../../Config";
import { useAuthContext } from "../../context/useStateContext";

const StudentCourses = ({ auth }) => {
  const [studentData, setStudentData] = useState([]);
  const [iname, setIname] = useState("");
  const [cname, setCname] = useState("");
  const { currentUser, setCurrentUser, getStudentData } = useAuthContext();
  // console.log("Student ID", auth);
  // console.log("Courses list", studentData);

  // useEffect(() => {
  //   getStudentData();
  // }, [auth]);

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

  function getInstructorData(id) {
    fetch(baseurl + "/api/instructor/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setIname(result[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
    return iname;
  }

  function getCategoryData(id) {
    fetch(baseurl + "/api/category/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCname(result[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
    return cname;
  }

  return (
    <>
      <div className="flex flex-row justify-around flex-wrap my-10">
        {studentData ? (
          <StudentSingleCourse
            courseId={currentUser.course}
            getInstructorData={getInstructorData}
            getCategoryData={getCategoryData}
          />
        ) : (
          studentData?.map((student) => {
            return (
              <StudentSingleCourse
                courseId={student.course}
                getInstructorData={getInstructorData}
                getCategoryData={getCategoryData}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default StudentCourses;
