import React from "react";
import logo2 from "../assets/images/logo2.jpg";
import { Link } from "react-router-dom";

const InstituteHeader = () => {
  return (
    <div className="relative flex items-center justify-end sm:justify-center text-3xl sm:text-4xl px-2 font-bold bg-[var(--bg-light-blue)] text-white py-4 uppercase text-center ">
      <Link to="/" className="p-1 bg-white absolute top-0 left-2 rounded-lg">
        <img src={logo2} className="w-20 h-20 " alt="" />
      </Link>
      <div>
        <div>SMS Education</div>
        <div className="text-sm my-1 normal-case">Nielit Computer Center</div>
      </div>
    </div>
  );
};

export default InstituteHeader;
