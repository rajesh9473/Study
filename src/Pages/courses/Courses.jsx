import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import Loader from "../../Components/Loader";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);
  const [catData, setCatData] = useState([]);
  const [instData, setInstData] = useState([]);


  useEffect(() => {
    getCourseList();
    getCategoryData();
    getInstructorData();
  }, []);

  const getCourseList = () => {
    fetch(baseurl + "/api/course ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCourses(result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  AOS.init({
    delay: 300,
    duration: 1000,
    // easing: "ease-in",
    mirror: false,
  });

  const navigation = useNavigate()

  function getCategoryData() {
    fetch(baseurl + "/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCatData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getInstructorData() {
    fetch(baseurl + "/api/instructor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setInstData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCategoryName(id) {
    let name = "";
    catData.forEach((item) => {
      if (item._id === id) {
        name = item.name;
      }
    });
    return name;
  }
  // function getInstructorName(id) {
  //   let name = "";
  //   instData.forEach((item) => {
  //     if (item._id === id) {
  //       name = item.name;
  //     }
  //   });
  //   return name;
  // }

  return (
    <main>
      {/* Courses Heading */}
      <section className=" hero-container mb-10 sm:mb-5 flex items-start pb-3">
        <div className='h-[60vh] px-5 sm:px-6 md:px-8 lg:px-10 before:absolute before:top-0 before:left-0 before:content-[""] before:bg-[var(--bg-dark-blue)] before:w-full before:h-[85vh] before:-z-10 hero-section w-full before:bg-cover before:bg-center before:opacity-100  flex justify-around items-start'>
          <div className="mt-32  flex sm:flex-row lg:flex-row items-center justify-around w-full flex-wrap space-x-5 sm:space-x-7 ">
            <div className="text-white max-w-2xl">
              <div data-aos="fade-down" data-aos-delay="100">
                <h1 className="mb-2 text-4xl   sm:text-6xl font-bold text-center leading-snug">
                  Courses
                </h1>
                <h3 className="flex items-center justify-center text-xl">
                  <Link
                    to="/"
                    className="hover:text-[var(--golden)] transition-colors duration-300"
                  >
                    Home
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 120 120"
                    id="arrow-right"
                    height={16}
                    width={16}
                    className="mx-3"
                  >
                    <path
                      fill="white"
                      d="M99.9 59.3c0-.3-.1-.5-.1-.7 0-.2-.1-.5-.2-.7-.1-.2-.2-.5-.3-.7-.1-.2-.2-.5-.3-.7-.1-.2-.2-.4-.4-.6-.1-.2-.3-.5-.5-.7-.1-.1-.1-.2-.2-.3L70.7 24.3c-2.9-3.2-7.8-3.5-11.1-.6-3.2 2.9-3.5 7.8-.6 11.1L81.6 60 59 85.3c-2.9 3.2-2.6 8.2.6 11.1 1.5 1.3 3.4 2 5.2 2 2.2 0 4.3-.9 5.8-2.6L98 65.2c.1-.1.1-.2.2-.3.2-.2.3-.4.5-.7.1-.2.3-.4.4-.6.1-.2.2-.5.3-.7.1-.2.2-.5.3-.7.1-.2.1-.5.2-.7 0-.2.1-.5.1-.7v-.7c-.1-.4-.1-.6-.1-.8z"
                    ></path>
                    <path
                      fill="white"
                      d="M61.2 64.9c.2-.2.3-.4.5-.7.1-.2.3-.4.4-.6.1-.2.2-.5.3-.7.1-.2.2-.5.3-.7.1-.2.1-.5.2-.7 0-.2.1-.5.1-.7v-1.4c0-.3-.1-.5-.1-.7 0-.2-.1-.5-.2-.7-.1-.2-.2-.5-.3-.7-.1-.2-.2-.5-.3-.7-.1-.2-.2-.4-.4-.6-.1-.2-.3-.5-.5-.7-.1-.1-.1-.2-.2-.3L33.7 24.3c-2.9-3.2-7.8-3.5-11.1-.6-3.2 2.9-3.5 7.8-.6 11.1L44.7 60 22 85.3c-2.9 3.2-2.6 8.2.6 11.1 1.5 1.3 3.4 2 5.2 2 2.2 0 4.3-.9 5.8-2.6L61 65.2c.1-.1.1-.2.2-.3z"
                    ></path>
                  </svg>{" "}
                  <span className="text-[var(--golden)] underline">About</span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* <img src={heroLeftImg} className="absolute bottom-0 left-5" alt="" /> */}
      </section>
      {/* Browse Latest Courses */}
      {loader ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <section className="my-10 p-5">
          <h3 className="text-[var(--bg-dark-blue)] text-xl text-center font-bold">
            Latest Courses
          </h3>
          <h1 className="text-5xl text-center font-semibold my-10">
            Browse Latest Courses
          </h1>
          {/* Oppotunities Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-around items-center mt-20 py-5  md:px-10">
            {courses &&
              courses.map((course) => {
                return (
                  <Card
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="m-10 w-72 sm:w-64 md:w-80 lg:w-72 xl:w-96 mx-auto"
                  >
                    <CardHeader color="blue-gray" className="relative h-56">
                      <img
                        src={baseurl + "/api/coursepic/" + course.img}
                        alt="img-blur-shadow"
                        layout="fill"
                        className="h-full w-full"
                      />
                      <div>Rs. 8K</div>
                    </CardHeader>
                    <CardBody className="pb-2">
                      <Typography variant="h6" color="blue" className="mb-2">
                        {course.category
                          ? getCategoryName(course.category)
                          : ""}
                      </Typography>
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="mb-2 cursor-pointer hover:text-[var(--golden)]"
                      >
                        <Link
                          to="/course/course-details"
                          className="hover:text-[var(--golden)] transition-colors duration-300"
                          state={course}
                        >
                          {course.title && course.title}
                        </Link>
                      </Typography>
                      {/* <Typography className="mb-2 h-14 overflow-hidden">
                        {course.desc && course.desc}
                      </Typography> */}
                    </CardBody>
                    <CardFooter className="pt-0">
                      <div className=" flex justify-between items-center text-center">
                        {/* <div className="flex items-center text-sm m-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                            />
                          </svg>
                          <span className=" text-start  pl-1">
                            By{" "}
                            <span className="font-bold">
                              {course.instructor
                                ? getInstructorName(course.instructor)
                                : ""}
                            </span>
                          </span>
                        </div> */}
                        <div className="flex items-center text-sm m-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>

                          <span className="text-start ">
                            {" "}
                            {course && course.lessons} Lessons
                          </span>
                        </div>
                        <div className="flex items-center text-sm m-1">
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg> */}
                          {/* <span className="text-start ">
                            Rs. {course.price && course.price}/-
                          </span> */}
                          <Button onClick={() => navigation('/contact')} size="sm">Enquiry Now</Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </section>
      )}
    </main>
  );
};

export default Courses;
