import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Button } from "@material-tailwind/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import baseurl from "../../Config";
import { useAuthContext } from "../../context/useStateContext";

const PrintReceipt = () => {
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  // const { auth, item } = location.state;
  const [studentData, setStudentData] = useState([]);
  const { currentUser, setCurrentUser, getStudentData } = useAuthContext();

  // useEffect(() => {
  //   getStudentData();
  // }, []);

  // const getStudentData = () => {
  //   fetch(`${baseurl}/api/students/${auth}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setStudentData(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // Get Current Date
  function getCurrentDate() {
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let todayDate = date.getDate();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let seconds = date.getSeconds();
    let dayNum = date.getDay();
    let day = days[dayNum];
    let currentDate =
      todayDate +
      "/" +
      month +
      "/" +
      year +
      ", " +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    // console.log(currentDate);
    return currentDate;
  }

  const downloadPDF = () => {
    const capture = document.querySelector(".receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("landscape", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };

  const reverseDate = (str) => str.split("-").reverse().join("-");
  return (
    <>
      <section className=" p-5 sm:p-5 md:p-10 mt-5">
        <Button
          onClick={downloadPDF}
          disabled={!(loader === false)}
          className="my-5 text-center mx-auto"
        >
          Download
        </Button>
        <div className="receipt w-[100%] h-[150vh]">
          <div className="max-w-4xl mx-auto shadow-xl p-5">
            {/* Heading */}
            <div className="flex justify-between items-start">
              <div className="m-2 flex flex-col justify-center items-center w-fit">
                <h3 className="text-sm my-1">ISO Certified : 9001:2008</h3>
                <img src={logo} className="w-20 h-20" alt="" />
              </div>
              <div className="m-2 text-xl text-center uppercase font-extrabold font-mono">
                <h1 className="text-5xl mb-5">SMS Education</h1>
                <h3 className="my-2">
                  Opp. Laxman Nursery, Gauri Sarojini Nagar
                </h3>
                <h3 className="my-2">Lucknow - 226008</h3>
                <h3 className="my-2">
                  Email :{" "}
                  <span className="lowercase">smseducationlko@gmail.com</span>
                </h3>
              </div>
              <div className="m-2 flex flex-col justify-center items-center w-fit">
                <h3 className="text-sm my-1">ISO Certified : 9001:2008</h3>
                <img src={logo} className="w-20 h-20" alt="" />
              </div>
            </div>

            {/* Receipt Heading*/}
            <h2 className="font-bold text-center mt-8 text-xl underline underline-offset-2">
              Fee Receipt
            </h2>
            {/* Receipient Details */}
            <div className="mt-5 flex justify-between border-b border-black">
              {/* left block */}
              <div className="m-3">
                {/* 1st detail */}
                <div className="flex ">
                  <div className="font-extrabold w-36">Registration No:</div>
                  {/* <div>{currentUser.regno}</div> */}
                </div>
                {/* 2nd detail */}
                <div className="flex ">
                  <div className="font-extrabold w-36">Name:</div>
                  {/* <div>{currentUser.name}</div> */}
                </div>
                {/* 3rd detail */}
                <div className="flex ">
                  <div className="font-extrabold w-36">Father's Name:</div>
                  {/* <div>{currentUser.fname}</div> */}
                </div>
              </div>
              {/* Right block */}
              <div className="m-3">
                {/* 1st detail */}
                <div className="flex ">
                  <div className="font-extrabold w-36">Receipt Id:</div>
                  <div>5964</div>
                </div>
                {/* 2nd detail */}
                <div className="flex ">
                  <div className="font-extrabold w-36">Receipt No.:</div>
                  <div>14071</div>
                </div>
                {/* 3rd detail */}
                <div className="flex ">
                  <div className="font-extrabold w-36">Date:</div>
                  {/* <div>{reverseDate(item.date)}</div> */}
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="max-w-lg mx-auto mt-10">
              <div className="flex justify-between border-b border-black px-2 font-semibold py-1">
                <div>Sr. No.</div>
                <div>Course</div>
                <div>Amount</div>
              </div>
              <div className="flex justify-between border-b border-black px-2 font-semibold py-2">
                <div>1.</div>
                <div>Android Development</div>
                {/* <div>{item.paid}</div> */}
              </div>
              <div className="flex text-2xl justify-between border-b border-black px-2 font-semibold py-2">
                <div></div>
                <div className=" ml-10">Total</div>
                {/* <div>{item.paid}</div> */}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between mt-10 text-sm">
              <div>
                <span className="font-extrabold">
                  Print Date & Time : <span>{getCurrentDate()}</span>
                </span>
              </div>
              <div className="uppercase font-extrabold">SMS Education</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrintReceipt;
