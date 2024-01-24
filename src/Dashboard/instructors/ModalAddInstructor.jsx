import React, { useState } from "react";
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

const ModalAddInstructor = ({ open, handleOpen, getInstructorList }) => {
  const { imageUploads, UploadImage } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [degree, setDegree] = useState("");
  const [exp, setExp] = useState("");
  const [status, setStatus] = useState("active");
  const [salary, setSalary] = useState("");

  // const data = new FormData(); // Create a FormData object

  // // Append the profile picture if it's selected
  // if (profilePic) {
  //   data.append("profilePic", profilePic);
  // }

  // // Append other form data fields
  // data.append("name", name);
  // data.append("email", email);
  // data.append("address", address);
  // data.append("contact", contact);
  // data.append("gender", gender);
  // data.append("dob", dob);
  // data.append("qualification", qualification);
  // data.append("degree", degree);
  // data.append("exp", exp);
  // data.append("status", status);
  // data.append("salary", salary);

  const onSubmitClick = ({
    name,
    email,
    address,
    contact,
    gender,
    dob,
    qualification,
    degree,
    exp,
    status,
    salary,
    profilePic,
    cv,
    aadhar,
  }) => {
    const formData = {
      name,
      email,
      address,
      contact,
      gender,
      dob,
      qualification,
      degree,
      exp,
      status,
      salary,
      profilePic: profilePic,
      cv: cv,
      aadhar: aadhar,
    };

    // Post Api For Posting Data
    fetch(baseurl + "/api/instructor", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      }, // Use the FormData object here
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === true && result.code === 200) {
          toast.success("Instructor Added Successfully");
          handleOpen();
          getInstructorList();
        } else {
          toast.error(`${result.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // Clear form fields (except profilePic)
    setName("");
    setEmail("");
    setAddress("");
    setContact("");
    setGender("");
    setDob("");
    setQualification("");
    setDegree("");
    setExp("");
    setSalary("");
  };
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[50%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Add Instructor
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
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
                    name="type"
                    label="Male"
                    value={gender}
                    onChange={(e) => {
                      setGender("male");
                    }}
                  />
                  <Radio
                    id="female"
                    name="type"
                    label="Female"
                    value={gender}
                    onChange={(e) => {
                      setGender("female");
                    }}
                  />
                </div>
              </div>
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
                  name="profilePic"
                  type="file"
                  onChange={(e) => {
                    UploadImage(e);
                  }}
                />
              </div>
              <div className="w-1/2 px-3 mb-3">
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
              <div className="w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Salary
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="salary"
                  type="number"
                  placeholder="(per Month)"
                  value={salary}
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
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
                  value={contact}
                  onChange={(e) => {
                    const enteredValue = e.target.value.replace(/\D/g, '');
                    if (enteredValue.length <= 10) {
                      setContact(e.target.value, enteredValue);
                    }
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
                  htmlFor="status"
                >
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <Radio
                    id="Active"
                    name="types"
                    label="Active"
                    value="active"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    defaultChecked
                  />
                  <Radio
                    id="leave"
                    name="types"
                    label="Leave"
                    value="leave"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="profilePic"
                >
                  Upload Aadhar card / PAN card
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="aadhar"
                  name="aadhar"
                  type="file"
                  onChange={(e) => {
                    UploadImage(e);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="profilePic"
                >
                  Upload CV
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="cv"
                  name="cv"
                  type="file"
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
            onClick={() =>
              onSubmitClick({
                name: name,
                email: email,
                aadhar: imageUploads.aadhar,
                address: address,
                contact: contact,
                cv: imageUploads.cv,
                degree: degree,
                dob: dob,
                exp: exp,
                gender: gender,
                profilePic: imageUploads.profilePic,
                qualification: qualification,
                salary: salary,
                status: status,
              })
            }
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalAddInstructor;
