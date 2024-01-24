import React, { useEffect, useState } from "react";
import { Radio, Button } from "@material-tailwind/react";
import baseurl from "../../Config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/useStateContext";
import axios from "axios";
import moment from "moment/moment";

const EditInstructor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [qualification, setQualification] = useState("");
  const [degree, setDegree] = useState("");
  const [exp, setExp] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("");
  const location = useLocation();
  const instData = location.state;
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);
  const { imageUploads, UploadImage, setImageUploads } = useAuthContext();

  const navigate = useNavigate();

  const { id } = useParams();

  const handleProfilePicUpload = async (e) => {
    try {
      await UploadImage(e);
      if (imageUploads.profilePic) {
        setSelectedProfilePic(baseurl + "/" + imageUploads.profilePic);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  useEffect(() => {
    setName(instData.name);
    setEmail(instData.email);
    setAddress(instData.address);
    setGender(instData.gender);
    setDob(instData.dob);
    setDoj(instData.doj);
    setQualification(instData.qualification);
    setDegree(instData.degree);
    setExp(instData.exp);
    setContact(instData.contact);
    setPassword(instData.password);
    setProfilePic(instData.profilePic);
    setStatus(instData.status);
    setSalary(instData.salary);
  }, [instData]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Empty the value of fields
  //   setName("");
  //   setEmail("");
  //   setAddress("");
  //   setGender("");
  //   setDob("");
  //   setQualification("");
  //   setDegree("");
  //   setExp("");
  //   setContact("");
  //   setPassword("");
  //   setProfilePic("");
  //   setSalary("");

  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("address", address);
  //   formData.append("gender", gender);
  //   formData.append("dob", dob);
  //   formData.append("qualification", qualification);
  //   formData.append("degree", degree);
  //   formData.append("exp", exp);
  //   formData.append("contact", contact);
  //   formData.append("password", password);
  //   formData.append("profilePic", profilePic);
  //   formData.append("salary", salary);
  //   formData.append("status", status);

  //   // Post Api For Posting Data
  //   fetch(baseurl + "/api/instructor/" + instData._id, {
  //     method: "PUT",
  //     body: formData,
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       toast.info("Updated Successfully");
  //       navigate("/admin/instructorList");
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with the fetch operation:", error);
  //       toast.error("Failed to update instructor data. Please try again.");
  //     });
  // };

  const handleSubmit = async (
    e,
    {
      name,
      email,
      address,
      gender,
      dob,
      doj,
      qualification,
      degree,
      exp,
      contact,
      password,
      profilePic,
      salary,
      status,
    }
  ) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      address,
      gender,
      dob,
      doj,
      qualification,
      degree,
      exp,
      contact,
      password,
      profilePic,
      salary,
      status,
    };

    try {
      const response = await axios.patch(
        `${baseurl}/api/instructor/${instData._id}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Updated successfully");
        navigate("/admin/instructorList");
        return response.data;
      } else {
        // Handle non-200 status codes
        toast.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("API request failed:", error);
      toast.error("Failed to update. Please try again.");
    }
  };

  return (
    <>
      <div className=" max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto p-5">
        <h2 className="text-3xl text-center font-bold my-5">Edit Instructor</h2>
        <div className="w-[80%] md:px-5 lg:px-10 mx-auto mt-20">
          <form
            onSubmit={(e) =>
              handleSubmit(e, {
                name: name,
                email: email,
                address: address,
                gender: gender,
                dob: dob,
                doj: doj,
                qualification: qualification,
                contact: contact,
                degree: degree,
                exp: exp,
                password: password,
                profilePic: imageUploads.profilePic,
                salary: salary,
                status: status,
                id: id,
              })
            }
            className="w-full px-10 mt-5 border py-3"
          >
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
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
                    value={gender}
                    onChange={(e) => {
                      setGender("male");
                    }}
                    checked={gender === "male"}
                  />
                  <Radio
                    id="female"
                    name="gender"
                    label="Female"
                    value={gender}
                    onChange={(e) => {
                      setGender("female");
                    }}
                    checked={gender === "female"}
                  />
                </div>
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
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
                {console.log(doj)}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="doj"
                >
                  Joining Date
                </label>
                <input
                  className="scroll-smooth appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="doj"
                  type="date"
                  value={moment(doj).format('YYYY-MM-DD')}
                  onChange={(e) => {
                    setDoj(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  qualification{" "}
                  <span className="text-xs mx-1 text-gray-500 lowercase font-light">
                    (seperated by comma)
                  </span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="qualification"
                  type="text"
                  placeholder="B.Tech, MCA"
                  value={qualification}
                  onChange={(e) => {
                    setQualification(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="degree"
                >
                  Highest Degree
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="degree"
                  type="text"
                  placeholder="MCA"
                  value={degree}
                  onChange={(e) => {
                    setDegree(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="exp"
                >
                  Experience
                  <span className="text-xs mx-1 text-gray-500 lowercase font-light">
                    (in years)
                  </span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="exp"
                  type="number"
                  placeholder="2.5"
                  value={exp}
                  onChange={(e) => {
                    setExp(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password"
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="profilePic"
                >
                  Profile Pic
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="profilePic"
                  name="profilePic"
                  type="file"
                  onChange={handleProfilePicUpload}
                />
              </div>
              <div className="w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="salary"
                >
                  Salary
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="salary"
                  type="number"
                  placeholder="(in Month)"
                  value={salary}
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                />
              </div>
              <div className="w-full px-3 mb-3">
                {/* Status */}
                <div className="w-full px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Radio
                      id="Active"
                      name="type"
                      label="Active"
                      value="active"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      defaultChecked={instData?.status === "active"}
                    />
                    <Radio
                      id="leave"
                      name="type"
                      label="Leave"
                      value="leave"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      defaultChecked={instData?.status === "leave"}
                    />
                    <Radio
                      id="hold"
                      name="type"
                      label="Hold"
                      value="hold"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      defaultChecked={instData?.status === "hold"}
                    />
                    <Radio
                      id="break"
                      name="type"
                      label="Break"
                      value="break"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      defaultChecked={instData?.status === "break"}
                    />
                  </div>
                </div>

                <input
                  type="submit"
                  className="h-fit p-2 my-5 bg-[var(--theme-color)] rounded-lg text-white hover:bg-[var(--secondary-color)] cursor-pointer transition-all"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditInstructor;
