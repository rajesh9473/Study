import React from "react";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import moment from "moment";

const ModalViewStudent = ({ open, handleOpen, item }) => {
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[60%] focus-visible:outline-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody
          divider
          className="h-[35rem] text-[var(--secondary-color)] overflow-y-scroll border-0 "
        >
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={handleOpen}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {/* Profile Image Section */}
          <div className=" mt-1">
            <div className="flex flex-col items-center justify-center">
              <img
                // src={`${baseurl}/api/stprofilepic/${item.profilePic}`}
                src={baseurl + `/${item.profilePic}` || 'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg'}
                className="w-28 h-28 rounded-full shadow-xl ring-white ring-2"
                alt=""
              />
              <h4 className="text-black text-lg font-semibold my-3">
                {item.name}
              </h4>
              <h4
                className={
                  "text-[var(--secondary-color)] text-md font-semibold capitalize"
                }
              >
                <span
                  className={
                    item.status.toLowerCase() === "active"
                      ? "text-teal-500"
                      : item.status.toLowerCase() === "pending"
                        ? "text-yellow-500"
                        : item.status.toLowerCase() === "completed"
                          ? "text-green-500"
                          : item.status.toLowerCase() === "absconded"
                            ? "text-red-500"
                            : ""
                  }
                >
                  {item.status}
                </span>
              </h4>
            </div>
          </div>
          <div className="px-2 mx-auto mt-10 max-w-xl">
            <div className="lg:max-w-5xl">
              {/* 1st Row */}
              <div className="flex flex-row mt-2">
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold text-md">Name :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {item.name}
                  </div>
                </div>
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Father Name :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {item.fname}
                  </div>
                </div>
              </div>
              {/* @nd Row */}
              <div className="flex flex-row mt-2">
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold text-md">Course :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {item.course}
                    {console.log(item.course)}
                  </div>
                </div>
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Shift :</div>
                  <div className="my-1 text-[var(--dash-heading)] capitalize">
                    {item.shift}
                  </div>
                </div>
              </div>
              {/* 2nd Row */}
              <div className="flex flex-row mt-2">
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Admission Date :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {moment(item.admdate).format('MMMM Do YYYY')}
                  </div>
                </div>
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Registration No. :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {item.regno}
                  </div>
                </div>
              </div>
              {/* 2nd Row */}
              <div className="flex flex-row mt-4">
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Email :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {item?.email || 'NA'}
                  </div>
                </div>
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Contact :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {item.contact}
                  </div>
                </div>
              </div>
              {/* 3rd Row */}
              <div className="flex flex-row mt-4">
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Locker No :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {item?.locker_no || 'NA'}
                  </div>
                </div>
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Date of Birth :</div>
                  <div className="my-1 text-[var(--dash-heading)]">
                    {moment(item.dob).format('MMMM Do YYYY')}
                  </div>
                </div>
              </div>
              {/* 4th Row */}
              <div className="flex flex-row mt-4">
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Address :</div>
                  <div className="my-1 text-[var(--dash-heading)] max-w-none break-words ">
                    {item.address}
                  </div>
                </div>
                {/* Info */}
                <div className="text-sm w-full md:w-1/2 m-2">
                  <div className="my-1 font-bold">Gender :</div>
                  <div className="my-1 text-[var(--dash-heading)] capitalize">
                    {item.gender}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ModalViewStudent;
