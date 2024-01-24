import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../../Config";
import Loader from "../../Components/Loader";

const StudentSingleCourse = ({
  courseId,
  getInstructorData,
  getCategoryData,
}) => {
  const [course, setCourse] = useState("");
  const [instName, setInstName] = useState("");
  const [catName, setCatName] = useState("");

  const [loader, setLoader] = useState(true);

  // console.log("Course Details", course);
  // console.log("Instructor Name", instName);
  // console.log("Category Name ", catName);

  useEffect(() => {
    getCourseList();
  }, [courseId]);

  useEffect(() => {
    // If course true then only
    if (course) {
      getInstName();
      getCatName();
    }
  }, [course]);

  const getCourseList = async () => {
    try {
      const res = await fetch(baseurl + "/api/course/" + courseId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setCourse(result[0]);
      setLoader(false);
      // console.log(result);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  

  const getInstName = () => {
    let inst = getInstructorData(course.instructor);
    setInstName(inst);
  };

  const getCatName = () => {
    let cat = getCategoryData(course.category);
    setCatName(cat);
    console.log("Function return", cat);
  };

  const navigate = useNavigate();
  const coursedetails = () => {
    navigate("/student/academic/course/" + courseId);
  };
  return (
    <>
      {course ? (
        <>
          <div
            onClick={coursedetails}
            className="w-64 bg-white m-3 rounded-lg border shadow-xl  flex flex-col justify-center text-center items-center hover:-translate-y-4 transition cursor-pointer"
          >
            {course.img ? (
              <img
                src={`${baseurl}/api/coursepic/${course.img}`}
                className="h-40 w-full rounded-tr-lg rounded-tl-lg"
                alt=""
              />
            ) : (
              ""
            )}

            <div className="py-5 px-3 flex flex-col justify-center items-center flex-grow">
              <h5 className="text-lg font-bold ">{course.title}</h5>
              {/* <p>{course.desc}</p> */}
              <p className="text-xs flex items-center my-2">
                {/* <img src={man} className="h-5 w-5 rounded-full mx-2" alt="" /> */}
                Instructor : {instName ? instName : "-"}
              </p>
              <p className="text-xs flex items-center my-2">
                Category : {catName ? catName : "-"}
              </p>
            </div>
          </div>
        </>
      ) : !loader && !course ? (
        "No Course"
      ) : (
        <>
          {loader && (
            <div className="w-full h-[30vh] flex justify-center items-center">
              <Loader />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default StudentSingleCourse;
