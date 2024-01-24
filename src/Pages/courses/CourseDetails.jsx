import Aos from "aos";
import React, { useEffect, useState } from "react";
// import courseVideo from "../../assets/images/course-details/course-learn.jpg";
// import courseLearn from "../../assets/images/course-details/course-video.jpg";
// import pointingFinger from "../../assets/images/course-details/pointing-finger.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);
  const [catData, setCatData] = useState([]);
  const [instData, setInstData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(location.state);
  Aos.init({
    delay: 300,
    duration: 1000,
    // easing: "ease-in",
    mirror: false,
  });

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

  window.scroll(0, 0);
  return (
    <>
      {/* Course Details Heading */}
      <section className=" hero-container mb-10 sm:mb-5 flex items-start pb-3">
        <div className='h-[50vh] px-5 sm:px-6 md:px-8 lg:px-10 before:absolute before:top-0 before:left-0 before:content-[""] before:bg-[var(--bg-dark-blue)] before:w-full before:h-[70vh] before:-z-10 hero-section w-full before:bg-cover before:bg-center before:opacity-100  flex justify-around items-start'>
          <div className="mt-36  flex sm:flex-row lg:flex-row items-center justify-around w-full flex-wrap space-x-5 sm:space-x-7 ">
            <div className="text-white max-w-2xl">
              <div data-aos="fade-down" data-aos-delay="100">
                <h1 className="mb-2 text-4xl sm:text-6xl font-bold text-center leading-snug">
                  Course Details
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* <img src={heroLeftImg} className="absolute bottom-0 left-5" alt="" /> */}
      </section>

      {/* Course Details Container */}
      <section>
        {console.log(courseData.category)}
        <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row items-start">
          {/* Left */}
          <div className="w-full lg:w-4/6">
            {/* Rating div */}
            <div className="flex items-center">
              <div className="mx-2 text-lg text-[var(--bg-dark-blue)] font-semibold">
                {courseData.category
                  ? getCategoryName(courseData.category)
                  : ""}
              </div>
              <div className="mx-2 py-1 px-2 bg-[var(--golden)] text-white rounded-full">
                <span className="relative top-0.5">30% OFF</span>
              </div>
              <div className="flex space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  id="star"
                >
                  <path
                    style={{ marker: "none" }}
                    fill="#f8b84e"
                    d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z"
                    color="#000"
                    overflow="visible"
                    transform="matrix(.04574 0 0 .04561 68.85 -40.34)"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  id="star"
                >
                  <path
                    style={{ marker: "none" }}
                    fill="#f8b84e"
                    d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z"
                    color="#000"
                    overflow="visible"
                    transform="matrix(.04574 0 0 .04561 68.85 -40.34)"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  id="star"
                >
                  <path
                    style={{ marker: "none" }}
                    fill="#f8b84e"
                    d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z"
                    color="#000"
                    overflow="visible"
                    transform="matrix(.04574 0 0 .04561 68.85 -40.34)"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  id="star"
                >
                  <path
                    style={{ marker: "none" }}
                    fill="#f8b84e"
                    d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z"
                    color="#000"
                    overflow="visible"
                    transform="matrix(.04574 0 0 .04561 68.85 -40.34)"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  id="star"
                >
                  <path
                    style={{ marker: "none" }}
                    fill="#f8b84e"
                    d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z"
                    color="#000"
                    overflow="visible"
                    transform="matrix(.04574 0 0 .04561 68.85 -40.34)"
                  />
                </svg>{" "}
                (50)
              </div>
            </div>
            {/* Heading  */}
            <div className="my-5">
              <h1 className="text-5xl text-gray-900 font-extrabold">
                {courseData.title ? courseData.title : ""}
              </h1>
            </div>

            {/* Instructor */}
            {/* <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-gray-900 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 61.8 61.8"
                  id="avatar"
                  height={40}
                  width={40}
                  className="mr-2"
                >
                  <g data-name="Layer 2">
                    <g data-name="—ÎÓÈ 1">
                      <circle
                        cx="30.9"
                        cy="30.9"
                        r="30.9"
                        fill="#58b0e0"
                      ></circle>
                      <path
                        fill="#f9dca4"
                        fill-rule="evenodd"
                        d="m23.255 38.68 15.907.121v12.918l-15.907-.121V38.68z"
                      ></path>
                      <path
                        fill="#e6e6e6"
                        fill-rule="evenodd"
                        d="M43.971 58.905a30.967 30.967 0 0 1-25.843.14V48.417H43.97z"
                      ></path>
                      <path
                        fill="#e9573e"
                        fill-rule="evenodd"
                        d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z"
                      ></path>
                      <path
                        fill="#677079"
                        fill-rule="evenodd"
                        d="M25.657 61.332A34.072 34.072 0 0 1 15.9 57.92a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z"
                        opacity=".11"
                      ></path>
                      <path
                        fill="#ffe8be"
                        fill-rule="evenodd"
                        d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z"
                      ></path>
                      <path
                        fill="#f9dca4"
                        fill-rule="evenodd"
                        d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z"
                      ></path>
                      <path
                        fill="#464449"
                        fill-rule="evenodd"
                        d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0z"
                      ></path>
                      <path
                        fill="#677079"
                        fill-rule="evenodd"
                        d="M36.767 61.243a30.863 30.863 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861z"
                      ></path>
                      <path
                        fill="#fff"
                        fill-rule="evenodd"
                        d="m39.162 41.98-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378z"
                      ></path>
                      <path
                        fill="#fff"
                        fill-rule="evenodd"
                        d="m23.253 41.98 7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378z"
                      ></path>
                      <path
                        fill="#e9573e"
                        fill-rule="evenodd"
                        d="m28.109 51.227 3.137-2.818 3.137 2.818-3.137 2.817-3.137-2.817z"
                      ></path>
                      <path
                        fill="#434955"
                        fill-rule="evenodd"
                        d="M25.767 61.373a30.815 30.815 0 0 1-3.779-.88 2.652 2.652 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073zM36.645 61.266c.588-.098 1.17-.234 1.747-.384a56.83 56.83 0 0 0 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966z"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="relative top-0.5">Donald J. Miller</span>
              </div>
              <div className="font-light flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  id="backup"
                  fill="var(--bg-dark-blue)"
                  className="mr-2"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"></path>
                </svg>
                <span className="relative top-0.5">
                  Last Update February 15, 2022
                </span>
              </div>
              <div className="font-light flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  id="user"
                  fill="var(--bg-dark-blue)"
                  className="mr-2"
                >
                  <path d="M670.1 278.4c0 8.8-.6 17.6-1.7 26.3.5-3.5 1-7.1 1.4-10.6-2.4 17.4-7 34.3-13.7 50.5 1.3-3.2 2.7-6.4 4-9.6-6.7 15.8-15.3 30.6-25.8 44.2l6.3-8.1c-10.4 13.4-22.5 25.5-35.9 35.9l8.1-6.3c-13.6 10.4-28.4 19.1-44.2 25.8 3.2-1.3 6.4-2.7 9.6-4-16.2 6.7-33.1 11.3-50.5 13.7 3.5-.5 7.1-1 10.6-1.4-17.5 2.3-35.1 2.3-52.6 0 3.5.5 7.1 1 10.6 1.4-17.4-2.4-34.3-7-50.5-13.7 3.2 1.3 6.4 2.7 9.6 4-15.8-6.7-30.6-15.3-44.2-25.8l8.1 6.3c-13.4-10.4-25.5-22.5-35.9-35.9l6.3 8.1c-10.4-13.6-19.1-28.4-25.8-44.2 1.3 3.2 2.7 6.4 4 9.6-6.7-16.2-11.3-33.1-13.7-50.5.5 3.5 1 7.1 1.4 10.6-2.3-17.5-2.3-35.1 0-52.6-.5 3.5-1 7.1-1.4 10.6 2.4-17.4 7-34.3 13.7-50.5-1.3 3.2-2.7 6.4-4 9.6 6.7-15.8 15.3-30.6 25.8-44.2l-6.3 8.1c10.4-13.4 22.5-25.5 35.9-35.9l-8.1 6.3c13.6-10.4 28.4-19.1 44.2-25.8-3.2 1.3-6.4 2.7-9.6 4 16.2-6.7 33.1-11.3 50.5-13.7-3.5.5-7.1 1-10.6 1.4 17.5-2.3 35.1-2.3 52.6 0-3.5-.5-7.1-1-10.6-1.4 17.4 2.4 34.3 7 50.5 13.7-3.2-1.3-6.4-2.7-9.6-4 15.8 6.7 30.6 15.3 44.2 25.8l-8.1-6.3c13.4 10.4 25.5 22.5 35.9 35.9l-6.3-8.1c10.4 13.6 19.1 28.4 25.8 44.2-1.3-3.2-2.7-6.4-4-9.6 6.7 16.2 11.3 33.1 13.7 50.5-.5-3.5-1-7.1-1.4-10.6 1.1 8.7 1.6 17.5 1.7 26.3.1 20.9 18.3 41 40 40 21.6-1 40.1-17.6 40-40-.2-47.9-14.6-96.9-42.8-135.9-7.6-10.5-15.7-20.8-24.7-30.1-9.1-9.4-19.1-17.5-29.5-25.4-18.9-14.4-40-25-62.4-33.2-90.3-33.1-199.2-3.6-260.3 70.8-8.4 10.2-16.4 20.8-23.2 32.2-6.8 11.3-12.1 23.3-17 35.5-9.2 22.6-13.9 46.6-15.8 70.9-3.7 47.6 8.7 97.3 33.5 138.1 23.9 39.4 60 73.2 102.2 92.3 12.4 5.6 25.1 10.8 38.3 14.5 13.1 3.6 26.4 5.6 39.9 7.2 24.6 2.9 49.7.9 74-4 92.3-18.8 169.6-98.3 183.9-191.6 2.1-13.6 3.7-27.2 3.7-41 .1-20.9-18.5-41-40-40-21.6.7-39.8 17.3-39.8 39.7zm132.7 625.3H289.7c-22.7 0-45.4.2-68.1 0-2.5 0-5-.2-7.4-.5 3.5.5 7.1 1 10.6 1.4-4-.6-7.8-1.7-11.5-3.2 3.2 1.3 6.4 2.7 9.6 4-4-1.7-7.7-3.9-11.2-6.6l8.1 6.3c-3-2.5-5.8-5.2-8.2-8.2l6.3 8.1c-2.7-3.5-4.8-7.2-6.6-11.2 1.3 3.2 2.7 6.4 4 9.6-1.5-3.7-2.5-7.6-3.2-11.5.5 3.5 1 7.1 1.4 10.6-1.6-12.1-.5-24.9-.5-37.1v-42.8c0-10.7.6-21.3 2-31.9-.5 3.5-1 7.1-1.4 10.6 2.8-20.5 8.2-40.6 16.3-59.7-1.3 3.2-2.7 6.4-4 9.6 7.8-18.2 17.8-35.3 29.9-51l-6.3 8.1c12.1-15.5 26-29.5 41.6-41.6L283 673c15.7-12.1 32.8-22.1 51-29.9-3.2 1.3-6.4 2.7-9.6 4 19.1-8 39.1-13.5 59.7-16.3-3.5.5-7.1 1-10.6 1.4 14.8-1.9 29.5-2 44.4-2h183c16.5 0 32.9-.1 49.4 2-3.5-.5-7.1-1-10.6-1.4 20.5 2.8 40.6 8.2 59.7 16.3-3.2-1.3-6.4-2.7-9.6-4 18.2 7.8 35.3 17.8 51 29.9l-8.1-6.3c15.5 12.1 29.5 26 41.6 41.6l-6.3-8.1c12.1 15.7 22.1 32.8 29.9 51-1.3-3.2-2.7-6.4-4-9.6 8 19.1 13.5 39.1 16.3 59.7-.5-3.5-1-7.1-1.4-10.6 1.9 15.1 2 30.1 2 45.3v49.5c0 5.7.2 11.4-.5 17 .5-3.5 1-7.1 1.4-10.6-.6 4-1.7 7.8-3.2 11.5 1.3-3.2 2.7-6.4 4-9.6-1.7 4-3.9 7.7-6.6 11.2l6.3-8.1c-2.5 3-5.2 5.8-8.2 8.2l8.1-6.3c-3.5 2.7-7.2 4.8-11.2 6.6 3.2-1.3 6.4-2.7 9.6-4-3.7 1.5-7.6 2.5-11.5 3.2 3.5-.5 7.1-1 10.6-1.4-2.2.3-4.5.4-6.8.5-10.3.1-20.9 4.4-28.3 11.7-6.9 6.9-12.2 18.3-11.7 28.3 1 21.4 17.6 40.3 40 40 38.9-.6 73.1-26 84.5-63.3 4.5-14.8 3.5-30.7 3.5-45.9 0-34.8 1.1-69.3-4.9-103.8-8.8-50.5-34.2-98-69-135.3-34.8-37.3-81.6-64.7-131.1-76.9-28.4-7-57-8.1-86-8.1H422.4c-29.7 0-59.2 1.4-88.1 9.1-49.1 13-95.3 40.7-129.4 78.3-34.4 37.9-59.3 85.5-67.4 136.3-5.4 34.1-4.3 68.3-4.3 102.7 0 15.8-.9 32.3 4.8 47.4 7.4 19.4 19.2 34.7 36.5 46.2 13.5 8.9 30.6 13.2 46.6 13.4 7.8.1 15.6 0 23.4 0h558.4c20.9 0 41-18.4 40-40-1-21.8-17.6-40.1-40.1-40.1z"></path>
                </svg>
                <span className="relative top-0.5 w-fit">25 Enrolled</span>
              </div>
            </div> */}

            {/* course Image  */}
            <div className="my-10">
              <img src={`${baseurl}/api/coursepic/${courseData.img}`} className="w-full h-96 my-10" alt="" />
              {/* <p className="text-[var(--para2)]">
                {courseData.desc ? courseData.desc : ""}
              </p> */}
            </div>

            {/* Requirements */}
            <div className="my-10">
              <h2 className="text-3xl text-gray-900 font-extrabold">
                Description
              </h2>

              <div className="">
                {courseData.desc ? courseData.desc : ""}
              </div>
            </div>

          </div>
          {/* Right */}
          <div className="w-full lg:w-2/6 p-10">
            {/* <div className="relative">
              <img src={courseVideo} className="rounded-lg" alt="" />
              <div className="absolute top-[40%] left-[40%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="5.368 13.434 53.9 37.855"
                  id="youtube"
                >
                  <path
                    fill="#FFF"
                    d="M41.272 31.81c-4.942-2.641-9.674-5.069-14.511-7.604v15.165c5.09-2.767 10.455-5.301 14.532-7.561h-.021z"
                  ></path>
                  <path
                    fill="#E8E0E0"
                    d="M41.272 31.81c-4.942-2.641-14.511-7.604-14.511-7.604l12.758 8.575c.001 0-2.324 1.289 1.753-.971z"
                  ></path>
                  <path
                    fill="#CD201F"
                    d="M27.691 51.242c-10.265-.189-13.771-.359-15.926-.803-1.458-.295-2.725-.95-3.654-1.9-.718-.719-1.289-1.816-1.732-3.338-.38-1.268-.528-2.323-.739-4.9-.323-5.816-.4-10.571 0-15.884.33-2.934.49-6.417 2.682-8.449 1.035-.951 2.239-1.563 3.591-1.816 2.112-.401 11.11-.718 20.425-.718 9.294 0 18.312.317 20.426.718 1.689.317 3.273 1.267 4.203 2.492 2 3.146 2.035 7.058 2.238 10.118.084 1.458.084 9.737 0 11.195-.316 4.836-.57 6.547-1.288 8.321-.444 1.12-.823 1.711-1.479 2.366a7.085 7.085 0 0 1-3.76 1.922c-8.883.668-16.426.813-24.987.676zM41.294 31.81c-4.942-2.641-9.674-5.09-14.511-7.625v15.166c5.09-2.767 10.456-5.302 14.532-7.562l-.021.021z"
                  ></path>
                </svg>
              </div>
            </div> */}
            {/* Price */}
            <div className="flex items-center space-x-5 my-5 p-3 border">
              <div className="text-3xl font-extrabold text-[var(--golden)]">
                ₹{courseData.price ? courseData.price : ""}
              </div>
              <div className="text-sm bg-[var(--bg-dark-blue)] rounded-full py-1 px-3 text-white">
                25% OFF
              </div>
            </div>

            {/* Course details */}
            <div className="px-3">
              <div className="flex justify-between px-2 my-10">
                <div className="flex items-center text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="document"
                    height={20}
                    width={20}
                    className="mr-1"
                    fill="var(--bg-dark-blue)"
                  >
                    <path d="M9,10h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm0,2a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,13.05,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Zm-3-3H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"></path>
                  </svg>{" "}
                  Course Level
                </div>
                <div className="font-bold">
                  {courseData.level ? courseData.level : ""}
                </div>
              </div>
              <div className="flex justify-between px-2 my-10">
                <div className="flex items-center text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    id="clock"
                    height={20}
                    width={20}
                    className="mr-1"
                    fill="var(--bg-dark-blue)"
                  >
                    <path d="M12,6a.99974.99974,0,0,0-1,1v4.38379L8.56934,12.60693a.99968.99968,0,1,0,.89843,1.78614l2.98145-1.5A.99874.99874,0,0,0,13,12V7A.99974.99974,0,0,0,12,6Zm0-4A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"></path>
                  </svg>
                  Duration
                </div>
                <div className="font-bold">
                  {courseData.duration ? courseData.duration : ""}
                </div>
              </div>
              <div className="flex justify-between px-2 my-10">
                <div className="flex items-center text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    id="video-player"
                    height={25}
                    width={25}
                    className="mr-1 relative -top-1 -left-1"
                    fill="var(--bg-dark-blue)"
                    strokeWidth={3}
                  >
                    <g data-name="video">
                      <path d="M46,20.5H18a3,3,0,0,0-3,3v17a3,3,0,0,0,3,3H46a3,3,0,0,0,3-3v-17A3,3,0,0,0,46,20.5Zm1,20a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1v-17a1,1,0,0,1,1-1H46a1,1,0,0,1,1,1Z"></path>
                      <path d="M29.88,25.64a1,1,0,0,0-1.71.7V37.66a1,1,0,0,0,1,1,1,1,0,0,0,.71-.3l5.65-5.65a1,1,0,0,0,0-1.42Zm.29,9.6V28.76L33.41,32Z"></path>
                    </g>
                  </svg>
                  <span className="relative -left-1">Lectures</span>
                </div>
                <div className="font-bold">
                  {courseData.lessons ? courseData.lessons : ""} Lectures
                </div>
              </div>
              <div className="flex justify-between px-2 my-10">
                <div className="flex items-center text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="clipboard"
                    height={20}
                    width={20}
                    className="mr-1"
                    fill="var(--bg-dark-blue)"
                  >
                    <path d="M13,14H9a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2ZM17,4H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Zm-3-9H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"></path>
                  </svg>
                  Category
                </div>
                <div className="font-bold">
                  {courseData.category
                    ? getCategoryName(courseData.category)
                    : ""}
                </div>
              </div>
              <div className="flex justify-between px-2 my-10">
                <div className="flex items-center text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    id="language-translation"
                    height={20}
                    width={20}
                    className="mr-1"
                    fill="var(--bg-dark-blue)"
                  >
                    <path d="M21.05566,12h-2a1,1,0,0,0,0,2v2H17.8714a2.96481,2.96481,0,0,0,.18426-1A2.99955,2.99955,0,0,0,12.458,13.50049a.99992.99992,0,1,0,1.73242.999A1.0009,1.0009,0,0,1,15.05566,14a1,1,0,0,1,0,2,1,1,0,0,0,0,2,1,1,0,1,1,0,2,1.0009,1.0009,0,0,1-.86523-.49951.99992.99992,0,1,0-1.73242.999A2.99955,2.99955,0,0,0,18.05566,19a2.96481,2.96481,0,0,0-.18426-1h1.18426v3a1,1,0,0,0,2,0V14a1,1,0,1,0,0-2ZM9.08594,11.24268a.99963.99963,0,1,0,1.93945-.48536L9.26855,3.72754a2.28044,2.28044,0,0,0-4.4248,0L3.08594,10.75732a.99963.99963,0,1,0,1.93945.48536L5.58618,9H8.52545ZM6.0863,7l.6969-2.78711a.29222.29222,0,0,1,.5459,0L8.02563,7Zm7.96936,0h1a1.001,1.001,0,0,1,1,1V9a1,1,0,0,0,2,0V8a3.00328,3.00328,0,0,0-3-3h-1a1,1,0,0,0,0,2Zm-4,9h-1a1.001,1.001,0,0,1-1-1V14a1,1,0,0,0-2,0v1a3.00328,3.00328,0,0,0,3,3h1a1,1,0,0,0,0-2Z"></path>
                  </svg>
                  Language
                </div>
                <div className="font-bold">Hindi</div>
              </div>
            </div>
            <Button
              onClick={() => navigate("/contact")}
              className="w-full py-4 bg-[var(--bg-dark-blue)] hover:bg-[var(--golden)] uppercase transition-colors duration-500"
            >
              Enquiry Now
            </Button>
          </div>
        </div>

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
              Browser Latest Courses
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
                          src={`${baseurl}/api/coursepic/${course.img}`}
                          alt="img-blur-shadow"
                          layout="fill"
                          className="h-full w-full"
                        />
                        <div>Rs. 8K</div>
                      </CardHeader>
                      <CardBody>
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
                            <span className="text-start ">
                              Rs. {course.price && course.price}/-
                            </span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default CourseDetails;
