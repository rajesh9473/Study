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


const ModalEditBatch = ({
  open,
  handleOpen,
  item,
  batchId,
  getScheduledBatchesList,
}) => {

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructorStudent, setInstructorStudent] = useState([]);


  const [formData, setFormData] = useState({
    instructor: null,
    course: "",
    from: "",
    to: "",
    students: [],
  });



  const getScheduledBatchesListByid = (batchId) => {
    fetch(baseurl + `/api/batch/get?id=${batchId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((result) => {
        const batchData = result.data[0];

        const instructorOption = {
          value: batchData.instructor._id,
          label: batchData.instructor.name,
        };

        const formattedFrom = batchData.batchTime.from.slice(0, -1); // Remove 'Z' at the end
        const formattedTo = batchData.batchTime.to.slice(0, -1);


        setFormData({
          instructor: instructorOption,
          course: batchData.course._id,
          from: formattedFrom,
          to: formattedTo,
          students: batchData?.students || [],
        });

        setSelectedInstructor(instructorOption);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getScheduledBatchesListByid(batchId);
  }, [batchId]);

  useEffect(() => {
    getInstructorList();
    if (selectedInstructor) {
      getInstructorStudent();
    }
  }, [selectedInstructor]);


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


  const getInstructorStudent = () => {
    if (selectedInstructor) {
      fetch(`${baseurl}/api/course/students/${selectedInstructor.value}`, {
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
    }
  };

  console.log(instructorStudent)

  const instructors = data || [];

  const handleSelectInstructorOption = (selectedInstructor) => {
    setFormData((formData) => ({
      ...formData,
      instructor: selectedInstructor,
    }));
    setSelectedInstructor(selectedInstructor);
  };

  const instructorOptions = instructors.map((instructor) => ({
    value: instructor?._id,
    label: instructor?.name,
  }));

  const onSubmitClick = (formData) => {
    const updatedData = {
      instructor: formData?.instructor?.value,
      course: formData?.course,
      batchTime: {
        from: formData?.from,
        to: formData?.to,
      },
      students: formData?.students.map((item) => item._id),
    };
    console.log(updatedData, formData)

    fetch(baseurl + "/api/batch/update/" + batchId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Update API Response:", data);
        toast.info("Updated Successfully");
        handleOpen();
        getScheduledBatchesList();
      })
      .catch((error) => {
        console.error("Error during update:", error);
        toast.error("Error during update");
      });
  };


  const handleMapedChange = (studentId) => {
    const studentIndex = formData.students.findIndex(
      (student) => student._id === studentId
    );


    if (studentIndex !== -1) {
      handleRemoveStudent(studentId);
    } else {
      handleAddStudent(studentId);
    }
  };

  const handleRemoveStudent = (studentId) => {
    const updatedStudents = formData.students.filter(
      (student) => student._id !== studentId
    );
    setFormData({ ...formData, students: updatedStudents });
  };

  const handleAddStudent = (studentId) => {
    const selectedStudent = instructorStudent.data.find((student) => student._id === studentId);

    if (selectedStudent) {
      const updatedStudents = [...formData.students, selectedStudent];
      setFormData({ ...formData, students: updatedStudents });
    }
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
          Edit Batch
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* batch */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="batch"
                >
                  INSTRUCTOR NAME
                </label>
                <Select
                  name="instructor"
                  id="instructor"
                  placeholder="Select Instructor"
                  options={instructorOptions}
                  value={selectedInstructor}
                  onChange={handleSelectInstructorOption}
                />
              </div>
              {/* Course */}
              {/* <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="course"
                >
                  Course
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={formData.course}
                  name="course"
                  disabled
                />
              </div> */}
              {/* From */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="from"
                >
                  From
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="from"
                  name="from"
                  type="datetime-local"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                />
              </div>
              {/* To */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="to"
                >
                  To
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="to"
                  name="to"
                  type="datetime-local"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                />
              </div>
              {/* time */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="time"
                >
                  Mapped Students
                </label>
                {/* {console.log(formData.students[0]._id)} */}
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-left">
                      <th>Student Name</th>
                      <th>Course</th>
                      <th className="text-center" >Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ overflowY: 'scroll', height: '100px' }}>
                    {instructorStudent?.data?.map((student, index) => (
                      <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.course}</td>
                        <td className="text-center" onClick={() => handleMapedChange(student._id)}>
                          {formData.students.some(s => s._id === student._id) ? (
                            <Button>Remove</Button>
                          ) : (
                            <Button>Add</Button>
                          )}
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
          <Button variant="gradient" type="submit" color="blue" onClick={() => onSubmitClick(formData)}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>

    </>
  );
};

export default ModalEditBatch;
