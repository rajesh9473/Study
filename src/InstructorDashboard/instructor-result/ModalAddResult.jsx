import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/useStateContext";

const ModalAddResult = ({ open, handleOpen, getMarksList }) => {
  const [instructorData, setInstructorData] = useState(
    JSON.parse(window.sessionStorage.getItem("instructor-data"))
  );
  const { GetInstructorStudents, instructorStudents } = useAuthContext();
  const [student, setStudent] = useState("");
  const [name, setName] = useState("");
  const [regno, setRegno] = useState(0);
  const [course, setCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [total_marks, setTotal_marks] = useState("");
  const [obtain_marks, setObtain_marks] = useState("");
  const [date, setDate] = useState("");
  const [studentSelect, setStudentSelect] = useState({});

  const [resultTypeOptions] = useState([
    { label: "Surprise", value: "surprise" },
    { label: "Module", value: "module" },
    { label: "Final", value: "final" },
    { label: "Other", value: "other" },
  ]);
  const [resultType, setResultType] = useState("");


  let data = {
    student,
    name,
    regno,
    course,
    resultType,
    topic,
    total_marks,
    obtain_marks,
    date,
  };

  const handleSelectStudent = (data) => {
    setStudent(data?.value)
    setStudentSelect({ label: data?.label, value: data.value });
    setName(data?.name);
    setRegno(data?.regno);
    setCourse(data?.course);
  };

  const onsubmitClick = () => {
    setStudent("")
    setName("");
    setRegno(0);
    setCourse("");
    setTopic("");
    setTotal_marks("");
    setObtain_marks("");
    setDate("");

    // Post Api For Posting Data
    fetch(baseurl + "/api/marks", {
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
        toast.success("Result Added Successfully");
        handleOpen();
        getMarksList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(studentSelect)

  const StudentList = instructorStudents?.map((item) => ({
    label: item?.name,
    value: item?._id,
    name: item?.name,
    regno: item?.regno,
    course: item?.course,
  }));

  useEffect(() => {
    GetInstructorStudents(instructorData?._id);
  }, [instructorData]);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Add Result
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* name */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Select
                  options={StudentList}
                  value={studentSelect}
                  onChange={(value) => handleSelectStudent(value)}
                />
              </div>
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Select Result Type
                </label>
                <Select
                  options={resultTypeOptions}
                  value={resultTypeOptions.find((option) => option.value === resultType)}
                  onChange={(selectedOption) => setResultType(selectedOption.value)}
                />
              </div>
              {/* Regno */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="regno"
                >
                  Regno
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="regno"
                  type="number"
                  placeholder="32144"
                  value={regno}
                  onChange={(e) => {
                    setRegno(e.target.value);
                  }}
                />
              </div>
              {/* course */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="course"
                >
                  Course
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="course"
                  type="text"
                  placeholder="Graphic Designing"
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                />
              </div>
              {/* topic */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="topic"
                >
                  Topic
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="topic"
                  type="text"
                  placeholder="Intro"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                  }}
                />
              </div>
              {/* Total Marks */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="total_marks"
                >
                  Total Marks
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="total_marks"
                  type="number"
                  placeholder="7645"
                  value={total_marks}
                  onChange={(e) => {
                    setTotal_marks(e.target.value);
                  }}
                />
              </div>
              {/* Obtained Marks */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="obtain_marks"
                >
                  Obtained Mark
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="obtain_marks"
                  type="number"
                  placeholder="7645"
                  value={obtain_marks}
                  onChange={(e) => {
                    setObtain_marks(e.target.value);
                  }}
                />
              </div>
              {/* Date */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
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
          <Button variant="gradient" color="blue" onClick={onsubmitClick}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalAddResult;
