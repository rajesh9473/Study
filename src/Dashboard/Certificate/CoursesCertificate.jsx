import React, { useEffect, useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useCertificate } from "../../context/useCertificate";
import CourseCertificateResults from "./CourseCertificateResults";
import baseurl from "../../Config";
import moment from "moment/moment";

const CoursesCertificate = ({ back }) => {
  const { courseInfo, GetStudentList, GetCourses, course } = useCertificate();

  const [formData, setFormData] = useState({
    course: null,
    name: "",
    fatherName: "",
    regNo: "",
    date: "",
    address: "",
    options: null,
  });

  const [selectStudent, setSelectStudent] = useState(null);
  const [allResults, setAllResults] = useState(false)
  const handleAllResults = () => setAllResults(!allResults)
  const [loader, setLoader] = useState(true);
  const [courseResults, setCourseResults] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null)

  const getFetchResult = async (resultType) => {
    try {
      const response = await fetch(`${baseurl}/api/marks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const allResults = await response.json();

      // Filter the results based on resultType
      const filteredResults = allResults.filter(result => result.resultType === resultType);

      setCourseResults(filteredResults);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching student list:", error);
    }
  };


  const returnOptions = (data) => {
    const options = data?.map((item) => ({
      label: item?.student?.name,
      value: item?._id
    }))

    return options
  }

  useEffect(() => {
    getFetchResult('final');
  }, []);

  const handleSelectStudent = (selectedStudent) => {
    const selected = courseInfo?.students?.find(
      (item) => item?._id === selectedStudent?.value
    );
    setSelectedStudentId(selectedStudent?.value); // Store selected student ID
    setFormData((prevData) => ({
      ...prevData,
      student: selected,
    }));
    setSelectStudent(selectedStudent);

    // Fetch course details for the selected student
  };

  const handleSelectOption = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      options: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PrintCertificate(`/admin/certificate/print-certificate`, { state: { selectedStudent } });
    console.log("Form submitted:", selectedStudent);
  };

  useEffect(() => {
    if (selectStudent) {
      setSelectedStudent(courseResults?.find((item) => item?._id === selectStudent?.value))
    }
  }, [selectStudent])


  const PrintCertificate = useNavigate();
  useEffect(() => {
    GetStudentList(formData.course?._id);
  }, [formData.course]);


  return (
    <div>
      <div className="flex justify-between">
        <Button onClick={back}>Back to Certificate</Button>
        <Button color="green" onClick={handleAllResults} >Students Results</Button>
        <CourseCertificateResults
          open={allResults}
          handleClose={handleAllResults}
        />
      </div>
      <div className="p-5 mx-auto max-w-xl">
        <form onSubmit={handleSubmit}>
          {/* Course Select Field */}
          <div className="py-2">
            <Select
              id="course"
              name="course"
              value={selectStudent}
              onChange={handleSelectStudent}
              options={returnOptions(courseResults)}
              // options={courseResults?.map((item) => ({
              //   label: item?.name,
              //   value: item?._id,
              // }))}
              placeholder="Select Student"
              isSearchable
            />
          </div>
          <div className="py-2">
            <Input
              type="text"
              id="course"
              name="course"
              label="Course"
              size="regular"
              fullWidth
              value={selectedStudent?.course}
              disabled
            />
          </div>

          <div className="py-2">
            <Input
              type="text"
              id="fatherName"
              name="fatherName"
              value={selectedStudent?.student?.fname}
              label="Father's Name"
              size="regular"
              fullWidth
              disabled
            />
          </div>
          <div className="py-2">
            <Input
              type="text"
              id="regNo"
              name="regNo"
              value={selectedStudent?.student?.regno}
              label="Registration Number"
              size="regular"
              fullWidth
              disabled
            />
          </div>
          <div className="py-2">
            <Input
              type="date"
              id="date"
              name="date"
              value={selectedStudent?.date ? moment(selectedStudent?.from).format('YYYY-MM-DD') : ''}
              variant="outlined"
              label="Date"
              size="regular"
              fullWidth
              disabled
            />
          </div>

          <div className="py-2">
            <Input
              type="text"
              id="grade"
              name="grade"
              value={selectedStudent?.obtain_marks < 60 ? 'Credit' : selectedStudent?.obtain_marks > 60 ? 'Distinction' : selectedStudent?.obtain_marks > 80 ? 'Excellent' : null}
              variant="outlined"
              label="Grade"
              size="regular"
              fullWidth
              disabled
            />
          </div>

          <Button
            type="submit"
            buttonType="filled"
            size="lg"
            ripple="light"
            fullWidth
            className="flex justify-center items-center mt-2"
          >
            Submit <MdArrowForward size={20} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CoursesCertificate;
