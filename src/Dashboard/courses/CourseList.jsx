import React, { useEffect, Fragment, useState } from "react";
import baseurl from "../../Config";
import { Checkbox, Button } from "@material-tailwind/react";
import ModalAddCourse from "./ModalAddCourse";
import CourseTable from "./CourseTable";
import Loader from "../../Components/Loader";
import ModalAddCategory from "./categories/ModalAddCategory";

const CourseList = () => {
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [filterBy, setFilterBy] = useState("all");
  const [filterDuration, setFilterDuration] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [duration, setDuration] = useState('all')

  useEffect(() => {
    getCourseList(filterBy);
  }, [page, filterBy]);

  // useEffect(() => {
  //   getCategoryList();
  // }, []);

  const getCourseList = (filterBy) => {
    fetch(baseurl + "/api/course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (filterBy === "all" && duration === 'all') {
          // If both filterBy and duration are 'all', set the product to the entire result.
          setProduct(result);
        } else {
          let filterData;
          // Filter the result based on filterBy and duration criteria.
          filterData = result.filter((course) => course.status === filterBy);
          if (duration !== 'all') return filterData = filterData.filter((course) => course.duration === duration)
          setProduct(filterData);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const productDurationsSet = new Set(pageData?.map(x => x.duration));
  const productDurations = Array.from(productDurationsSet);



  // const getCategoryList = () => {
  //   fetch(baseurl + "/api/category ", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setProduct(result);
  //       setLoader(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleSelectChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSelectPriceChange = (event) => {
    setFilterPrice(event.target.value);
  };

  //handle Next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };
  //handlePrevious
  const handlePrevious = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };
  //console.log(pageCount)

  useEffect(() => {
    const pagedatacount = Math.ceil(product.length / 5);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 5;
      const skip = LIMIT * page;
      const dataskip = product.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [product]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [categotyModalOpen, setcategotyModalOpen] = useState(false);
  const handlecategotyOpen = () => setcategotyModalOpen(!categotyModalOpen);



  return (
    <>
      <div className="mt-5 sm:max-w-lg md:max-w-2xl lg:max-w-none mx-auto p-5 shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] text-center sm:text-start ">
            Courses
            <div className="text-sm font-light text-[var(--para-color)]">
              You have total {product.length} Courses
            </div>
          </h2>
          {/* Course */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
            <div className="flex items-center">
              <div className="text-[var(--secondary-color)]">
                Filter By Status
              </div>{" "}
              <div>
                <select
                  name="filter"
                  id="filter"
                  value={filterBy}
                  onChange={(e) => {
                    setFilterBy(e.target.value);
                    setLoader(true);
                  }}
                  className="w-32 p-2 mx-2"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>
            <div className=" w-48 mx-2">
              <div className="relative flex w-full flex-wrap items-stretch">
                <input
                  type="textarea"
                  className="relative m-0 block w-[1%] min-w-0 pl-2 pr-8 py-2  flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-[var(--theme-color)] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Search by name"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                <div
                  className=" absolute bottom-1 right-1 input-group-text flex items-center whitespace-nowrap rounded px-1 py-1.5 text-center text-base font-normal text-neutral-700  cursor-pointer"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Button onClick={handlecategotyOpen} className="h-fit">
              + Add Category
            </Button>
            <Button onClick={handleOpen} className="h-fit ml-1">
              + Add Courses
            </Button>
          </div>
        </div>
        <ModalAddCourse
          open={open}
          handleOpen={handleOpen}
          getCourseList={getCourseList}
        />
        <ModalAddCategory
          open={categotyModalOpen}
          handleOpen={handlecategotyOpen}
        // getCategoryList={getCategoryList}
        />

        {/* Course Table */}
        <div className="my-10">
          <div className="relative mx-auto ">
            {loader ? (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="relative overflow-x-scroll">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                    <tr>
                      <th scope="col" className=" py-3">
                        <Checkbox />
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Level
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Lessons
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <select
                          name="durationFilter"
                          id="durationFilter"
                          value={duration}
                          onChange={handleSelectChange}
                          className="w-32 p-2 mx-2"
                        >
                          <option value="all">Duration</option>
                          {productDurations?.map((item) => (
                            <option value={item}>{item}</option>
                          ))}

                        </select>
                      </th>
                      {/* <th scope="col" className="px-3 py-3">
              Status
            </th> */}
                      <th scope="col" className="px-3 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      {/* <th scope="col" className="px-6 py-3">
              Deadline
            </th> */}
                      <th scope="col" className="px-1 py-3">
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
                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData?.filter(course => duration === 'all' ? course : course.duration === duration)?.map((item) => {
                      const isTitleMatch = item.title.toLowerCase().includes(search.trim().toLowerCase());
                      const isPriceMatch = item.price.toString().toLowerCase().includes(search.trim().toLowerCase());
                      const isDurationMatch = filterDuration === 'all' || item.duration.toString() === filterDuration;

                      if (isTitleMatch || isDurationMatch || isPriceMatch) {
                        return (
                          <CourseTable
                            key={item.id}
                            item={item}
                            getCourseList={getCourseList}
                          />
                        );
                      }

                      return null;
                    })}


                  </tbody>

                </table>
              </div>
            )}

            <div className="flex justify-end">
              <nav aria-label="Page navigation example">
                <ul className="pagination flex space-x-5 border w-fit px-2 py-1 mx-5 mt-5">
                  <li className="page-item">
                    <a
                      className="page-link"
                      sty
                      href="#"
                      aria-label="Previous"
                      onClick={handlePrevious}
                      disabled={page === 1}
                    >
                      <span
                        aria-hidden="true"
                        className="border px-2 py-1 shadow-xl rounded-lg"
                      >
                        &laquo;
                      </span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {Array(pageCount)
                    .fill(null)
                    .map((ele, index) => {
                      return (
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#"
                            active={page === index + 1 ? true : false}
                            onClick={() => {
                              setPage(index + 1);
                            }}
                          >
                            {index + 1}
                          </a>
                        </li>
                      );
                    })}
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={handleNext}
                      disabled={page === pageCount}
                    >
                      <span
                        aria-hidden="true"
                        className="border px-2 py-1 shadow-xl rounded-lg"
                      >
                        &raquo;
                      </span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default CourseList;
