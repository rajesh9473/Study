import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseurl from "../../../Config";
import { Button, IconButton } from "@material-tailwind/react";
import { FaCheckCircle, FaRegTrashAlt, FaUpload } from "react-icons/fa";
import ModalAddCourseDetail from "./ModalAddCourseDetail";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader";
import axios from "axios";

const StudentAcademics = () => {

  const [addCourseDetail, setAddCourseDetail] = useState(false)
  const [courseDetail, setCourseDetail] = useState("")
  const handleAddCourseDetail = () => {
    setAddCourseDetail(!addCourseDetail)
  }
  const [updateCourseDetail, setUpdateCourseDetail] = useState("")
  const handleUpdateCourseDetail = () => {
    setUpdateCourseDetail(!updateCourseDetail)
  }

  const [loader, setLoader] = useState(true);
  const { id } = useParams();

  const getCourseDetails = () => {
    fetch(baseurl + `/api/course/new-lession/get?course=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCourseDetail(result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCourseDetails();
  }, []);


  const deleteData = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this data?");

    if (userConfirmed) {
      try {
        await fetch(baseurl + `/api/course/new-lession/delete/${id}`, {
          method: "DELETE",
        });
        toast.success("Delete successfully")
        getCourseDetails();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Deletion canceled by user.");
    }
  };

  const handleFileUpload = async (file, itemid, topicId) => {

    try {
      const formdata = new FormData();
      formdata.append("file", file);


      try {
        const upload = await axios.post(baseurl + `/api/upload/file?fileName=${file.name}`, formdata)
        if (upload.status === 200) {
          const fileUrl = upload.data.fileName
          console.log(fileUrl, itemid, topicId)
          toast.info("uploaded on aws successfully", fileUrl)
          const updateLessionNotes = await axios.get(baseurl + `/api/course/new-lession/upload/${itemid}/${topicId}?notesLink=${fileUrl}`)
          if (updateLessionNotes.status === 200) {
            toast.success("file Uploaded successfully")
          }
        }
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <>
      <section className=" p-2 sm:p-5 md:p-10 ">
        <div className="w-full border border-black rounded-md p-1">
          <div className="flex justify-between items-center p-1 pb-2">
            <div className="text-center font-extrabold text-yellow-900 uppercase text-xl">Course Syllabus</div>
            <Button onClick={handleAddCourseDetail}>Add Course Detail</Button>
          </div>
          {loader ? (
            <div className="grid place-items-center">
              <Loader />
            </div>
          ) : (
            <div className="w-full border border-black rounded-sm">
              {
                courseDetail?.data?.map((item, key) => (
                  <ul key={key} className="flex">
                    <li className="border-black border w-24 text-center p-1 grid place-items-center" >[{key + 1}]</li>
                    <li className="border-black border w-3/5 text-blue-500 font-bold p-1 grid place-items-left items-center" >
                      <h3>{item.subject.title}</h3>
                      <p className="text-black">Days {item.subject.daycounts}</p>
                    </li>
                    <li className="border-black border w-full text-blue-800 font-semibold p-1" >
                      {
                        item?.topic.map((title, index) => (
                          <li key={index}>
                            <div className="flex justify-between gap-4 items-center">
                              <div className="flex items-center gap-4">
                                <div className="border border-black p-2">Day- {title.day}</div>
                                <h4>{title.topics} </h4>
                              </div>
                              <div className="flex gap-4 items-center">
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    handleFileUpload(e.target.files[0], item._id, title._id)
                                  }
                                  className="uploadDocs hidden"
                                />
                                <IconButton onClick={() => document.querySelector(".uploadDocs").click()} color="" variant="outlined">
                                  <FaUpload />
                                </IconButton>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </li>
                    <li className="border-black border p-1 flex items-center justify-around">
                      {item.createdAt === item.updatedAt ? 'NA' : <FaCheckCircle />}
                    </li>
                    <li className="border-black border w-1/5 p-1">
                      {item.instructorList.map((instructor, index) => (
                        <h2 key={index}>{instructor.name}</h2>
                      ))}
                    </li>

                    <li className="border-black border w-1/5 p-1 flex items-center justify-around">
                      <IconButton color="red" onClick={() => deleteData(item._id)} variant="outlined">
                        <FaRegTrashAlt className="text-red-800" />
                      </IconButton>
                    </li>
                  </ul>
                ))
              }
            </div>
          )}

          <ModalAddCourseDetail
            open={addCourseDetail}
            handleOpen={handleAddCourseDetail}
            courseId={id}
            getCourseDetails={getCourseDetails}
          />
        </div>
      </section>
      {/* Footer */}
      <div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default StudentAcademics;
