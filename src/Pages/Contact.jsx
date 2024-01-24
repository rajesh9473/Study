import React, { useState } from "react";
import baseurl from "../Config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");

  const data = {
    name,
    email,
    contact,
    subject,
    desc,
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    // Empty the value of fields
    setName("");
    setEmail("");
    setContact("");
    setSubject("");
    setDesc("");

    // Post Api For Posting Data
    fetch(baseurl + "/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === true && result.code === 200) {
          toast.success("Enquiry Submitted Successfully");
        } else {
          toast.error(`${result.message}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main>
      {/* Courses Heading */}
      <section className=" hero-container mb-10 sm:mb-5 flex items-start pb-3">
        <div className='h-[60vh] px-5 sm:px-6 md:px-8 lg:px-10 before:absolute before:top-0 before:left-0 before:content-[""] before:bg-[var(--bg-dark-blue)] before:w-full before:h-[85vh] before:-z-10 hero-section w-full before:bg-cover before:bg-center before:opacity-100  flex justify-around items-start'>
          <div className="mt-32  flex sm:flex-row lg:flex-row items-center justify-around w-full flex-wrap space-x-5 sm:space-x-7 ">
            <div className="text-white max-w-2xl">
              <div data-aos="fade-down" data-aos-delay="100">
                <h1 className="mb-2 text-4xl   sm:text-6xl font-bold text-center leading-snug">
                  Contact
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
                    Contact
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* <img src={heroLeftImg} className="absolute bottom-0 left-5" alt="" /> */}
      </section>
      <section className="bg-white ">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <p className="mb-8 lg:mb-16 font-light text-center   sm:text-xl">
            Interested in Joining SMS Education? Want to enroll in our Courses?
            Have any other enquiry? Just fill the enquiry form .
          </p>
          <form action="#" className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   "
                placeholder="John"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   "
                placeholder="name@flowbite.com"
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="contact"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Contact Number
              </label>
              <input
                type="number"
                id="contact"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   "
                placeholder="1234567890"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Courses interested in"
                required=""
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Description
              </label>
              <textarea
                id="message"
                rows={6}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Tell us more about your enquiry"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[var(--bg-dark-blue)] hover:bg-[var(--bg-light-blue)] sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 transition-color duration-500"
              onClick={(e) => onSubmitClick(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
