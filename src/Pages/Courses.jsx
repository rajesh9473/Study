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
import baseurl from "../Config";
import { functions } from "../functions";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);
  const [catId, setCatId] = useState("");
  const [catData, setCatData] = useState("");

  // console.log("CatId", catId);
  // console.log("catData", catData);

  useEffect(() => {
    getCourseList();
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

  console.log(
    "Function",
    functions.getSingleCategory("648404f02c0a3dd73ea0144c")
  );

  // useEffect(() => {
  //   setCatData(functions.getSingleCategory(catId));
  // }, [catId]);

  AOS.init({
    delay: 300,
    duration: 1000,
    // easing: "ease-in",
    mirror: false,
  });

  // const getSingleCategory = async function (id) {
  //   let cat = await fetch(baseurl + "/api/category/" + id, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((result) => {
  //       return result[0].name;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log("Cat API", cat);

  //   return cat;
  // };

  return (
    <main>
      {/* Courses Heading */}
      <section className=" hero-container mb-10 sm:mb-5 flex items-start pb-3">
        <div className='h-[50vh] px-5 sm:px-6 md:px-8 lg:px-10 before:absolute before:top-0 before:left-0 before:content-[""] before:bg-[var(--bg-dark-blue)] before:w-full before:h-[70vh] before:-z-10 hero-section w-full before:bg-cover before:bg-center before:opacity-100  flex justify-around items-start'>
          <div className="mt-36  flex sm:flex-row lg:flex-row items-center justify-around w-full flex-wrap space-x-5 sm:space-x-7 ">
            <div className="text-white max-w-2xl">
              <div data-aos="fade-down" data-aos-delay="100">
                <h1 className="mb-2 text-4xl   sm:text-6xl font-bold text-center leading-snug">
                  Courses
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* <img src={heroLeftImg} className="absolute bottom-0 left-5" alt="" /> */}
      </section>
      {/* Browse Latest Courses */}
      <section className="my-10 p-5">
        <h3 className="text-[var(--bg-dark-blue)] text-xl text-center font-bold">
          Latest Courses
        </h3>
        <h1 className="text-5xl text-center font-semibold my-10">
          Browser Latest Courses
        </h1>
        {/* Oppotunities Container */}
        <div className="flex justify-around items-center mt-20 py-5  flex-wrap md:px-10">
          {courses &&
            courses.map((course) => {
              return (
                <Card
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="m-10 w-96 mx-auto"
                >
                  <CardHeader color="blue-gray" className="relative h-56">
                    <img
                      src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                      alt="img-blur-shadow"
                      layout="fill"
                    />
                    <div>Rs. 8K</div>
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h6" color="blue" className="mb-2">
                      Networking{" "}
                      {/* {course.category
                        ? getSingleCategory(course.category)
                        : ""} */}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                      {course.title && course.title}
                    </Typography>
                    <Typography className="mb-2">
                      {course.desc && course.desc}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <div className=" flex justify-between items-center text-center">
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
                            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                          />
                        </svg>
                        <span>
                          By <span className="font-bold">Amit Singh</span>
                        </span>
                      </div>
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

                        <span> {course && course.lessons} Lessons</span>
                      </div>
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
                            d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Rs. {course.price && course.price}/-</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default Courses;
