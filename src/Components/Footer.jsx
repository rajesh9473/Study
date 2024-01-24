import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/images/logo2.jpg";

const Footer = () => {
  return (
    <>
      <footer className="text-center bg-[var(--bg-dark-blue)] text-white lg:text-left">
        {/* Main container div: holds the entire content of the footer, including four sections (Tailwind Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. */}
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start">
            {/* Company info */}
            <div className="">
              <div className="mb-5 flex flex-col lg:flex-row justify-center lg:justify-start items-center">
                <img
                  src={logo2}
                  alt=""
                  className="mx-3 h-16 w-16 rounded-full"
                />
                <div className="py-1.5">
                  <Link
                    as="a"
                    to="/"
                    className="lg:mr-4 cursor-pointer text-4xl"
                  >
                    S<span className="text-[var(--theme-color)]">M</span>S
                  </Link>
                </div>
              </div>
              <p className="my-5 sm:pr-20 text-justify">
                SMS Education is a well-diversified an autonomous institute in
                the field of computer literacy, governed by distinctive and
                highly qualified professionals.SMS Education involves in
                preparing skilled computer professional environment.
              </p>
            </div>
            {/* Company section */}
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-white text-xl">
                Courses
              </h6>
              <ul className="md:list-disc">
                <li className="mb-4">
                  <a
                    href="/courses"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    ADCA
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="/courses"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    O Level
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="/courses"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    CCC
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="/courses"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    DCA
                  </a>
                </li>
                <li className="">
                  <a
                    href="/courses"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    C++
                  </a>
                </li>
              </ul>
            </div>
            {/* Useful links section */}
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-white text-xl">
                Useful links
              </h6>
              <ul className="md:list-disc">
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/about"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    About
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/courses"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    Courses
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/contact"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    Contact
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/gallery"
                    className="text-neutral-600 dark:text-neutral-200"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
            {/* Contact section */}
            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-white text-xl">
                Contact
              </h6>
              <p className="mb-6 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start text-lg">
                <div className="w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="var(--golden)"
                    className="mr-3 mb-3 md:mb-0 h-6 w-6"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                </div>
                Kudrat Vihar Colony, Sarojini Nagar, Lucknow, Uttar Pradesh
                226008
              </p>
              <p className="mb-6 flex flex-col md:flex-row  items-center justify-center md:justify-start text-lg">
                <div className="w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="var(--golden)"
                    className="mr-3 mb-3 md:mb-0 h-6 w-6"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                smseducationlko@gmail.com
              </p>
              <p className="mb-6 flex flex-col md:flex-row  items-center justify-center md:justify-start text-lg">
                <div className="w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="var(--golden)"
                    className="mr-3 mb-3 md:mb-0 h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                +91 80900 04415
              </p>
              {/* Social network icons container */}
              <div className="mt-10 flex justify-center lg:justify-start my-5">
                <a
                  href="https://api.whatsapp.com/send?phone=918090004415&text=I%20want%20to%20enquire%20about%20fees"
                  className="mr-6 text-neutral-600 w-10 h-10 bg-[#ffffff1a] hover:bg-[#204ecf] flex justify-center items-center rounded-full transition-color duration-500"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="white"
                    viewBox="0 0 512 512"
                    id="whatsapp"
                  >
                    <path
                      // fill-rule="evenodd"
                      fill="white"
                      d="M209.877 154.114c-4.258-11.323-9.176-10.515-12.45-10.639-3.277-.121-6.146-.061-10.573.011-3.746.061-9.882 1.026-15.232 6.413-5.357 5.378-20.366 18.312-21.404 45.725-1.031 27.408 18.08 54.643 20.749 58.455 2.667 3.826 36.494 63.236 92.719 87.67 56.231 24.427 56.525 16.981 66.84 16.435 10.325-.54 33.726-12.246 38.899-25.073 5.172-12.827 5.588-23.979 4.271-26.358-1.316-2.371-5-3.911-10.51-6.9-5.516-2.995-32.595-17.498-37.673-19.55-5.081-2.044-8.787-3.108-12.742 2.329-3.957 5.422-15.191 17.569-18.596 21.168-3.42 3.6-6.711 3.934-12.226.93-5.5-2.988-23.373-9.548-44.098-29.317-16.126-15.38-26.711-34.043-29.779-39.736-3.069-5.697-.02-8.604 2.9-11.269 2.618-2.407 5.857-6.301 8.792-9.449 2.919-3.148 3.949-5.43 5.961-9.083 2.007-3.645 1.2-6.932-.102-9.771-1.303-2.838-11.49-30.668-15.746-41.991z"
                      clip-rule="evenodd"
                    ></path>
                    <path d="M260.062 64c50.249 0 97.478 19.402 132.982 54.632C428.482 153.796 448 200.533 448 250.232c0 49.694-19.518 96.43-54.956 131.596-35.507 35.232-82.735 54.637-132.982 54.637-31.806 0-63.24-8.023-90.906-23.201l-12.017-6.593-13.063 4.149-61.452 19.522 19.375-57.149 4.798-14.151-7.771-12.763c-17.593-28.898-26.892-62.111-26.892-96.047 0-49.699 19.518-96.436 54.957-131.601C162.596 83.402 209.819 64 260.062 64m0-32C138.605 32 40.134 129.701 40.134 250.232c0 41.229 11.532 79.791 31.559 112.687L32 480l121.764-38.682c31.508 17.285 67.745 27.146 106.298 27.146C381.535 468.464 480 370.749 480 250.232 480 129.701 381.535 32 260.062 32z"></path>
                  </svg>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg> */}
                </a>
                <a
                  href="https://www.facebook.com/smseducationlko"
                  className="mr-6 text-neutral-600 w-10 h-10 bg-[#ffffff1a] hover:bg-[#204ecf] flex justify-center items-center rounded-full transition-color duration-500"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/smseducationinstitute/"
                  className="mr-6 text-neutral-600 w-10 h-10 bg-[#ffffff1a] hover:bg-[#204ecf] flex justify-center items-center rounded-full transition-color duration-500"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#!"
                  className="mr-6 text-neutral-600 w-10 h-10 bg-[#ffffff1a] hover:bg-[#204ecf] flex justify-center items-center rounded-full transition-color duration-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-1" />
        {/*Copyright section*/}
        <div className="bg-neutral-200 p-6 text-center">
          <div className="flex justify-center">
            <span className="hidden lg:block">Copyright&nbsp;</span> ©
            2023&nbsp;
            <Link
              className="font-semibold hover:text-[var(--golden)] animation"
              to="/"
            >
              All Rights Reserved by SMS Education
            </Link>
          </div>
          <div className="text-sm text-[var(--golden)] mt-1">
            Designed & Developed By Trickle Solutions
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
