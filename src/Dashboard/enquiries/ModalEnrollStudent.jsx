import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/useStateContext";

const ModalEnrollStudent = ({
  open,
  handleOpen,
  item,
  HandleEnquiryStatus,
}) => {
  const { name, fname, address, contact, email, gender, dob, refby } = item;
  const [regno, setRegno] = useState("");
  const [admdate, setAdmdate] = useState("");
  const [opt, setOpt] = useState("");
  const [course, setCourse] = useState("");
  const [shift, setShift] = useState("");
  const [locker_no, setLocker_no] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [idCardimg, setIdCardimg] = useState(null);
  const [tenthMarksheet, setTenthMarksheet] = useState(null);
  const [twelthMarksheet, setTwelthMarksheet] = useState(null);
  const { imageUploads, UploadImage } = useAuthContext();

  const [formData, setFormData] = useState({
    name,
    fname,
    address,
    contact,
    gender,
    email,
    dob,
    refby,
  });
  const handleChangeinput = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const data = {
    regno,
    admdate,
    course,
    locker_no,
    shift,
    name,
    fname,
    address,
    contact,
    email,
    gender,
    dob,
    refby,
    profilePic: imageUploads?.profilePic,
    idCardimg: imageUploads?.idCardimg,
    tenthMarksheet: imageUploads?.tenthMarksheet,
    twelthMarksheet: imageUploads?.twelthMarksheet,
    thumb: imageUploads?.thumb,
    signature: imageUploads?.signature,
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = () => {
    fetch(baseurl + "/api/course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCourseData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitClick = () => {
    // Empty the value of fields
    setOpt("");
    setRegno("");
    setAdmdate("");
    setCourse("");
    setShift("");
    setLocker_no("");
    setProfilePic("");
    setIdCardimg("");
    setTenthMarksheet("");
    setTwelthMarksheet("");
    // Post Api For Posting Data
    fetch(baseurl + "/api/students", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === true && result.code === 200) {
          HandleEnquiryStatus(item._id, "joined");
          toast.success("Student Enrolled Successfully");
          handleOpen();
        } else {
          toast.info(`${result.message}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      ...imageUploads,
    });
  }, [imageUploads]);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[50%] !z-0"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Enroll Student
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="regno"
                >
                  Registration No.
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="regno"
                  type="number"
                  name="regno"
                  placeholder="7643858"
                  value={formData?.regno || ""}
                  // value={regno}
                  // onChange={(e) => {
                  //   setRegno(e.target.value);
                  // }}
                  onChange={(e) => {
                    handleChangeinput(e.target.name, e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="admdate"
                >
                  Admission Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="admdate"
                  type="date"
                  name="admdate"
                  value={formData.admdate || ""}
                  // onChange={(e) => {
                  //   setAdmdate(e.target.value);
                  // }}
                  onChange={(e) => {
                    handleChangeinput(e.target.name, e.target.value);
                  }}
                />
              </div>
              {/* Option */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="opt"
                >
                  You Want
                </label>
                <div className="flex flex-wrap gap-1">
                  <Radio
                    id="course"
                    onChange={() => setOpt("course")}
                    name="type"
                    label="Course"
                  />
                  <Radio
                    id="library"
                    onChange={() => setOpt("library")}
                    name="type"
                    label="Library"
                  />
                  <Radio
                    id="both"
                    onChange={() => setOpt("both")}
                    name="type"
                    label="Both"
                  />
                </div>
              </div>
              {/* Course */}
              {opt === "course" || opt === "both" ? (
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="course"
                  >
                    Course
                  </label>
                  <select
                    label="Select Course"
                    name="course"
                    className="p-2 border focus-visible:outline-none w-full rounded-sm"
                    value={formData.course || ""}
                    // onChange={(e) => {
                    //   setCourse(e.target.value);
                    // }}
                    onChange={(e) => {
                      handleChangeinput(e.target.name, e.target.value);
                    }}
                  >
                    <option value="">Select Course</option>
                    {courseData.map((item) => {
                      return <option value={item.title}>{item.title}</option>;
                    })}
                  </select>
                </div>
              ) : (
                ""
              )}
              {/* Locker No. */}
              {opt === "library" || opt === "both" ? (
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="locker_no"
                  >
                    Locker Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="locker_no"
                    type="number"
                    name="locker_no"
                    placeholder="544543"
                    value={formData.locker_no || ""}
                    // onChange={(e) => {
                    //   setLocker_no(e.target.value);
                    // }}
                    onChange={(e) => {
                      handleChangeinput(e.target.name, e.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              {/* Shift */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="opt"
                >
                  Shift
                </label>
                <div className="flex flex-wrap gap-1">
                  <Radio
                    id="shift"
                    // onChange={() => setShift("1st Shift")}
                    onChange={(e) => {
                      handleChangeinput(e.target.name, "1st Shift");
                    }}
                    name="shift"
                    label="1st Shift"
                  />
                  <Radio
                    id="shift"
                    // onChange={() => setShift("2nd Shift")}
                    onChange={(e) => {
                      handleChangeinput(e.target.name, "2st Shift");
                    }}
                    name="shift"
                    label="2nd Shift"
                  />
                </div>
              </div>
              {/* profile pic */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="profilePic"
                >
                  Profile Pic
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="profilePic"
                  type="file"
                  name="profilePic"
                  onChange={(e) => {
                    UploadImage(e);
                  }}
                />
              </div>
              {/* Aadhar card / PAN card  */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="idCard"
                >
                  Aadhar card / PAN card
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="idCard"
                  type="file"
                  name="aadhar_pan"
                  onChange={(e) => {
                    UploadImage(e);
                  }}
                />
              </div>
              {/* Upload 10th Marksheet */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="idCard"
                >
                  Upload 10th Marksheet
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="idCard"
                  type="file"
                  name="tenthMarksheet"
                  onChange={(e) => {
                    UploadImage(e);
                  }}
                />
              </div>
              {/* 12th marksheet or above  */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="idCard"
                >
                  Add Thumb
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="idCard"
                  type="file"
                  name="thumb"
                  onChange={(e) => {
                    UploadImage(e);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="idCard"
                >
                  Add Signature
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="idCard"
                  type="file"
                  name="signature"
                  onChange={(e) => {
                    UploadImage(e);
                  }}
                />
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={onSubmitClick}>
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalEnrollStudent;
