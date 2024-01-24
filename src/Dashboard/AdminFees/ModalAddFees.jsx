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
import Select from "react-select";

const ModalAddFees = ({ open, handleOpen, getFeesList }) => {
  const [courses, setCourses] = useState("");
  const [data, setData] = useState([]);
  const [getStudent, setGetStudent] = useState([])
  const [maped, setMaped] = useState([]);
  const [instructorStudent, setInstructorStudent] = useState([]);
  const [mode, setMode] = useState("cash");
  const [transId, setTransId] = useState("");
  const [paid, setPaid] = useState("");
  const [recievedBy, setRecievedBy] = useState("");
  const [date, setDate] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const [formData, setFormData] = useState({
    regno: "",
    student: "",
    name: "",
    courseFee: "",
    mode: "",
    transId: "",
    paid: "",
    recievedBy: "",
    date: "",
    course: "",
    instructor: ""
  });

  const getInstructorList = () => {

    fetch(baseurl + "/api/instructor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCourseList = () => {
    fetch(baseurl + "/api/course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((courses) => {
        setCourses(courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInstructorStudent = (instructorId) => {
    fetch(`${baseurl}/api/course/students/${instructorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((instructorStudent) => {
        setInstructorStudent(instructorStudent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInstructorList();
  }, []);

  useEffect(() => {
    fetchStudentData();
  }, [formData.students]);


  useEffect(() => {
    getCourseList();
  }, []);

  useEffect(() => {
    if (selectedInstructor) {
      getInstructorStudent(selectedInstructor.value);
    }
  }, [selectedInstructor]);

  const instructors = data || [];

  const students = instructorStudent || [];

  const coursesData = courses || [];

  const handleSelectInstructorOption = (selectedInstructor) => {
    setFormData((prevData) => ({
      ...prevData,
      instructor: selectedInstructor,
    }));
    setSelectedInstructor(selectedInstructor);
  };

  const handleSelectStudentOption = (selectedStudent) => {
    setFormData((prevData) => ({
      ...prevData,
      students: selectedStudent,
    }));
    setSelectedInstructor(selectedStudent);

    // Fetch student data when a new student is selected
    if (selectedStudent) {
      fetchStudentData(selectedStudent.value);
    }
  };

  const fetchStudentData = () => {
    fetch(baseurl + "/api/students/" + formData?.students?.value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGetStudent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const instructorOptions = instructors.map((instructor) => ({
    value: instructor._id,
    label: instructor.name,
  }));

  const studentOptions = students?.data?.map((student) => ({
    value: student._id,
    label: student.name,
  }));

  const onSubmitClick = (e) => {
    e.preventDefault();

    const requestData = {
      regno: getStudent.regno,
      student: formData.students.value,
      name: formData.students.label,
      courseFee: formData?.course?.price,
      mode: mode,
      transId: transId,
      paid: paid,
      recievedBy: recievedBy,
      date: date,
      course: formData?.course?._id,
      instructor: formData.instructor.value,
    };


    fetch(baseurl + "/api/fee/create/" + getStudent?.regno, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        // Handle successful response
        toast.success("Fees Added Successfully");
        handleOpen();
        getFeesList();
      })
      .catch((err) => {
        // Handle fetch error
        console.error("Fetch error:", err);
        toast.warning(err);
      });

  };


  useEffect(() => {
    setFormData({
      ...formData,
      course: coursesData?.find(
        (item) => item?.instructor === formData?.instructor?.value
      ),
    });
  }, [formData.instructor]);



  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Add Batch
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* topic */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="topic"
                >
                  Select Instructor
                </label>
                <Select
                  name="instructor"
                  id="instructor"
                  placeholder="Select Instructor"
                  options={instructorOptions}
                  value={formData.instructor}
                  onChange={handleSelectInstructorOption}
                />
              </div>

              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="topic"
                >
                  Select Student
                </label>
                <Select
                  name="student"
                  id="student"
                  placeholder="Select Student"
                  options={studentOptions}
                  value={formData.students}
                  onChange={handleSelectStudentOption}
                />
              </div>
              {/* Course */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="course"
                >
                  Course
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  disabled
                  placeholder="Course"
                  value={getStudent.course}
                />
              </div>
              {/* Course */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="regNo"
                >
                  Reg. No.
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  disabled
                  placeholder="Reg. No."
                  value={getStudent.regno}
                />
              </div>
              {/* From */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="amount"
                >
                  Course Fee
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="amount"
                  name="courseFee"
                  type="number"
                  value={formData?.course?.price}
                  disabled
                />
              </div>
              {/* mode */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="amount"
                >
                  Mode
                </label>
                <div className="flex flex-wrap gap-2">
                  <Radio
                    id="upi"
                    name="type"
                    label="UPI"
                    onChange={() => {
                      setMode("upi");
                    }}
                  />
                  <Radio
                    id="cash"
                    name="type"
                    label="Cash"
                    onChange={() => {
                      setMode("cash");
                    }}
                    defaultChecked={mode === "cash"}
                  />
                  <Radio
                    id="bTransfer"
                    name="type"
                    label="Bank Transfer"
                    onChange={() => {
                      setMode("bTransfer");
                    }}
                  />
                </div>
              </div>
              {/* Transaction ID */}
              {mode === "upi" || mode === "bTransfer" ? (
                <div className="w-full px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="transId"
                  >
                    Transaction ID
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="transId"
                    type="text"
                    placeholder="7645"
                    value={transId}
                    onChange={(e) => {
                      setTransId(e.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {/* To */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="paid"
                >
                  Paid
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="paid"
                  name="paid"
                  type="number"
                  value={paid}
                  onChange={(e) => {
                    setPaid(e.target.value);
                  }}
                />
                <span className="text-red-800">{formData?.course?.price < paid ? 'This is More than Course Fees Minus (-)' : ''}</span>
              </div>
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="recievedBy"
                >
                  Enter receiver Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="recievedBy"
                  name="recievedBy"
                  type="text"
                  value={recievedBy}
                  onChange={(e) => {
                    setRecievedBy(e.target.value);
                  }}
                />
              </div>
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  Fees Submission Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              {/* Instructor */}
              {/* <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  Map Student
                </label>
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-left">
                      <th>Student Name</th>
                      <th>Course</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ overflowY: "scroll", height: "100px" }}>
                    {instructorStudent?.data?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td className="text-center w-28">
                          <Button color={formData.students.some((student) => student._id === item._id) ? 'red' : 'blue'} onClick={() => handleAddStudent(item)}>
                            {formData.students.some((student) => student._id === item._id) ? 'Remove' : 'Add'}
                          </Button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
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
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalAddFees;
