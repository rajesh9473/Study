import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";

const ModalStatusChange = ({ open, handleOpen, getStudentStatusList }) => {
  const [studentsData, setStudentsData] = useState([]);
  const [regno, setRegno] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const data = { regno, name, status };

  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = () => {
    fetch(baseurl + "/api/students ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setStudentsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudentName(regno);
  }, [regno]);

  const getStudentName = (id) => {
    studentsData.map((student) => {
      if (student.regno === id) {
        setName(student.name);
      }
    });
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    // Empty the fields
    setName("");
    setRegno("");
    setStatus("");

    // Post Api For Posting Data
    fetch(baseurl + "/api/reqststatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        toast.success("Request Added Successfully");
        handleOpen();
        getStudentStatusList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Change Status
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6"></div>
            {/* Regno */}
            <div className="w-full px-3 mb-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="regno"
              >
                Regno
              </label>
              {/* <Select
                id="regno"
                label="Select Student"
                onChange={(value) => {
                  setRegno(value);
                }}
              >
                {studentsData.map((student) => (
                  <Option value={student.regno}>
                    {student.regno} | {student.name}
                  </Option>
                ))}
              </Select> */}
            </div>
            {/* Name */}
            <div className="w-full px-3 mb-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 disabled:text-gray-500"
                id="name"
                type="text"
                value={name}
                disabled
              />
            </div>
            {/* Status */}
            <div className="w-full px-3 mb-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Choose Status
              </label>
              <Select
                label="Select Status"
                className="px-2 py-2"
                name="status"
                id="status"
                value={status}
                onChange={(value) => setStatus(value)}
              >
                {/* <Option value="">Choose Status</Option> */}
                <Option value="active">Active</Option>
                <Option value="inActive">InActive</Option>
                <Option value="completed">Completed</Option>
                <Option value="break">Break</Option>
              </Select>
            </div>
            <input
              type="submit"
              className="p-2 bg-[var(--theme-color)] rounded-lg text-white hover:bg-[var(--secondary-color)] cursor-pointer transition-all"
              onClick={onSubmitClick}
            />
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

export default ModalStatusChange;
