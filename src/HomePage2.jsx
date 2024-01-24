import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import oppor1 from "./assets/images/homepage/oppor1.png";
import oppor2 from "./assets/images/homepage/oppor2.png";
import oppor3 from "./assets/images/homepage/oppor3.png";
import about2 from "./assets/images/homepage/about-img-2.jpg";
import abtIco from "./assets/images/homepage/abt-ico.png";
import asInstructor from "./assets/images/homepage/join-instructor.png";
import asStudent from "./assets/images/homepage/join-student.png";
import DivyanshiSingh from "./assets/images/homepage/staff/Divyanshi-singh-(Teacher).jpeg";
import PratishthaDwivedi from "./assets/images/homepage/staff/Pratishtha-Dwivedi (Evening-manager).jpeg";
import PrabhatKumarSharma from "./assets/images/homepage/staff/Prabhat-kumar Sharma-(Teacher).png";
import MukeshKumar from "./assets/images/homepage/staff/Mukesh-kumar-(Teacher).jpeg";
import KomalVerma from "./assets/images/homepage/staff/Komal-verma-(Morning-manager).jpg";
import AnujSrivastava from "./assets/images/homepage/staff/Anuj-Srivastava-(Teacher).JPG";
import premise14 from "./assets/images/homepage/premises/premise14.JPG";
import classroom6 from "./assets/images/homepage/premises/classroom/classroom6.JPG";
import classroom4 from "./assets/images/homepage/premises/classroom/classroom4.JPG";
import director from "./assets/images/homepage/team/director.jpeg";
import directorAvatar from "./assets/images/homepage/team/director-avatar.jpeg";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import baseurl from "./Config";
import premise1 from "./assets/images/homepage/premises/premise1.JPG";
import ModalJoinInstructor from "./Components/ModalJoinInstructor";
import { Carousel } from "@material-tailwind/react";
import { GlobalModal } from "./Components/GlobalModal";
import TestSlider from "./Components/TestSlider";
import InstructorList from "./Components/InstructorList";
const HomePage2 = () => {
  const [viewAcheiver, setViewAcheiver] = useState(false);
  const [viewAcheiver2, setViewAcheiver2] = useState(false);
  const [studentMonth, setStudentMonth] = useState([]);
  const [instructorMonth, setInstructorMonth] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(true);
  const [catData, setCatData] = useState([]);
  const [instData, setInstData] = useState([]);

  const [Modalopen, setModalOpen] = useState(false);

  const ModalhandleOpen = () => setModalOpen(!Modalopen);
  // const [studentOfMonth,]
  const navigate = useNavigate();
  // console.log(events);

  useEffect(() => {
    StudentOfTheMonthList();
    InstructorOfTheMonthList();
    getCourseList();
    getEventsList();
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
        // setCourses(result);
        let filteredData = result;
        setCourses(filteredData);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const StudentOfTheMonthList = () => {
    fetch(baseurl + "/api/studentofmonth ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setStudentMonth(result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const InstructorOfTheMonthList = () => {
    fetch(baseurl + "/api/instructorofmonth ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setInstructorMonth(result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEventsList = () => {
    fetch(baseurl + "/api/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setEvents(result);
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
        console.log(result);
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
  function getInstructorName(id) {
    let name = "";
    instData.forEach((item) => {
      if (item._id === id) {
        name = item.name;
      }
    });
    return name;
  }

  AOS.init({
    delay: 300,
    duration: 1000,
    // easing: "ease-in",
    mirror: false,
  });

  const staff = [
    {
      img: DivyanshiSingh,
      name: "Divyanshi Singh",
      position: "Teacher",
    },
    {
      img: PratishthaDwivedi,
      name: "Pratishtha Dwivedi",
      position: "Evening Manager",
    },
    {
      img: PrabhatKumarSharma,
      name: "Prabhat Kumar Sharma",
      position: "Teacher",
    },
    {
      img: MukeshKumar,
      name: "Mukesh Kumar",
      position: "Teacher",
    },
    {
      img: KomalVerma,
      name: "Komal Verma",
      position: "Morning Teacher",
    },
    {
      img: AnujSrivastava,
      name: "Anuj Srivastava",
      position: "Teacher",
    },
  ];

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className=" relative top-[-96px] bg-cover bg-[#00000070] hero-container mb-10 sm:mb-5 flex items-start">
          <Carousel
            className="h-[140vh]"
            autoplay
            prevArrow={false}
            nextArrow={false}
            navigation={false}
            loop={true}
          >
            <img
              src={premise1}
              alt="Premise"
              className="h-full w-full object-cover"
            />
            <img
              src={premise14}
              alt="Premise"
              className="h-full w-full object-cover"
            />
            <img
              src={classroom6}
              alt="Classroom"
              className="h-full w-full object-cover"
            />
          </Carousel>

          {/* Hero Section Content */}
          <div className="h-[140vh] absolute top-0 left-0 bg-[#00000070] px-5 sm:px-6 md:px-8 lg:px-10 hero-section w-full flex justify-around items-center z-10">
            <div className="mt-28  flex sm:flex-row lg:flex-row items-center justify-around w-full flex-wrap space-x-5 sm:space-x-7 ">
              <div className="text-white max-w-2xl">
                <div data-aos="fade-down" data-aos-delay="100">
                  <h1
                    style={{ fontFamily: "Lumanosimo" }}
                    className="mb-2 text-5xl uppercase  sm:text-6xl font-bold text-center leading-snug"
                  >
                    SMS Education
                  </h1>
                  <h1 className="mb-2 mt-4   sm:text-2xl font-bold text-center leading-snug">
                    Nielit Authorized Computer Center
                  </h1>
                </div>

                <div
                  data-aos="fade-down"
                  data-aos-delay="500"
                  className="flex items-center justify-center flex-wrap my-5 "
                >
                  <div className="m-3 flex items-center font-semibold">
                    <div className="w-7 h-7 flex justify-center items-center bg-[var(--golden)] rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <span className="mx-3 text-lg">Experts Advisors</span>
                  </div>
                  <div className="m-3 flex items-center font-semibold">
                    <div className="w-7 h-7 flex justify-center items-center bg-[var(--golden)] rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <span className="mx-3 text-lg">538+ Courses</span>
                  </div>
                  <div className="m-3 flex items-center font-semibold">
                    <div className="w-7 h-7 flex justify-center items-center bg-[var(--golden)] rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <span className="mx-3 text-lg">Events & Program</span>
                  </div>
                </div>

                {/* Button  */}
                <div
                  data-aos="fade-down"
                  data-aos-delay="1000"
                  className="flex items-center justify-center flex-wrap"
                >
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-white hover:text-[var(--golden)] bg-[var(--golden)] hover:bg-white text-lg font-semibold px-10 py-4 rounded-md transition-colors duration-500"
                  >
                    <div className="flex items-center justify-center">
                      Get Started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* testimonial */}
                <div
                  data-aos="fade-up"
                  className="relative mt-36 mx-auto px-5 sm:px-6 md:px-8 lg:px-10 text-[#1c317c] bg-white font-extrabold w-[80%] sm:w-fit max-w-lg sm:max-w-xl py-10 leading-6 rounded-lg  shadow-lg"
                >
                  <div
                    className=" opacity-90 text-2xl"
                    style={{ fontFamily: "Mynerve, cursive" }}
                  >
                    If sky is your limit, Then we provide base . . .
                  </div>
                  <div className="flex items-center mt-7 opacity-90">
                    <div className="h-0.5 w-7 bg-[var(--golden)]"></div>
                    <span className="mx-3">SMS Education</span>
                  </div>
                  <img
                    src={directorAvatar}
                    className="absolute -top-8 -left-8 opacity-100 rounded-full w-16 h-16"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fixed top-[30%] right-0 z-50">
          <div className="h-12 w-12 my-1 flex justify-center items-center border border-gray-500 bg-white hover:scale-105 hover:-translate-x-3 transition-all duration-500">
            <a
              href="https://api.whatsapp.com/send?phone=918090004415&text=I%20want%20to%20enquire%20about%20fees"
              target="_blank"
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
                fillRule="evenodd"
                clipRule="evenodd"
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 13333.33 13333.33"
                id="whatsapp-logo"
              >
                <path
                  fill="#3c3"
                  d="M4368.28 2476.11l4596.93 0c1027.92,0 1867.22,841.16 1867.22,1867.37l0 4644.48c0,1028.14 -839.3,1869.26 -1867.22,1869.26l-4596.93 0c-1028.07,0 -1867.35,-841.12 -1867.35,-1869.26l0 -4644.48c0,-1026.2 839.28,-1867.37 1867.35,-1867.37l0 0z"
                ></path>
                <path
                  fill="#fefefe"
                  d="M6716.35 8886.92c-469.18,0 -904.19,-141.18 -1270.46,-379.6l-884.95 280.41 286.13 -852.62c-276.57,-373.83 -440.65,-843.08 -440.65,-1344.72 0,-74.39 5.7,-144.96 15.26,-219.35 112.55,-1161.62 1100.61,-2069.53 2294.67,-2069.53 1213.07,0 2210.65,932.72 2304.05,2111.5 3.84,61.03 3.84,122.06 3.84,177.39 0,1264.61 -1035.6,2296.54 -2307.89,2296.54zm2742.7 -2361.39c-36.19,-1474.44 -1249.26,-2655.12 -2742.7,-2655.12 -1476.45,0 -2679.98,1152.08 -2740.97,2603.62 -3.85,38.15 -3.85,80.11 -3.85,116.35 0,516.9 144.96,997.54 392.96,1411.49l-495.94 1461.09 1522.14 -482.58c392.96,215.51 846.79,335.7 1325.66,335.7 1516.29,0 2748.55,-1216.94 2748.55,-2725.7 0,-22.89 -5.85,-41.96 -5.85,-64.85z"
                ></path>
                <path
                  fill="#fefefe"
                  d="M7517.45 6901.28c-66.9,-17.17 -108.75,-32.43 -156.46,38.16 -68.72,108.72 -213.67,347.14 -354.76,276.57 -70.55,-32.43 -286.04,-103.01 -543.57,-331.9 -200.32,-179.3 -337.58,-394.83 -373.95,-459.67 -59.04,-110.63 127.76,-226.99 196.48,-366.22 22.85,-45.79 13.34,-83.93 -5.67,-116.35 -13.34,-32.43 -148.78,-364.31 -205.99,-495.92 -55.38,-135.44 -112.59,-112.54 -148.78,-112.54 -373.96,0 -549.42,265.13 -549.42,637.06 0,74.39 15.35,154.52 38.2,225.09 66.71,238.43 215.49,431.07 238.52,463.5 32.35,45.77 463.52,740.07 1148.19,1007.14 688.51,267 688.51,177.36 810.6,167.8 120.27,-9.49 396.8,-158.32 454.01,-318.54 55.38,-154.48 55.38,-289.93 36.19,-318.52 -22.85,-40.05 -583.59,-293.74 -583.59,-295.65z"
                ></path>
              </svg>
            </a>
          </div>
          <div className="h-12 w-12 my-1 flex justify-center items-center border border-gray-500 bg-white hover:scale-105 hover:-translate-x-3 transition-all duration-500">
            <a href="tel:+918090004415" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                id="phone-calling"
                height={30}
                width={30}
                fill="var(--bg-dark-blue)"
              >
                <path d="M439.62 396.531a3153555.92 3153555.92 0 0 1-54.398-65.832c-1.45-1.755-3.067-3.614-5.289-4.107-2.903-.643-5.7 1.25-8.073 3.043l-40.219 30.384c-8.03 6.067-17.968 12.468-27.433 9.051-5.483-1.98-9.312-6.857-12.834-11.504-20.403-26.911-40.806-53.824-61.211-80.735l-.372-.507-58.748-82.546c-3.381-4.75-6.89-9.86-7.141-15.684-.432-10.055 8.647-17.625 16.836-23.475 13.673-9.765 27.345-19.532 41.017-29.298 2.42-1.728 5.064-3.832 5.317-6.794.195-2.268-1.097-4.367-2.338-6.274l-46.561-71.589c-5.304-8.154-11.224-16.814-20.362-20.15-10.658-3.889-22.367.601-32.784 5.096-17.341 7.483-35.259 15.614-47.316 30.152-20.164 24.317-19.45 60.744-17.678 90.53 2.075 34.883 13.587 70.892 27.119 102.854 13.997 33.06 32.551 64.087 54.536 92.485 20.489 29.369 44.486 56.266 71.773 79.438 26.456 22.467 57.378 44.216 90.045 56.624 27.893 10.595 62.442 22.164 91.674 10.19 17.477-7.16 30.593-21.828 42.918-36.139 7.403-8.597 15.188-18.429 14.661-29.763-.448-9.713-6.943-17.952-13.139-25.45z"></path>
              </svg>
            </a>
          </div>
          <div className="h-12 w-12 my-1 flex justify-center items-center border border-gray-500 bg-white hover:scale-105 hover:-translate-x-3 transition-all duration-500">
            <Link to="/contact" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                id="help-desk"
                height={30}
                width={30}
              >
                <g data-name="17. Info">
                  <circle cx="49" cy="6" r="6" fill="#88b8f9"></circle>
                  <path
                    fill="#88b8f9"
                    d="M63.23,25.93,57.57,15.46c0-.08-.09,0-.14-.12A3,3,0,0,0,55,14H54c-.84.68-.55.28-1.12.82-1.08.73-2.72,1.7-3.88,1.7a8.26,8.26,0,0,1-3.73-1.6,2.91,2.91,0,0,0-.57-.47A2.4,2.4,0,0,1,44,14H43a3,3,0,0,0-2.44,1.43l-3.17,4.95-6.07-4.89a2,2,0,0,0-2.64,3c10.68,10.13,7.12,6.7,7.85,7.43a2.32,2.32,0,0,0,3.28-.33l2.73-3.24L42,32H56l-.1-1.77L51,30a3,3,0,0,1,0-6l4.59-.22,0-.53,1,1.49L51,25a2,2,0,0,0,0,4l10,.47A2.4,2.4,0,0,0,63.23,25.93Z"
                  ></path>
                  <path
                    fill="#fffeff"
                    d="M54,14c-2.93,5.28-1.79,3.21-5,9l-5-9Z"
                  ></path>
                  <polygon
                    fill="#0c3798"
                    points="51.67 18.19 49 23 46.33 18.19 48 14 50 14 51.67 18.19"
                  ></polygon>
                  <rect
                    width="46"
                    height="4"
                    x="18"
                    y="29"
                    fill="#f8cf6d"
                  ></rect>
                  <rect
                    width="44"
                    height="24"
                    x="20"
                    y="33"
                    fill="#ee7231"
                  ></rect>
                  <circle cx="15" cy="16" r="6" fill="#88b8f9"></circle>
                  <path
                    fill="#2f79f0"
                    d="M34.6,28a2,2,0,0,0-2.76-.61l-5.08,3.26c-3.45-5.41-3.4-5.35-3.55-5.53A3,3,0,0,0,21,24H9a3,3,0,0,0-2.72,1.9L.19,41.15a2,2,0,0,0,3.62,1.7l4.72-8.61C7.87,48.79,8,42.59,8,62a2,2,0,0,0,4,.25S14,46.06,14,46h2c0,.06,2,16.25,2,16.25A2,2,0,0,0,22,62c0-19.4.15-12.72-.62-29.74l2.83,3.37a2.29,2.29,0,0,0,3.2.35l6.75-5.35A2,2,0,0,0,34.6,28Z"
                  ></path>
                  <path
                    fill="#fffeff"
                    d="M20,24c-3.25,7.15-2.08,4.59-5,11-2.92-6.41-1.75-3.85-5-11Z"
                  ></path>
                  <polygon
                    fill="#0c3798"
                    points="17.42 29.68 15 35 12.58 29.68 14 24 16 24 17.42 29.68"
                  ></polygon>
                  <rect
                    width="10"
                    height="12"
                    x="23"
                    y="9"
                    fill="#f8cf6d"
                    rx="1"
                  ></rect>
                  <circle cx="42" cy="38" r="2" fill="#fffeff"></circle>
                  <path
                    fill="#fffeff"
                    d="M44,43V53a1,1,0,0,1-1,1H41a1,1,0,0,1-1-1V44H39a1,1,0,0,1-1-1h0a1,1,0,0,1,1-1h4A1,1,0,0,1,44,43Z"
                  ></path>
                </g>
              </svg>
            </Link>
          </div>
        </section>

        {/* About Us */}
        <section className="my-10 p-5">
          {/* About Container */}
          <div className="flex flex-col lg:flex-row justify-around xl:max-w-[90%] mx-auto">
            {/* left */}
            <div
              data-aos="fade-right"
              data-aos-easing="linear"
              className="w-full lg:w-6/12 md:w-10/12 sm:w-9/12 mx-auto"
            >
              <div className="relative flex justify-end p-2">
                <img src={premise14} className="w-80 h-64 rounded-2xl" alt="" />
                <div className="absolute top-24 left-0 px-5 py-3 rounded-full text-xl font-bold flex items-center bg-white h-fit w-fit">
                  <img src={abtIco} className="mr-2" alt="" />
                  Experience Advisor
                </div>
              </div>
              <div className="relative -top-16 flex justify-start p-2">
                <img
                  src={classroom6}
                  className="w-80 h-64 rounded-2xl"
                  alt=""
                />
                <div className="absolute top-28 right-0 px-5 py-3 rounded-full text-xl font-bold flex items-center bg-white h-fit w-fit">
                  <img src={abtIco} className="mr-2" alt="" />
                  Experience Advisor
                </div>
              </div>
              <div className="relative -top-28 flex justify-end p-2">
                <img
                  src={classroom4}
                  className="w-80 h-64 rounded-2xl"
                  alt=""
                />
                <div className="absolute top-28 left-0 px-5 py-3 rounded-full text-xl font-bold flex items-center bg-white h-fit w-fit">
                  <img src={abtIco} className="mr-2" alt="" />
                  Experience Advisor
                </div>
              </div>
            </div>

            {/* Right */}
            <div data-aos="fade-up" data-aos-easing="linear" className="p-2">
              <h3 className="text-[var(--bg-dark-blue)] text-xl font-bold">
                About SMS
              </h3>
              <h1 className="text-5xl font-semibold my-5 lg:max-w-sm leading-tight">
                Experience To Learning Center
              </h1>
              <p className="lg:max-w-sm leading-7 mb-3 text-[var(--dash-text-color)]">
                SMS Education is a well-diversified an autonomous institute in
                the field of computer literacy, governed by distinctive and
                highly qualified professionals. SMS Education involves in
                preparing skilled computer professional environment.
              </p>
              {/* Button and How it works*/}
              <div className="flex items-center justify-center">
                <Link to="/about">
                  <button className="text-white hover:text-[var(--golden)] bg-[var(--golden)] hover:bg-[#204ecf] text-lg px-10 py-4 rounded-md transition-colors duration-500">
                    <div className="flex items-center justify-center uppercase">
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
              <div className="mt-5 flex justify-around items-center">
                {/* Counter 1 */}
                <div className="w-fit h-fit py-3 px-2 m-2 text-center">
                  <span className="text-4xl text-[var(--bg-dark-blue)] font-extrabold">
                    25 +
                  </span>
                  <p className="text-[var(--dash-text-color)] font-semibold mt-2">
                    Enrolled Learner
                  </p>
                </div>
                {/* Counter 2 */}
                <div className="w-fit h-fit py-3 px-2 m-2 text-center">
                  <span className="text-4xl text-[var(--bg-dark-blue)] font-extrabold">
                    25 +
                  </span>
                  <p className="text-[var(--dash-text-color)] font-semibold mt-2">
                    Finished Session
                  </p>
                </div>
                {/* Counter 3 */}
                <div className="w-fit h-fit py-3 px-2 m-2 text-center">
                  <span className="text-4xl text-[var(--bg-dark-blue)] font-extrabold">
                    25 %
                  </span>
                  <p className="text-[var(--dash-text-color)] font-semibold mt-2">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section>
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Meet Our Team
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern
                        id="1d4040f3-9f3e-4ac7-b117-7d4009658ced"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                      >
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#1d4040f3-9f3e-4ac7-b117-7d4009658ced)"
                      width="52"
                      height="24"
                    />
                  </svg>
                  <span className="relative">Welcome</span>
                </span>{" "}
                our talented team of professionals
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Meet our exceptional team of skilled tech enthusiasts, dedicated
                to guiding you on a transformative learning journey. With their
                expertise and passion, they empower you to conquer the digital
                world with confidence
              </p>
            </div>
            <InstructorList />
            {/* <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <GlobalModal
                content={"modal"}
                handleOpen={ModalhandleOpen}
                open={Modalopen}
              />
              {instData.map((item) => {
                return (
                  <div
                    onClick={ModalhandleOpen}
                    className="relative overflow-hidden transition duration-300 transform rounded-full shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <img
                      className="object-cover object-top rounded-full !aspect-square w-full h-[100%] md:h-[100%] xl:h-[100%]"
                      src={baseurl + "/api/teacherpic/" + item.profilePic}
                      alt="Person"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                      <p className="mb-1 text-lg font-bold text-gray-100">
                        {item.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>
        </section>

        {/* Location */}
        <section data-aos="fade-up" className="mt-20 mb-10 p-5">
          <h1 className="text-5xl text-center font-semibold my-10 pb-10">
            Locations
          </h1>

          <Card
            shadow={false}
            className="relative grid h-[28rem] w-full max-w-[80rem] mx-auto items-center justify-center overflow-hidden text-center"
          >
            {/* <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('./assets/images/homepage/premises/premise7.JPG')] bg-cover bg-no-repeat bg-bottom"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader> */}
            {/* <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-medium leading-[1.5]"
              >
                SMS - Sarojini Nagar
              </Typography>
              <Typography
                variant="h5"
                color="white"
                className="mb-6 font-medium leading-[1.5]"
              >
                Kudrat Vihar Colony, Sarojini Nagar, Lucknow, Uttar Pradesh -
                226008
              </Typography>
              <a
                href="https://goo.gl/maps/NKysRroC4qWoepn86"
                target="_blank"
                className="inline-block"
              >
                <Button variant="text" className="flex items-center gap-2">
                  View on Map
                  <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                </Button>
              </a>
            </CardBody> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.0134002976224!2d80.85737987516285!3d26.743948467323357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bf9c497a21e69%3A0xe6ed5041cf605d0e!2sSMS%20EDUCATION!5e0!3m2!1sen!2sin!4v1692184343262!5m2!1sen!2sin"
              height="450"
              width="1280"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Card>
        </section>

        {/* SPECIAL FEATURES */}
        <section data-aos="fade-up" className="mt-20 mb-10 p-5">
          <h1 className="text-5xl text-center font-semibold my-10">
            SPECIAL FEATURES
          </h1>
          <div className=" my-20">
            <ul className="w-fit mx-5 sm:mx-10 md:mx-20 space-y-4 text-left font-semibold text-black flex flex-col md:flex-row md:justify-start md:flex-wrap ">
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>Highly qualified and dedicated faculty.</span>
              </li>
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>Most modern computer lab.</span>
              </li>
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>Latest hardware and software.</span>
              </li>
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>Courses are designed to impart job-oriented skills.</span>
              </li>
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>
                  Specialized short-term courses for the executives, businessman
                  and educated housewives.
                </span>
              </li>
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>Internet access</span>
              </li>
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>
                  Multimedia supported tutorial package based on "DO YOURSELF"
                </span>
              </li>
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>Special practical timing for meritorious students.</span>
              </li>
              <li className="flex items-center space-x-3 w-full md:w-1/2 p-2">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>
                  Scholarship and fee concession for those having exceptional
                  academic record.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Our Pride */}
        <section data-aos="fade-up" className="my-10 p-5">
          <h1 className="text-5xl text-center font-semibold my-10">
            Our Pride
          </h1>

          {/* Monthly Acheivers */}
          <div className="flex flex-col md:flex-row justify-center md:justify-around items-center md:items-start  my-10 py-20">
            {/* Instructor Of The Month */}
            <div
              onMouseEnter={() => setViewAcheiver(true)}
              onMouseLeave={() => setViewAcheiver(false)}
              className={`${viewAcheiver ? "shadow-2xl" : "shadow-none"
                } relative w-64 h-40 rounded-2xl border hover:h-96  transition-all  duration-500`}
            >
              <div
                className={`${viewAcheiver ? "-top-20" : ""
                  } relative -top-16 transition-all left-4 z-20`}
              >
                <img
                  src={`${baseurl}/api/instructorofmonths/${instructorMonth.img}`}
                  className="w-56 h-56 rounded-full"
                  alt=""
                />
                <div className="text-xl font-bold my-1 ">
                  Instructor Of The Month 🏆
                </div>
              </div>
              <div
                className={`${viewAcheiver ? "block" : "hidden"
                  } relative -top-20 text-center p-3 animate__animated animate__fadeIn animate__slow`}
              >
                <h2 className="text-2xl font-extrabold text-center text-[black]">
                  {instructorMonth.name ? instructorMonth.name : ""}
                </h2>
                <p className="my-2">
                  <span className="font-bold">Course :</span>{" "}
                  {instructorMonth.course ? instructorMonth.course : ""}
                </p>
                <p>
                  <span className="font-bold">Description :</span>{" "}
                  {instructorMonth.desc ? instructorMonth.desc : ""}
                </p>
              </div>
            </div>
            {/* Student Of The Month */}
            <div
              onMouseEnter={() => setViewAcheiver2(true)}
              onMouseLeave={() => setViewAcheiver2(false)}
              className={`${viewAcheiver2 ? "shadow-2xl" : "shadow-none"
                } relative top-40 md:top-0 w-64 h-40 rounded-2xl border hover:h-96 transition-all duration-500`}
            >
              <div
                className={`${viewAcheiver2 ? "-top-20" : ""
                  } relative -top-16 transition-all left-4 z-20`}
              >
                <img
                  src={`${baseurl}/api/studentofmonth/${studentMonth.img}`}
                  className="w-56 h-56 rounded-full"
                  alt=""
                />

                <div className="text-xl font-bold my-1 ">
                  Student Of The Month 🏆
                </div>
              </div>
              <div
                className={`${viewAcheiver2 ? "block" : "hidden"
                  } relative -top-20 text-center p-3 animate__animated animate__fadeIn animate__slow`}
              >
                <h2 className="text-2xl font-extrabold text-center text-[black]">
                  {studentMonth.name ? studentMonth.name : ""}
                </h2>
                <p className="my-2">
                  <span className="font-bold">Registration No. :</span>{" "}
                  {studentMonth.regno ? studentMonth.regno : ""}
                </p>
                <p>
                  <span className="font-bold">Course :</span>
                  {studentMonth.course ? studentMonth.course : ""}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Mantra */}
        {/* <section data-aos="fade-up" className="bg-white mt-32 md:mt-0">
          <h1 className="text-5xl text-center font-semibold my-10">
            Success Mantra
          </h1>

          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-6">
            <div className=" text-gray-500 sm:text-lg ">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                Abhishek Singh
              </h2>
              <h3 className="text-[var(--bg-dark-blue)] text-xl font-bold mb-3">
                - CCNA
              </h3>
              <p className="mb-4 text-[var(--para-color)]">
                We are strategists, designers and developers. Innovators and
                problem solvers. Small enough to be simple and quick, but big
                enough to deliver the scope you want at the pace you need. Small
                enough to be simple and quick, but big enough to deliver the
                scope you want at the pace you need.
              </p>
              <p className="text-[var(--para-color)]">
                We are strategists, designers and developers. Innovators and
                problem solvers. Small enough to be simple and quick.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-8">
              <img
                className="mt-4 w-[70%] mx-auto h-96 lg:mt-10 rounded-lg"
                src={testimonial1}
                alt="office content 2"
              />
            </div>
          </div>
        </section> */}

        <section className="my-10 p-5">
          {/* About Container */}
          <div className="flex flex-col lg:flex-row justify-around xl:max-w-[90%] mx-auto">
            {/* left */}
            <div data-aos="fade-up" data-aos-easing="linear" className="p-2">
              <h3 className="text-[var(--bg-dark-blue)] text-xl font-bold">
                Our Library Facility
              </h3>
              <h1 className="text-5xl font-semibold my-5 lg:max-w-sm leading-tight">
                Explore yourself in our Library
              </h1>
              <p className="lg:max-w-sm leading-7 mb-3 text-[var(--dash-text-color)]">
                SMS Education provides you with a peaceful and serene
                environment. We offer you the opportunity to explore our reading
                library and escape unnecessary distractions, allowing you to
                focus on your reading and learning.
              </p>
              {/* Button and How it works*/}
              <div className="flex items-center justify-center">
                <Link to="/contact">
                  <button className="text-white hover:text-[var(--golden)] bg-[var(--golden)] hover:bg-[#204ecf] text-lg px-10 py-4 rounded-md transition-colors duration-500">
                    <div className="flex items-center justify-center uppercase">
                      Explore
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
              <div className="mt-5 flex justify-around items-center">
                {/* Counter 1 */}
                <div className="w-fit h-fit py-3 px-2 m-2 text-center">
                  <span className="text-4xl text-[var(--bg-dark-blue)] font-extrabold">
                    2500 +
                  </span>
                  <p className="text-[var(--dash-text-color)] font-semibold mt-2">
                    Enrolled Learner
                  </p>
                </div>
                {/* Counter 2 */}
                {/* <div className="w-fit h-fit py-3 px-2 m-2 text-center">
                  <span className="text-4xl text-[var(--bg-dark-blue)] font-extrabold">
                    25 +
                  </span>
                  <p className="text-[var(--dash-text-color)] font-semibold mt-2">
                    Finished Session
                  </p>
                </div> */}
                {/* Counter 3 */}
                <div className="w-fit h-fit py-3 px-2 m-2 text-center">
                  <span className="text-4xl text-[var(--bg-dark-blue)] font-extrabold">
                    80 %
                  </span>
                  <p className="text-[var(--dash-text-color)] font-semibold mt-2">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div
              data-aos="fade-right"
              data-aos-easing="linear"
              className="w-full lg:w-6/12 md:w-10/12 sm:w-9/12 mx-auto"
            >
              <div className="relative flex justify-end p-2">
                <img src={premise1} className="w-80 h-64 rounded-2xl" alt="" />
                <div className="absolute top-24 left-0 px-5 py-3 rounded-full text-xl font-bold flex items-center bg-white h-fit w-fit">
                  <img src={abtIco} className="mr-2" alt="" />
                  Experience Advisor
                </div>
              </div>
              <div className="relative -top-16 flex justify-start p-2">
                <img
                  src={
                    "https://www.library.cornell.edu/wp-content/uploads/2023/07/107-scaled-aspect-ratio-453-342.jpeg"
                  }
                  className="w-80 h-64 rounded-2xl"
                  alt=""
                />
                <div className="absolute top-28 right-0 px-5 py-3 rounded-full text-xl font-bold flex items-center bg-white h-fit w-fit">
                  <img src={abtIco} className="mr-2" alt="" />
                  Experience Advisor
                </div>
              </div>
              <div className="relative -top-28 flex justify-end p-2">
                <img
                  src={
                    "https://www.library.cornell.edu/wp-content/uploads/2022/11/Grad-Study-Desks-scaled-aspect-ratio-453-342.jpg"
                  }
                  className="w-80 h-64 rounded-2xl"
                  alt=""
                />
                <div className="absolute top-28 left-0 px-5 py-3 rounded-full text-xl font-bold flex items-center bg-white h-fit w-fit">
                  <img src={abtIco} className="mr-2" alt="" />
                  Experience Advisor
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunity For Learning */}
        <section className="mt-28 mb-10 p-5">
          <h3 className="text-[var(--bg-dark-blue)] text-xl text-center font-bold">
            How About SMS
          </h3>
          <h1 className="text-5xl text-center font-semibold my-10">
            Opportunity For Learning
          </h1>
          {/* Oppotunities Container */}
          <div className="flex justify-around mt-20 py-5  flex-wrap md:px-10">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="w-fit m-5 p-3"
            >
              <img src={oppor1} alt="" />
              <h3 className="font-bold text-xl my-3">Experience Advisor</h3>
              <p className="max-w-xs text-[var(--para-color)] pr-5">
                Elevate your learning journey with SMS Education's classes led
                by our team of seasoned experts. Gain an educational experience
                like never before.
              </p>
              <div className="hover:text-[var(--golden)] transition-all my-2 cursor-pointer">
                <NavLink to="/gallery">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </NavLink>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="w-fit m-5 p-3"
            >
              <img src={oppor2} alt="" />
              <h3 className="font-bold text-xl my-3">Courses From Experts</h3>
              <p className="max-w-xs text-[var(--para-color)] pr-5">
                Unlock your potential with our courses led by industry experts.
                Gain invaluable knowledge and skills from seasoned professionals
                who are at the forefront of their respective fields.
              </p>
              <div className="hover:text-[var(--golden)] transition-all my-2 cursor-pointer">
                <NavLink to="/courses">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </NavLink>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="700"
              className="w-fit m-5 p-3"
            >
              <img src={oppor3} alt="" />
              <h3 className="font-bold text-xl my-3">Live Classes</h3>
              <p className="max-w-xs text-[var(--para-color)] pr-5">
                SMS Education offers you live classes with our best and expert
                faculty, enabling you to learn from basics to advanced levels
                and understand concepts comprehensively.
              </p>
              {/* <div className="hover:text-[var(--golden)] transition-all my-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div> */}
            </div>
          </div>
        </section>

        {/* Browse Latest Courses */}
        <section className="w-full flex flex-col items-center my-10 p-5">
          <h3 className="text-[var(--bg-dark-blue)] text-xl text-center font-bold">
            Latest Courses
          </h3>
          <h1 className="text-5xl text-center font-semibold my-10">
            Browse Latest Courses
          </h1>
          {/* Oppotunities Container */}
          <div className="w-full justify-around items-center py-5 md:px-10 overflow-hidden">
            <TestSlider getCategoryName={getCategoryName} courses={courses} />
          </div>
          <Button onClick={() => navigate("/courses")} className="w-fit float">
            View more
          </Button>
        </section>

        {/* Meet Our Director */}
        <section className="mt-20 mb-10 p-5">
          <h1 className="text-5xl text-center font-semibold mb-20">
            Meet Our Director
          </h1>
          <div className="flex flex-col lg:flex-row justify-around items-center max-w-6xl mx-auto">
            {/* left */}
            <div data-aos="fade-right" className="mx-5 my-3">
              <img
                src={director}
                className="max-w-xl lg:max-w-xl w-full h-full mx-auto"
                alt=""
              />
            </div>
            {/* Director message */}
            <div data-aos="fade-up" className="mx-auto lg:mx-5 my-10">
              <h1 className="text-4xl font-bold my-4  md:max-w-xl lg:max-w-xl xl:max-w-2xl">
                Khushboo Gupta
              </h1>
              <h3 className="text-lg text-[var(--bg-dark-blue)]">
                Director - SMS Education
              </h3>
              <p className="text-xl my-3 md:max-w-xl lg:max-w-xl xl:max-w-2xl">
                "I am thrilled to have you join us on this exciting learning
                journey. Our mission is to empower individuals like you with the
                essential computer skills and knowledge that can open doors to
                endless opportunities in today's fast-paced digital world. I
                founded this platform with the vision of creating a supportive
                and innovative learning environment.Our team of dedicated
                instructors and experts are committed to delivering top-notch
                courses that cater to learners of all levels."
              </p>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="mt-20 mb-10 p-5">
          <h1 className="text-5xl text-center font-semibold my-10">Join Us</h1>
          <div className="flex flex-col flex-wrap lg:flex-row justify-around items-center mx-auto py-10">
            <Card
              onClick={handleOpen}
              data-aos="fade-up"
              className=" flex flex-col md:flex-row justify-center w-full max-w-lg m-5"
            >
              <CardHeader
                shadow={false}
                floated={false}
                className="w-[80%] sm:w-[70%] md:w-2/5 shrink-0 m-0 rounded-r-none"
              >
                <img
                  src={asInstructor}
                  alt="image"
                  className="w-full h-full object-contain"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Become An Instructor?
                </Typography>
                <Typography color="gray" className="font-normal mb-8">
                  Are you passionate about sharing your knowledge and expertise?
                  Join our team of instructors and become a part of our dynamic
                  learning community.
                </Typography>
                <button className="mx-3 text-white hover:text-[var(--golden)] bg-[var(--golden)] hover:bg-[#204ecf] text-md px-5 py-4 rounded-md transition-colors duration-500">
                  <div className="flex items-center justify-center uppercase">
                    Join Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>
                </button>
              </CardBody>
            </Card>
            <ModalJoinInstructor open={open} handleOpen={handleOpen} />
            <Card
              onClick={() => navigate("/courses")}
              data-aos="fade-up"
              data-aos-delay="400"
              className=" flex flex-col md:flex-row justify-center w-full max-w-lg m-5"
            >
              <CardHeader
                shadow={false}
                floated={false}
                className="w-[80%] sm:w-[70%] md:w-2/5 shrink-0 m-0 rounded-r-none"
              >
                <img
                  src={asStudent}
                  alt="image"
                  className="w-full h-full object-contain"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Get Our Courses
                </Typography>
                <Typography
                  color="gray"
                  className="font-normal mb-8 leading-relaxed"
                >
                  Unlock your potential with our exceptional courses. Gain
                  access to a world of knowledge and expertise that will empower
                  you to achieve your goals.
                </Typography>
                <button className="mx-3 text-white hover:text-[var(--golden)] bg-[var(--golden)] hover:bg-[#204ecf] text-md px-5 py-4 rounded-md transition-colors duration-500">
                  <div className="flex items-center justify-center uppercase">
                    Learn Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>
                </button>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Events */}
        <section className="mt-20 mb-10 p-5">
          <h3 className="text-[var(--bg-dark-blue)] text-xl text-center font-bold">
            Event & Program
          </h3>
          <h1 className="text-5xl text-center font-semibold my-10">
            Upcoming Events & Program
          </h1>
          {/* Events Container */}
          <div className="w-full flex">
            <div className="flex justify-around items-center flex-wrap w-1/2">
              {events &&
                events.map((event) => {
                  return (
                    <div
                      data-aos="fade-up"
                      className="mx-3 my-5 flex flex-col sm:flex-row items-center w-[95%] sm:w-fit shadow-xl rounded"
                    >
                      <div className="flex justify-between w-full sm:w-fit">
                        <div className="mx-3 my-2 text-[var(--dash-text-color)] font-bold text-xl w-fit">
                          <div>
                            {event.from
                              ? month[Number(event.from.split("-")[1]) - 1]
                              : ""}
                          </div>{" "}
                          <div className="text-5xl text-black font-extrabold my-4">
                            {event.from ? event.from.split("-")[2] : ""}
                          </div>{" "}
                          <div>{event.from ? event.from.split("-")[0] : ""}</div>
                        </div>
                        <div className="py-4 mx-3 h-32 w-32">
                          <img
                            src={baseurl + "/api/event/1696595423495WhatsApp Image 2023-09-30 at 17.17.58_7de43aca.jpg"}
                            className="h-32 w-32 rounded-full"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="mx-3">
                        {/* Address */}
                        <div className="my-4 flex items-center text-black font-extrabold  text-3xl ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            id="event-available"
                            fill="var(--golden)"
                            className=" mr-2"
                          >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M16 10.53c-.29-.29-.77-.29-1.06 0l-4.35 4.35L9 13.29c-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06l1.94 1.94c.39.39 1.02.39 1.41 0l4.7-4.7c.3-.29.3-.77.01-1.06zM19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1z"></path>
                          </svg>
                          {event.event ? event.event : ""}
                        </div>
                        <h3 className="max-w-xs max-h-20 overflow-hidden my-4  text-lg  text-[var(--dash-text-color)] hover:text-[var(--golden)] transition-colors duration-500">
                          <Tooltip
                            content={event.desc ? event.desc : ""}
                            placement="bottom-end"
                            className="max-w-lg bg-white text-black text-base"
                          >
                            {event.desc ? event.desc : ""}
                          </Tooltip>
                        </h3>
                        {/* <div className="flex items-center m-3 hover:text-[var(--golden)] transition-all duration-500 underline hover:no-underline cursor-pointer">
                        <div className="ml-3 font-semibold underline">
                          Know More
                        </div>
                        <div className="flex items-center justify-center  w-10 h-12 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            />
                          </svg>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="flex justify-around items-center flex-wrap w-1/2">
              {events &&
                events.map((event) => {
                  return (
                    <div
                      data-aos="fade-up"
                      className="mx-3 my-5 flex flex-col sm:flex-row items-center w-[95%] sm:w-fit shadow-xl rounded"
                    >
                      <div className="flex justify-between w-full sm:w-fit">
                        <div className="mx-3 my-2 text-[var(--dash-text-color)] font-bold text-xl w-fit">
                          <div>
                            {event.from
                              ? month[Number(event.from.split("-")[1]) - 1]
                              : ""}
                          </div>{" "}
                          <div className="text-5xl text-black font-extrabold my-4">
                            {event.from ? event.from.split("-")[2] : ""}
                          </div>{" "}
                          <div>{event.from ? event.from.split("-")[0] : ""}</div>
                        </div>
                        <div className="py-4 mx-3 h-32 w-32">
                          <img
                            src={about2}
                            className="h-32 w-32 rounded-full"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="mx-3">
                        {/* Address */}
                        <div className="my-4 flex items-center text-black font-extrabold  text-3xl ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            id="event-available"
                            fill="var(--golden)"
                            className=" mr-2"
                          >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M16 10.53c-.29-.29-.77-.29-1.06 0l-4.35 4.35L9 13.29c-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06l1.94 1.94c.39.39 1.02.39 1.41 0l4.7-4.7c.3-.29.3-.77.01-1.06zM19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1z"></path>
                          </svg>
                          {event.event ? event.event : ""}
                        </div>
                        <h3 className="max-w-xs max-h-20 overflow-hidden my-4  text-lg  text-[var(--dash-text-color)] hover:text-[var(--golden)] transition-colors duration-500">
                          <Tooltip
                            content={event.desc ? event.desc : ""}
                            placement="bottom-end"
                            className="max-w-lg bg-white text-black text-base"
                          >
                            {event.desc ? event.desc : ""}
                          </Tooltip>
                        </h3>
                        {/* <div className="flex items-center m-3 hover:text-[var(--golden)] transition-all duration-500 underline hover:no-underline cursor-pointer">
                        <div className="ml-3 font-semibold underline">
                          Know More
                        </div>
                        <div className="flex items-center justify-center  w-10 h-12 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            />
                          </svg>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

        </section>
      </main>
    </>
  );
};

export default HomePage2;
