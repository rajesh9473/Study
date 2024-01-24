import React, { useDebugValue, useEffect, useState } from "react";
import { Radio, Button } from "@material-tailwind/react";
import baseurl from "../../Config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import axios from "axios";
import { RiAddBoxFill } from "react-icons/ri";

const EditStudent = () => {
  const [loader, setLoader] = useState(false);
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
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  // update
  const [opt, setOpt] = useState("");
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState("");
  const [shift, setShift] = useState("");
  const [locker_no, setLocker_no] = useState("");
  const [courseData, setCourseData] = useState([]);
  const location = useLocation();
  const [imageUploads, setImageUploads] = useState({});
  const stuData = location.state;

  const [formData, setFormData] = useState({});

  const handleFormData = (e) => {
    const { name, value } = e.target;

    // Check if the field is the "contact" field and if the value is a valid 10-digit number
    if (name === "contact" && value.length <= 10 && /^\d+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== "contact") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const navigate = useNavigate();

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

  // PUT Api For Updating Data

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      // profilePic: imageUploads.profilePic,
      gender: gender,
      shift: shift,
      ...formData,
    };

    try {
      const response = await axios.patch(
        baseurl + "/api/students/" + stuData._id,
        newFormData
      );
      console.log(newFormData);
      if (response.status === 200) {
        toast.success("Updated Successfully");
        setLoader(false);
        navigate("/admin/students");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UploadImage = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(baseurl + "/api/uploadfile", {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log(data);
            const value = { [e.target.name]: data.fileName };
            setImageUploads({ ...imageUploads, ...value });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setFormData({ ...formData, ...stuData });
  }, []);
  useEffect(() => {
    if (imageUploads.profilePic) {
      setFormData({ ...formData, profilePic: imageUploads.profilePic });
    }
    if (imageUploads.aadhar_pan) {
      setFormData({ ...formData, aadhar_pan: imageUploads.aadhar_pan });
    }
  }, [imageUploads]);
  return (
    <>
      {loader ? (
        <div className="w-full h-[90vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto p-5">
          <h2 className="text-3xl text-center font-bold my-5">Edit Student</h2>
          <div className=" md:px-5 lg:px-10 mt-20">
            <form>
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
                    placeholder="John Doe"
                    name="name"
                    value={formData.name || ""}
                    // onChange={(e) => {
                    //   setName(e.target.value);
                    // }}
                    onChange={handleFormData}
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
                    placeholder="Harry Doe"
                    name="fname"
                    value={formData.fname || ""}
                    // onChange={(e) => {
                    //   setFname(e.target.value);
                    // }}
                    onChange={handleFormData}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
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
                    placeholder="john@gmail.com"
                    name="email"
                    value={formData.email || ""}
                    // onChange={(e) => {
                    //   setEmail(e.target.value);
                    // }}
                    onChange={handleFormData}
                  />
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
                    // onChange={(e) => {
                    //   setRegno(e.target.value);
                    // }}
                    onChange={handleFormData}
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
                    placeholder="7th Street, Mexico, USA"
                    name="address"
                    value={formData.address || ""}
                    // onChange={(e) => {
                    //   setAddress(e.target.value);
                    // }}
                    onChange={handleFormData}
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
                    onChange={handleFormData}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-3">
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
                      onChange={() =>
                        setFormData({ ...formData, gender: "male" })
                      }
                    />
                    <Radio
                      id="female"
                      name="gender"
                      label="Female"
                      value={formData.gender || ""}
                      onChange={() =>
                        setFormData({ ...formData, gender: "female" })
                      }
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    label="Select Status"
                    name="status"
                    className="p-2 border w-full focus-visible:outline-none"
                    value={formData.status || ""}
                    // onChange={(e) => {
                    //   setStatus(e.target.value);
                    // }}
                    onChange={handleFormData}
                  >
                    <option
                      value="active"
                      selected={formData.status === "active" ? true : false}
                    >
                      Active
                    </option>
                    <option
                      value="pending"
                      selected={formData.status === "pending" ? true : false}
                    >
                      Pending{" "}
                    </option>
                    <option
                      value="completed"
                      selected={formData.status === "completed" ? true : false}
                    >
                      Completed{" "}
                    </option>
                    <option
                      value="absconded"
                      selected={formData.status === "absconded" ? true : false}
                    >
                      Break{" "}
                    </option>
                  </select>
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
                    // onChange={(e) => {
                    //   setDob(e.target.value);
                    // }}
                    onChange={handleFormData}
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
                    onChange={handleFormData}
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
                    name="refby"
                    placeholder="Suman Yadav"
                    value={formData.refby || ""}
                    // onChange={(e) => {
                    //   setRefby(e.target.value);
                    // }}
                    onChange={handleFormData}
                  />
                </div>
                {/* Password */}
                <div className="md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="scroll-smooth appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="password"
                    type="password"
                    value={formData.password || ""}
                    name="password"
                    // onChange={(e) => {
                    //   setPassword(e.target.value);
                    // }}
                    onChange={handleFormData}
                  />
                </div>
                <div className="md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Upload Profile
                  </label>
                  <input
                    className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="profilePic"
                    name="profilePic"
                    type="file"
                    onChange={(e) => {
                      UploadImage(e);
                    }}
                  />
                </div>
                <div className="md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Upload Aadhaar Card
                  </label>
                  <input
                    className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="aadhaarCard"
                    name="aadhar_pan"
                    type="file"
                    onChange={(e) => {
                      UploadImage(e);
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
                    // defaultChecked={stuData.course ? true : false}
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
                      className="p-2 border w-full rounded-md focus-visible:outline-none"
                      value={formData?.course || ""}
                      name="course"
                      onChange={handleFormData}
                    >
                      <option value="">Select Course</option>
                      {courseData.map((item) => {
                        return (
                          <option
                            value={item.title}
                            selected={
                              item._id === stuData?.course ? true : false
                            }
                          >
                            {item.title}
                          </option>
                        );
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
                      onChange={handleFormData}
                    />
                  </div>
                ) : ('')}

                {
                  opt === 'course' &&
                  <div className="flex items-center text-blue-600 cursor-pointer">
                    <RiAddBoxFill size={30} />
                    <p className="">Add More Course</p>
                  </div>
                }

                <div className="flex items-center w-full">
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
                        onChange={() => setShift("1st Shift")}
                        name="shift"
                        value={shift}
                        // onChange={handleFormData}
                        label="1st Shift"
                      // defaultChecked={
                      //   formData.shift == "1st Shift" ? true : false
                      // }
                      />
                      <Radio
                        id="shift"
                        onChange={() => setShift("2nd Shift")}
                        // onChange={handleFormData}
                        value={shift}
                        name="shift"
                        label="2nd Shift"
                      // defaultChecked={
                      //   formData.shift == "2nd Shift" ? true : false
                      // }
                      />
                    </div>
                  </div>

                  <button
                    className="h-fit p-2 bg-[var(--theme-color)] rounded-lg text-white hover:bg-[var(--secondary-color)] cursor-pointer transition-all"
                    onClick={handleSubmit}
                  >
                    Sumbit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStudent;
