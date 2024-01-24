import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import Select from "react-select";

const ModalAddBatch = ({ open, handleOpen, getScheduledBatchesList }) => {
  const [courses, setCourses] = useState("");
  const [data, setData] = useState([]);
  const [maped, setMaped] = useState([]);
  const [instructorStudent, setInstructorStudent] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

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
    getCourseList();
  }, []);

  useEffect(() => {
    if (selectedInstructor) {
      getInstructorStudent(selectedInstructor.value);
    }
  }, [selectedInstructor]);

  const instructors = data || [];

  const instructorOptions = instructors.map((instructor) => ({
    value: instructor._id,
    label: instructor.name,
  }));

  const coursesData = courses || [];


  const [formData, setFormData] = useState({
    instructor: null,
    course: null,
    from: "",
    to: "",
    students: [],
  });


  const handleSelectInstructorOption = (selectedInstructor) => {
    setFormData((prevData) => ({
      ...prevData,
      instructor: selectedInstructor,
    }));
    setSelectedInstructor(selectedInstructor);
  };

  const handleSelectcourseOption = (selectedCourse) => {
    setFormData((prevData) => ({
      ...prevData,
      course: selectedCourse,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddStudent = (selectedStudent) => {
    const isStudentAdded = formData.students.some((student) => student._id === selectedStudent._id);

    if (isStudentAdded) {
      const updatedStudents = formData.students.filter((student) => student._id !== selectedStudent._id);
      setFormData((prevData) => ({
        ...prevData,
        students: updatedStudents,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        students: [...prevData.students, selectedStudent],
      }));
    }
  };


  const onSubmitClick = (e) => {
    e.preventDefault();

    const requestData = {
      instructor: formData.instructor ? formData.instructor.value : null,
      batchTime: {
        from: formData.from,
        to: formData.to,
      },
      course: formData.course._id,
      students: formData.students.map((student) => student._id),
    };

    console.log('Request Data:', requestData);

    fetch(baseurl + "/api/batch/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Batch Scheduled Successfully");
        handleOpen();
        getScheduledBatchesList();
        setFormData({
          instructor: null,
          course: null,
          from: "",
          to: "",
          students: [],
        });
      })
      .catch((err) => {
        console.log(err);
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
                  INSTRUCTOR NAME
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
                  value={formData?.course?.title}
                />
              </div>
              {/* From */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  From
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="from"
                  name="from"
                  type="datetime-local"
                  value={formData.from}
                  onChange={handleInputChange}
                />
              </div>
              {/* To */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  To
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="to"
                  name="to"
                  type="datetime-local"
                  value={formData.to}
                  onChange={handleInputChange}
                />
              </div>
              {/* Instructor */}
              <div className="w-full px-3 mb-3">
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
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalAddBatch;
