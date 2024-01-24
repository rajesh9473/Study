import React, { useState } from "react";
import ModalUpdateProfile from "./ModalUpdateProfile";
import baseurl from "../../Config";
import { useAuthContext } from "../../context/useStateContext";
import moment from "moment";

const StudentProfile = ({ auth }) => {
  const { currentUser, getStudentData } = useAuthContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

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

  // useEffect(() => {
  //   getStudentData();
  // }, []);

  return (
    <>
      <section className=" p-2 sm:p-3 md:p-10 border-b  border-[var(--secondary-color)]">
        {/* Profile Image Section */}
        <div className=" mt-1">
          <div className="flex flex-col items-center justify-center">
            <img
              // src={`${baseurl}/api/stprofilepic/${currentUser.profilePic}`}
              src={baseurl + `/${currentUser?.profilePic}` || 'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'}
              className="w-48 h-48 rounded-lg ring-white ring-2"
              style={{ boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset' }}
              alt=""
            />
            <h4 className="text-black text-3xl font-semibold my-3">
              {currentUser.name}
            </h4>
            {/* <p className="text-black">@student</p> */}
            {/* <Button onClick={handleOpen} className="h-fit my-3">
                Update
              </Button> */}
          </div>
          <ModalUpdateProfile
            open={open}
            handleOpen={handleOpen}
            studentData={currentUser}
            getStudentData={getStudentData}
          />
        </div>

        {/* Account Type */}
        {/* <div className="flex flex-row justify-center my-2">
          <div className="p-3">
            <div>Account Type:</div>
            <div>
              <span className="p-1 bg-[var(--secondary-color)] text-sm text-white rounded-full">
                Student
              </span>{" "}
            </div>
          </div>
          <div className="p-3 border-l">
            <div>Member since:</div>
            <div className="text-sm text-[var(--secondary-color)]">
              {studentData.admdate}
            </div>
          </div>
          <div className="p-3 border-l">
            <div>Roll ID:</div>
            <div className="text-sm text-[var(--secondary-color)]">
              {studentData.regno}
            </div>
          </div>
        </div> */}

        {/* Personal Information */}
        <div className="px-2 mx-auto mt-10 max-w-4xl">
          <h3 className="font-semibold my-5">Personal Information</h3>
          <div className="lg:max-w-5xl">
            {/* 1st Row */}
            <div className="flex flex-row mt-2">
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Name :</div>
                <div className="my-1 text-[var(--dash-heading)]">
                  {currentUser.name}
                </div>
              </div>
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Father Name :</div>
                <div className="my-1 text-[var(--dash-heading)]">
                  {currentUser.fname}
                </div>
              </div>
            </div>
            {/* 2nd Row */}
            <div className="flex flex-row mt-2">
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Admission Date :</div>
                <div className="my-1 text-[var(--dash-heading)]">
                  {moment(currentUser.admdate).format('MMMM Do YYYY')}
                </div>
              </div>
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Registration No. :</div>
                <div className="my-1 text-[var(--dash-heading)]">
                  {currentUser.regno}
                </div>
              </div>
            </div>
            {/* 2nd Row */}
            <div className="flex flex-row mt-4">
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Email :</div>
                <div className="my-1 text-[var(--dash-heading)]">
                  {currentUser.email}
                </div>
              </div>
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Contact :</div>
                <div className="my-1 text-[var(--dash-heading)]">
                  {currentUser.contact}
                </div>
              </div>
            </div>
            {/* 3rd Row */}
            <div className="flex flex-row mt-4">
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Locker No :</div>
                <div className="my-1 text-[var(--dash-heading)]">
                  {currentUser?.locker_no || 'NA'}
                </div>
              </div>
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Date of Birth :</div>
                <div className="my-1 text-[var(--dash-heading)]">
                  {moment(currentUser.dob).format('MMMM Do YYYY')}
                </div>
              </div>
            </div>
            {/* 4th Row */}
            <div className="flex flex-row mt-4">
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Address :</div>
                <div className="my-1 text-[var(--dash-heading)] max-w-none break-words ">
                  {currentUser.address}
                </div>
              </div>
              {/* Info */}
              <div className="text-sm w-full md:w-1/2 m-2">
                <div className="my-1">Gender :</div>
                <div className="my-1 text-[var(--dash-heading)] capitalize">
                  {currentUser.gender}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentProfile;
