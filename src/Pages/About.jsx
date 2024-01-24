import React, { useEffect } from "react";
import { toast } from "react-toastify";
import about1 from "../assets/images/homepage/about-img-1.jpg";
import abtIco from "../assets/images/homepage/abt-ico.png";
import AOS from "aos";
import "aos/dist/aos.css";
import director from "../assets/images/homepage/team/director.jpeg";
import DivyanshiSingh from "../assets/images/homepage/staff/Divyanshi-singh-(Teacher).jpeg";
import PratishthaDwivedi from "../assets/images/homepage/staff/Pratishtha-Dwivedi (Evening-manager).jpeg";
import PrabhatKumarSharma from "../assets/images/homepage/staff/Prabhat-kumar Sharma-(Teacher).png";
import MukeshKumar from "../assets/images/homepage/staff/Mukesh-kumar-(Teacher).jpeg";
import KomalVerma from "../assets/images/homepage/staff/Komal-verma-(Morning-manager).jpg";
import AnujSrivastava from "../assets/images/homepage/staff/Anuj-Srivastava-(Teacher).JPG";
import premise14 from "../assets/images/homepage/premises/premise14.JPG";
import classroom6 from "../assets/images/homepage/premises/classroom/classroom6.JPG";
import classroom4 from "../assets/images/homepage/premises/classroom/classroom4.JPG";
import { Link } from "react-router-dom";
import InstructorList from "../Components/InstructorList";

const About = () => {
  // toast("Wow so easy!");

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
  return (
    <main>
      {/* About Heading */}
      <section className=" hero-container mb-10 sm:mb-5 flex items-start pb-3">
        <div className='h-[60vh] px-5 sm:px-6 md:px-8 lg:px-10 before:absolute before:top-0 before:left-0 before:content-[""] before:bg-[var(--bg-dark-blue)] before:w-full before:h-[85vh] before:-z-10 hero-section w-full before:bg-cover before:bg-center before:opacity-100  flex justify-around items-start'>
          <div className="mt-32  flex sm:flex-row lg:flex-row items-center justify-around w-full flex-wrap space-x-5 sm:space-x-7 ">
            <div className="text-white max-w-2xl">
              <div data-aos="fade-down" data-aos-delay="100">
                <h1 className="mb-2 text-4xl sm:text-6xl font-bold text-center leading-snug">
                  About
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

      {/* About Us */}
      <section className="my-10 p-5">
        {/* About Container */}
        <div className="flex flex-col lg:flex-row justify-around xl:max-w-[90%] mx-auto">
          {/* left */}
          <div
            data-aos="fade-right"
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
              <img src={classroom6} className="w-80 h-64 rounded-2xl" alt="" />
              <div className="absolute top-28 right-0 px-5 py-3 rounded-full text-xl font-bold flex items-center bg-white h-fit w-fit">
                <img src={abtIco} className="mr-2" alt="" />
                Experience Advisor
              </div>
            </div>
            <div className="relative -top-28 flex justify-end p-2">
              <img src={classroom4} className="w-80 h-64 rounded-2xl" alt="" />
              <div className="absolute top-28 left-0 px-5 py-3 rounded-full text-xl font-bold flex items-center bg-white h-fit w-fit">
                <img src={abtIco} className="mr-2" alt="" />
                Experience Advisor
              </div>
            </div>
          </div>

          {/* Right */}
          <div data-aos="fade-up" className="p-2">
            <h3 className="text-[var(--bg-dark-blue)] text-xl font-bold">
              About SMS
            </h3>
            <h1 className="text-5xl font-semibold my-5 lg:max-w-sm leading-tight">
              Experience To Learning Center
            </h1>
            <p className="lg:max-w-sm leading-7 mb-3 text-[var(--dash-text-color)]">
              SMS Education is a well-diversified an autonomous institute in the
              field of computer literacy, governed by distinctive and highly
              qualified professionals. SMS Education involves in preparing
              skilled computer professional environment.
            </p>

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
              founded this platform with the vision of creating a supportive and
              innovative learning environment.Our team of dedicated instructors
              and experts are committed to delivering top-notch courses that
              cater to learners of all levels."
            </p>
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
          {/* <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((item) => {
              return (
                <div className="relative overflow-hidden transition duration-300 transform rounded-full shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    className="object-cover object-top w-full h-[100%] md:h-[100%] xl:h-[100%]"
                    src={item.img}
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
          <InstructorList />
        </div>
      </section>
    </main>
  );
};

export default About;
