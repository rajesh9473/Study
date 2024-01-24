import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import baseurl from "../Config";
import Loader from "../Components/Loader";
import { useAuthContext } from "../context/useStateContext";
import moment from "moment/moment";

const StudentMarks = ({ auth }) => {
  const [marksData, setMarksData] = useState([]);
  const { currentUser } = useAuthContext();
  const [loader, setLoader] = useState(true);

  const getMarksData = () => {
    fetch(`${baseurl}/api/marks/${currentUser?.regno}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setMarksData(result);
        setLoader(false);
      })
      .catch((err) => {
        console.error("Error fetching marks data:", err);
        setLoader(false);
      });
  };


  useEffect(() => {
    getMarksData();
  }, [currentUser]);
  return (
    <section className="p-2 sm:p-5 md:p-10 border-b border-[var(--secondary-color)]">
      <h2 className="text-3xl font-semibold text-[var(--secondary-color)] text-center sm:text-start my-5 sm:my-7 md:my-10">
        Result
      </h2>
      {marksData.length === 0 ? (
        <div className="text-center text-lg text-gray-700">
          No Result Published
        </div>
      ) : (
        marksData.map((item, index) => (
          <div
            key={index}
            className="w-[90%] mb-20 mx-auto shadow-2xl border-t-4 border-t-[var(--theme-color)] p-5"
          >
            <h5 className="font-bold">Your marks</h5>
            <p>{item.topic}</p>
            <div className="my-5">
              <table className="table-auto w-full">
                <thead className="border-b border-b-gray-600">
                  <tr className="uppercase text-start">
                    <th className="px-3 py-3 text-start">Course</th>
                    <th className="px-3 py-3 text-start hidden md:table-cell">
                      Total Marks
                    </th>
                    <th className="px-3 py-3 text-start">Obtained Marks</th>
                    <th className="px-3 py-3 text-start hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-3 py-3 text-start hidden lg:table-cell">
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-5 text-sm">{item.course}</td>
                    <td className="px-3 py-5 hidden md:table-cell text-sm">
                      {item.total_marks}
                    </td>
                    <td className="px-3 py-5 text-sm">
                      <span className="font-semibold text-white bg-[var(--theme-color)] p-2 rounded-lg">
                        {item.obtain_marks}
                      </span>{" "}
                    </td>
                    <td className="px-3 py-5 hidden lg:table-cell text-sm">
                      {moment(item.date).format("MMM Do YYYY")}
                    </td>
                    <td className="px-3 py-5 hidden lg:table-cell">Good</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default StudentMarks;
