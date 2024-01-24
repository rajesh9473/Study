import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel } from "@material-tailwind/react";
import premise1 from "../assets/images/homepage/premises/premise1.JPG";
import premise2 from "../assets/images/homepage/premises/premise2.JPG";
import premise3 from "../assets/images/homepage/premises/premise3.JPG";
import premise4 from "../assets/images/homepage/premises/premise4.JPG";
import premise5 from "../assets/images/homepage/premises/premise5.JPG";
import premise6 from "../assets/images/homepage/premises/premise6.JPG";
import premise7 from "../assets/images/homepage/premises/premise7.JPG";
import premise8 from "../assets/images/homepage/premises/premise8.JPG";
import premise9 from "../assets/images/homepage/premises/premise9.JPG";
import premise10 from "../assets/images/homepage/premises/premise10.JPG";
import premise11 from "../assets/images/homepage/premises/premise11.JPG";
import premise12 from "../assets/images/homepage/premises/premise12.JPG";
import premise13 from "../assets/images/homepage/premises/premise13.JPG";
import premise14 from "../assets/images/homepage/premises/premise14.JPG";
// Classrooms
import classroom1 from "../assets/images/homepage/premises/classroom/classroom1.JPG";
import classroom2 from "../assets/images/homepage/premises/classroom/classroom2.JPG";
import classroom3 from "../assets/images/homepage/premises/classroom/classroom3.JPG";
import classroom4 from "../assets/images/homepage/premises/classroom/classroom4.JPG";
import classroom5 from "../assets/images/homepage/premises/classroom/classroom5.JPG";
import classroom6 from "../assets/images/homepage/premises/classroom/classroom6.JPG";
import classroom7 from "../assets/images/homepage/premises/classroom/classroom7.JPG";

// Labs
import lab2 from "../assets/images/homepage/premises/labs/lab2.JPG";
import lab3 from "../assets/images/homepage/premises/labs/lab3.JPG";
import lab4 from "../assets/images/homepage/premises/labs/lab4.JPG";

//  Team
import team1 from "../assets/images/homepage/team/team1.JPG";
import team2 from "../assets/images/homepage/team/team2.JPG";
import team3 from "../assets/images/homepage/team/team3.JPG";
import team4 from "../assets/images/homepage/team/team4.JPG";
import { Link } from "react-router-dom";

const Gallery = () => {
  AOS.init({
    delay: 300,
    duration: 1000,
    // easing: "ease-in",
    mirror: false,
  });

  const centerPremises = [
    {
      img: premise1,
    },
    {
      img: premise2,
    },
    {
      img: premise3,
    },

    {
      img: premise6,
    },
    {
      img: premise7,
    },
    {
      img: premise8,
    },

    {
      img: premise10,
    },
    {
      img: premise11,
    },
    {
      img: premise12,
    },
    {
      img: premise13,
    },
    {
      img: premise14,
    },
    {
      img: premise5,
    },
    {
      img: premise4,
    },
    {
      img: premise9,
    },
  ];

  const classrooms = [
    {
      img: classroom1,
    },
    {
      img: classroom2,
    },
    {
      img: classroom3,
    },
    {
      img: classroom4,
    },
    {
      img: classroom5,
    },
    {
      img: classroom6,
    },
    {
      img: classroom7,
    },
  ];

  const labs = [
    {
      img: lab2,
    },
    {
      img: lab3,
    },
    {
      img: lab4,
    },
  ];

  const teams = [
    {
      img: team3,
    },
    {
      img: team4,
    },
    {
      img: team1,
    },
    {
      img: team2,
    },
  ];

  return (
    <main>
      {/* Gallery Heading */}
      <section className=" hero-container mb-10 sm:mb-5 flex items-start pb-3">
        <div className='h-[60vh] px-5 sm:px-6 md:px-8 lg:px-10 before:absolute before:top-0 before:left-0 before:content-[""] before:bg-[var(--bg-dark-blue)] before:w-full before:h-[85vh] before:-z-10 hero-section w-full before:bg-cover before:bg-center before:opacity-100  flex justify-around items-start'>
          <div className="mt-36  flex sm:flex-row lg:flex-row items-center justify-around w-full flex-wrap space-x-5 sm:space-x-7 ">
            <div className="text-white max-w-2xl">
              <div data-aos="fade-down" data-aos-delay="100">
                <h1 className="mb-2 text-4xl sm:text-6xl font-bold text-center leading-snug">
                  Gallery
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
                  <span className="text-[var(--golden)] underline">
                    Gallery
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* <img src={heroLeftImg} className="absolute bottom-0 left-5" alt="" /> */}
      </section>

      {/* SMS Education Staff */}
      <section className="my-10 p-5">
        <h3 className="my-10 text-teal-900 text-2xl uppercase text-center font-bold">
          SMS Education Staff
        </h3>

        <Carousel
          className="rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          autoplay
          loop
        >
          {teams.map((team) => {
            return (
              <img
                src={team.img}
                alt="image 1"
                className="h-full w-full object-cover"
              />
            );
          })}
        </Carousel>
      </section>

      {/* Center Premises */}
      <section className="my-10 p-5">
        <h3 className="my-10 text-teal-900 text-2xl uppercase text-center font-bold">
          Center Premises
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {centerPremises.map((item) => {
            return (
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={item.img}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Classroom */}
      <section className="my-10 p-5">
        <h3 className="my-10 text-teal-900 text-2xl uppercase text-center font-bold">
          Classrooms
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {classrooms.map((item) => {
            return (
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={item.img}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Computer Labs */}
      <section className="my-10 p-5">
        <h3 className="my-10 text-teal-900 text-2xl uppercase text-center font-bold">
          Computer Labs
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {labs.map((item) => {
            return (
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={item.img}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Gallery;
