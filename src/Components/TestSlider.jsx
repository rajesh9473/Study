import { Card, CardBody, CardHeader, Carousel, IconButton, Typography } from '@material-tailwind/react';
import React from 'react'
import baseurl from '../Config';
import { Link } from 'react-router-dom';

const TestSlider = ({ courses, getCategoryName }) => {
  const cardsPerSlide = {
    xs: 1, // For extra small screens (e.g., mobile phones), show 1 card per slide
    sm: 2, // For small screens (e.g., tablets), show 2 cards per slide
    md: 3, // For medium-sized screens, show 3 cards per slide
    lg: 3, // For large screens, show 3 cards per slide
    xl: 3, // For extra large screens, show 3 cards per slide
  };

  // Determine the number of cards to show based on screen width
  const screenWidth = window.innerWidth;
  let cardsToShow = cardsPerSlide.md; // Default to medium-sized screens

  if (screenWidth < 640) {
    cardsToShow = cardsPerSlide.xs; // For screens narrower than 640px (e.g., mobile)
  } else if (screenWidth < 768) {
    cardsToShow = cardsPerSlide.sm; // For screens narrower than 768px (e.g., tablets)
  }

  // Chunk the courses into groups based on the number of cards to show
  const chunkedCourses = [];
  for (let i = 0; i < courses.length; i += cardsToShow) {
    chunkedCourses.push(courses.slice(i, i + cardsToShow));
  }
  
  return (
    <Carousel
      className=" w-full"
      autoplay
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
      navigation={false}
      loop={true}
    >
      {chunkedCourses.map((courseGroup, index) => (
        <div key={index} className="slide">
          <div className="flex justify-between p-5">
            {courseGroup.map((course, innerIndex) => (
              <Card
                key={innerIndex}
                className="m-2 w-72 sm:w-64 md:w-80 lg:w-70 xl:w-96"
              >
                <CardHeader color="blue-gray" className="relative h-56">
                  <img
                    src={`${baseurl}/api/coursepic/${course.img}`}
                    alt="img-blur-shadow"
                    layout="fill"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody className="pb-2">
                  <Typography variant="h6" color="blue" className="mb-2">
                    {course.category ? getCategoryName(course.category) : ""}
                  </Typography>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    <Link
                      to="/course/course-details"
                      className="hover:text-[var(--golden)] transition-colors duration-300"
                      state={course}
                    >
                      {course.title && course.title}
                    </Link>
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default TestSlider;
