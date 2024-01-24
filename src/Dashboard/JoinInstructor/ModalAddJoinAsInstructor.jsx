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

const ModalAddJoinAsInstructor = ({
  open,
  handleOpen,
  getJoinInstructorList,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [qualification, setQualification] = useState("");
  const [exp, setExp] = useState("");
  const [cv, setCv] = useState("");
  const [uploads, setUploads] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);



  const onSubmitClick = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("qualification", qualification);
    formData.append("exp", exp);
    formData.append("cv", cv);
    // Empty the value of fields
    setName("");
    setEmail("");
    setContact("");
    setQualification("");
    setExp("");
    setCv("");

    // Post Api For Posting Data
    fetch(baseurl + "/api/joininstructor", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === true && result.code === 200) {
          getJoinInstructorList();
          toast.success("Lead Added Successfully");
          handleOpen();
        } else {
          toast.info(`${result.message}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      console.log('File MIME Type:', file.type);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('cv', file);


      const response = await fetch(baseurl + '/api/upload/file?fileName=' + file?.name, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const uploadedData = await response.json();
        setUploads([...uploads, uploadedData.fileName]);
        setUploadedImageUrl(uploadedData.fileName);
        console.log('File Uploaded Successfully')

        toast.success('File Uploaded Successfully');
      } else {
        console.log('File Upload Failed');
        toast.warning('File Upload Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
          Add Instructor Lead
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
                  htmlFor="contact"
                >
                  Contact
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="contact"
                  type="number"
                  placeholder="9257643858"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="qualification"
                >
                  Qualification
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="qualification"
                  type="text"
                  placeholder="BTech."
                  value={qualification}
                  onChange={(e) => {
                    setQualification(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Experience"
                >
                  Experience <span className="text-xs italic">(in Years)</span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Experience"
                  type="number"
                  placeholder="(in Years)"
                  value={exp}
                  onChange={(e) => {
                    setExp(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="cv"
                >
                  Upload CV
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="cv"
                  name='cv'
                  type="file"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <Button variant="gradient" color="blue" onClick={onSubmitClick}>
              <span>Submit</span>
            </Button>
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
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalAddJoinAsInstructor;
