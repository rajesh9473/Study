import React, { useEffect, useState } from "react";
import baseurl from "../../Config";
import StudentSingleTeacher from "./StudentSingleTeacher";
import man from "../../assets/images/man.jpg";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useAuthContext } from "../../context/useStateContext";

const StudentTeachers = ({ enrollData, instructors }) => {



  return (
    <>
      <div className="flex flex-row justify-around flex-wrap">
        {/* <StudentSingleTeacher enroll={enrollData} /> */}
        {/* <h2 className="text-lg text-center my-10">No Instructors</h2> */}
        {instructors?.instructors?.map((item) => (
          <div
            key={item?._id}
            className="m-3 bg-white rounded-lg border shadow-xl flex items-center gap-4 p-5 place-items-center relative"
          >
            <div className="w-2/5">
              <img src={`${baseurl}/${item?.profilePic || 'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'}`}
                className="h-52 w-52 rounded-full" alt="..." />
            </div>
            <div className="grid grid-cols-2 w-full">
              <div className="p-5 flex items-center">
                <div className="font-bold w-24">Name</div>
                <div className="w-full">{item?.name}</div>
              </div>
              <div className="p-5 flex items-center">
                <div className="font-bold w-24">Course</div>
                <div className="w-full">{instructors?.data[0]?.enrolled_courses?.find((x) => x?.instructor === item?._id)?.title}</div>
                {/* <div>{console.log(instructors?.data[0]?.enrolled_courses?.find((x) => x?.instructor === item?._id)?.title)}</div> */}
              </div>
              <div className="p-5 flex items-center">
                <div className="font-bold w-24">Email</div>
                <div className="w-full">{item?.email}</div>
              </div>
              <div className="p-5 flex items-center">
                <div className="font-bold w-32">Mobile No.</div>
                <div className="w-full">{item?.contact}</div>
              </div>
            </div>
            <div
              className="absolute top-[-15px] right-[-15px]">
              <FaChalkboardTeacher size={50} />

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentTeachers;
