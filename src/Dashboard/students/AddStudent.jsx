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

const AddStudent = ({ open, handleOpen }) => {
  const [regno, setRegno] = useState("");
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [admdate, setAdmdate] = useState("");
  const [refby, setRefby] = useState("");
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
  const [formData, setFormData] = useState({});
  const handleChangeinput = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const data = {
    regno,
    name,
    fname,
    address,
    contact,
    email,
    gender,
    dob,
    admdate,
    refby,
    course,
    locker_no,
    shift,
    profilePic: imageUploads.profilePic,
    idCardimg: imageUploads.idCard,
    tenthMarksheet: imageUploads.tenthMarksheet,
    twelthMarksheet: imageUploads.intermediatemarksheet,
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
    setName("");
    setEmail("");
    setRegno("");
    setFname("");
    setAddress("");
    setGender("");
    setAdmdate("");
    setRefby("");
    setContact("");
    setDob("");
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
          toast.success("Student Enrolled Successfully");
          console.log(result);
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
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[50%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Add Student
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="first-name"
                >
                  Full Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="fullName"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name || ""}
                  // value={name}
                  // onChange={(e) => {
                  //   setName(e.target.value);
                  // }}
                  onChange={(e) => {
                    handleChangeinput(e.target.name, e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="fatherName"
                >
                  Father Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="fatherName"
                  type="text"
                  name="fname"
                  placeholder="Harry Doe"
                  value={formData.fname || ""}
                  // onChange={(e) => {
                  //   setFname(e.target.value);
                  // }}
                  onChange={(e) => {
                    handleChangeinput(e.target.name, e.target.value);
                  }}
                />
              </div>
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@gmail.com"
                  value={formData.email || ""}
                  onChange={(e) => {
                    handleChangeinput(e.target.name, e.target.value);
                  }}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                />
              </div>
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  type="text"
                  name="address"
                  placeholder="7th Street, Mexico, USA"
                  value={formData.address || ""}
                  onChange={(e) => {
                    handleChangeinput(e.target.name, e.target.value);
                  }}
                // onChange={(e) => {
                //   setAddress(e.target.value);
                // }}
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="contact"
                >
                  Contact
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="contact"
                  type="tel"
                  placeholder="9257643858"
                  name="contact"
                  value={formData.contact || ""}
                  onChange={(e) => {
                    const enteredValue = e.target.value.replace(/\D/g, '');
                    if (enteredValue.length <= 10) {
                      handleChangeinput(e.target.name, enteredValue);
                    }
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <div className="flex gap-10">
                  <Radio
                    id="male"
                    name="gender"
                    label="Male"
                    value={formData.gender || ""}
                    // onChange={(e) => {
                    //   setGender("male");
                    // }}
                    onChange={(e) => {
                      handleChangeinput(e.target.name, "male");
                    }}
                  />
                  <Radio
                    id="female"
                    name="gender"
                    label="Female"
                    value={formData.gender || ""}
                    onChange={(e) => {
                      handleChangeinput(e.target.name, "female");
                    }}
                  />
                </div>
              </div>
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
                  placeholder="7643858"
                  name="regno"
                  value={formData.regno || ""}
                  onChange={(e) => {
                    handleChangeinput(e.target.name, e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="dob"
                >
                  Date Of Birth
                </label>
                <input
                  className="scroll-smooth appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob || ""}
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
                  onChange={(e) => {
                    handleChangeinput(e.target.name, e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="refBy"
                >
                  Referred By
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="refBy"
                  type="text"
                  placeholder="Suman Yadav"
                  name="refby"
                  value={formData.refby || ""}
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
                    name="course"
                    label="Course"
                  />
                  <Radio
                    id="library"
                    onChange={() => setOpt("library")}
                    name="course"
                    label="Library"
                  />
                  <Radio
                    id="both"
                    onChange={() => setOpt("both")}
                    name="course"
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
                    className="p-2 border focus-visible:outline-none w-full rounded-md"
                    name="course"
                    value={formData.course || ""}
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
                    placeholder="544543"
                    name="locker_no"
                    value={formData.locker_no || ""}
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
                    name="shift"
                    value={formData.shift || ""}
                    onChange={(e) => {
                      handleChangeinput(e.target.name, "1st Shift");
                    }}
                    label="1st Shift"
                  />
                  <Radio
                    id="shift"
                    name="shift"
                    value={formData.shift || ""}
                    onChange={(e) => {
                      handleChangeinput(e.target.name, "2nd Shift");
                    }}
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
                  Upload Thumb
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
                  Upload Signature
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
          <Button
            variant="gradient"
            color="blue"
            onClick={onSubmitClick}
          // onClick={() => console.log(formData)}
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddStudent;
