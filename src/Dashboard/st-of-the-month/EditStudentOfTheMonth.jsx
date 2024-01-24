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

const EditStudentOfTheMonth = ({
  open,
  handleOpen,
  StudentOfTheMonthList,
  studentMonth,
}) => {
  const [regno, setRegno] = useState("");
  const [course, setCourse] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState([]);

  useEffect(() => {
    setRegno(studentMonth.regno);
    setCourse(studentMonth.course);
    setName(studentMonth.name);
    setImg(studentMonth.img);
  }, [studentMonth]);

  const onsubmitClick = () => {
    const formData = new FormData();
    formData.append("regno", regno);
    formData.append("course", course);
    formData.append("name", name);
    formData.append("img", img);
    // Empty the fields
    setCourse("");
    setRegno("");
    setName("");
    setImg("");

    // Post Api For Posting Data
    fetch(baseurl + "/api/studentofmonth/" + studentMonth.regno, {
      method: "PUT",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        toast.success("Updated Successfully");
        handleOpen();
        StudentOfTheMonthList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   function deleteData(id) {
  //     if (window.confirm("Are you sure You want to delete ?")) {
  //       fetch(baseurl + "/api/assign/" + id, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json()) // or res.json()
  //         .then((res) => {
  //           toast.success("Deleted Successfully");
  //           getAssignmentList();
  //         });
  //     }
  //   }
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Edit Student Of The Month
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* regno */}
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
                  placeholder="56356"
                  value={regno}
                  onChange={(e) => {
                    setRegno(e.target.value);
                  }}
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
                  id="course"
                  type="text"
                  placeholder="Graphic Designing"
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                />
              </div>
              {/* name */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              {/* Image */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="image"
                  type="file"
                  onChange={(e) => {
                    setImg(e.target.files[0]);
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

export default EditStudentOfTheMonth;
