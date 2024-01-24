import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import baseurl from '../../../Config';
import { FiDelete } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from 'react-toastify';
import Select from 'react-select';


const ModalAddCourseDetail = ({ open, handleOpen, courseId, getCourseDetails }) => {

  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructors, setInstructors] = useState([]);


  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      console.log('File MIME Type:', file.type);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(baseurl + '/api/upload/file?fileName=' + file?.name, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const uploadedData = await response.json();
        setUploads([...uploads, uploadedData.fileName]);

        setUploadedImageUrl(uploadedData.fileName);

        toast.success('File Uploaded Successfully');
      } else {
        console.log('File Upload Failed');
        toast.warning('File Upload Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await fetch(baseurl + '/api/instructor');
      if (response.ok) {
        const instructorsData = await response.json();
        // Assuming the API returns an array of objects with label and value properties
        return instructorsData.map((instructor) => ({ label: instructor.name, value: instructor._id }));
      }
      console.error('Failed to fetch instructors');
      return [];
    } catch (error) {
      console.error('Error fetching instructors:', error);
      return [];
    }
  };

  const instructorId = selectedInstructor && selectedInstructor.length > 0 ? selectedInstructor.map(option => option.value) : null;

  const [formData, setFormData] = useState({
    lession_no: null,
    course: courseId,
    subject: {
      title: "",
    },
    topic: [
      {
        day: 1,
        topics: "",
        notes: "",
      },
    ],
    instructorList: [instructorId],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      subject: {
        ...prevFormData.subject,
        title: value,
      },
    }));
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     subject: {
  //       ...prevFormData.subject,
  //       [name]: value,
  //     },
  //   }));
  // };

  const handleTopicChange = (index, name, value) => {
    const topics = [...formData.topic];
    topics[index] = {
      ...topics[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      topic: topics,
    });
  };

  const handleAddTopic = () => {
    setFormData({
      ...formData,
      topic: [
        ...formData.topic,
        {
          day: formData.topic.length + 1,
          topics: "",
          notes: "",
        },
      ],
    });
  };

  const handleRemoveTopic = (index) => {
    const topics = [...formData.topic];
    topics.splice(index, 1);
    setFormData({
      ...formData,
      topic: topics,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('formdata', formData)

    try {
      const response = await fetch(baseurl + `/api/course/new-lession/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form Data Submitted:', formData);
        getCourseDetails();
        setFormData({
          lession_no: null,
          course: courseId,
          subject: {
            title: "",
          },
          topic: [
            {
              day: 1,
              topics: "",
              notes: "",
            },
          ],
          instructorList: [],
        });
        setFile(null);
        setUploads([]);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      toast('Successfully Added');
      handleOpen();
    }
  };

  const handleInstructorChange = (selectedOptions) => {
    // Convert selectedOptions to the required format
    const updatedInstructorList = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
    }));

    setSelectedInstructor(selectedOptions);
    setFormData((prevFormData) => ({
      ...prevFormData,
      instructorList: updatedInstructorList,
    }));
  };

  useEffect(() => {
    setFormData({ ...formData, instructorList: instructorId })
  }, [selectedInstructor])


  useEffect(() => {
    const loadInstructors = async () => {
      const instructorsList = await fetchInstructors();
      setInstructors(instructorsList);
    };

    loadInstructors();
  }, []);

  return (
    <Dialog
      open={open}
      // handler={handleOpen}
      className="min-w-[80%] md:min-w-[60%] lg:min-w-[50%]"
    >
      <DialogHeader className="text-center justify-center">
        {" "}
        Add Course Details
      </DialogHeader>
      <DialogBody divider className="h-[25rem] overflow-y-scroll">
        <form className="w-full px-5 sm:px-10 mt-5" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lession_no">
              Lesson Number
            </label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lession_no"
              type="number"
              name="lession_no"
              value={formData.lession_no}
              onChange={handleInputChange}
              placeholder="Enter lesson number"
              variant="outlined"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              value={formData.subject.title}
              onChange={handleTitleChange}
              placeholder="Enter title"
            />

          </div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subtitle">
              Lession Plan
            </label>
            {formData.topic.map((topic, index) => (
              <div key={index} className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                  Day
                </label>
                <div className="flex justify-between">
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name={`day-${index}`}
                    value={topic.day}
                    onChange={(e) => handleTopicChange(index, "day", e.target.value)}
                  />
                  <IconButton className='text-red-800 flex items-center ml-1' variant='text' type="button" onClick={() => handleRemoveTopic(index)}>
                    <FiDelete size={30} />
                  </IconButton>
                </div>
                <div className='my-2 '>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                    Enter Topics Name
                  </label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name={`subtitle-${index}`}
                    value={topic.topics}
                    onChange={(e) => handleTopicChange(index, "topics", e.target.value)}
                    placeholder="Enter topics"
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                    Upload Document
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="uploadDocs hidden"
                    onChange={handleFileUpload}
                  />
                  <Button onClick={() => document.querySelector(".uploadDocs").click()}>Upload</Button>
                  {uploadedImageUrl && (
                    <img src={uploadedImageUrl} alt="Uploaded" className="ml-4 max-w-[100px] max-h-[100px]" />
                  )}
                </div> */}
              </div>
            ))}
            <button type="button" onClick={handleAddTopic}>
              <IoIosAddCircle size={30} />
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lession_no">
              Add Instructor
            </label>
            <Select
              id="instructor"
              name="instructor"
              isMulti
              value={selectedInstructor}
              onChange={handleInstructorChange}
              options={instructors}
              placeholder="Select an instructor"
            />

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
        <Button variant="gradient" type='submit' onClick={handleSubmit}>
          <span>Save</span>
        </Button>
      </DialogFooter>
    </Dialog>)
}

export default ModalAddCourseDetail