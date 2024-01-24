import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
  Switch,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import { Select, Option } from "@material-tailwind/react";

const ModalPermissions = ({ open, handleOpen, item, initPermissions }) => {
  const [enquiries, setEnquiries] = useState("");
  const [courseList, setCourseList] = useState("");
  const [categories, setCategories] = useState("");
  const [studentList, setStudentList] = useState("");
  const [instructorList, setInstructorList] = useState("");
  const [cashLedger, setCashLedger] = useState("");
  const [fees, setFees] = useState("");
  const [scheduleClasses, setScheduleClasses] = useState("");
  const [events, setEvents] = useState("");
  const [manageStudent, setManageStudent] = useState("");
  const [scheduleBatches, setScheduleBatches] = useState("");
  const [monthlyAchievers, setMonthlyAchievers] = useState("");
  const [rolesPermission, setRolesPermission] = useState("");
  const [id, setId] = useState("");

  const [userPermissions, setUserPermissions] = useState([]);

  // console.log(userPermissions);

  useEffect(() => {
    if (userPermissions) {
      setEnquiries(userPermissions.enquiries);
      setCourseList(userPermissions.courseList);
      setCategories(userPermissions.categories);
      setStudentList(userPermissions.studentList);
      setInstructorList(userPermissions.instructorList);
      setCashLedger(userPermissions.cashLedger);
      setFees(userPermissions.fees);
      setScheduleClasses(userPermissions.scheduleClasses);
      setEvents(userPermissions.events);
      setManageStudent(userPermissions.manageStudent);
      setScheduleBatches(userPermissions.scheduleBatches);
      setMonthlyAchievers(userPermissions.monthlyAchievers);
      setRolesPermission(userPermissions.rolesPermission);
      setId(userPermissions.id);
    }
  }, [item]);

  useEffect(() => {
    getUserPermissionsList();
  }, [item, initPermissions]);

  const getUserPermissionsList = () => {
    fetch(baseurl + "/api/permission/" + item._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setUserPermissions(result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(item);
  const data = {
    enquiries,
    courseList,
    categories,
    studentList,
    instructorList,
    cashLedger,
    fees,
    scheduleClasses,
    events,
    manageStudent,
    scheduleBatches,
    monthlyAchievers,
    rolesPermission,
    id,
  };

  // console.log(data);
  const roles = [
    {
      id: "enquiries",
      name: "Enquiries",
      value: enquiries,
      setvalue: (e) => setEnquiries(e.target.checked),
    },
    {
      id: "courseList",
      name: "CourseList",
      value: courseList,
      setvalue: (e) => setCourseList(e.target.checked),
    },
    {
      id: "categories",
      name: "Categories",
      value: categories,
      setvalue: (e) => setCategories(e.target.checked),
    },
    {
      id: "studentList",
      name: "Student List",
      value: studentList,
      setvalue: (e) => setStudentList(e.target.checked),
    },
    {
      id: "instructorList",
      name: "Instructor List",
      value: instructorList,
      setvalue: (e) => setInstructorList(e.target.checked),
    },
    {
      id: "cashLedger",
      name: "Cash Ledger",
      value: cashLedger,
      setvalue: (e) => setCashLedger(e.target.checked),
    },
    {
      id: "fees",
      name: "Fees",
      value: fees,
      setvalue: (e) => setFees(e.target.checked),
    },
    {
      id: "scheduleClasses",
      name: "Schedule Classes",
      value: scheduleClasses,
      setvalue: (e) => setScheduleClasses(e.target.checked),
    },
    {
      id: "events",
      name: "Events",
      value: events,
      setvalue: (e) => setEvents(e.target.checked),
    },
    {
      id: "manageStudent",
      name: "Manage Student",
      value: manageStudent,
      setvalue: (e) => setManageStudent(e.target.checked),
    },
    {
      id: "scheduleBatches",
      name: "Schedule Batches",
      value: scheduleBatches,
      setvalue: (e) => setScheduleBatches(e.target.checked),
    },
    {
      id: "monthlyAchievers",
      name: "Monthly Achievers",
      value: monthlyAchievers,
      setvalue: (e) => setMonthlyAchievers(e.target.checked),
    },
    {
      id: "rolesPermission",
      name: "Roles And Permissions",
      value: rolesPermission,
      setvalue: (e) => setRolesPermission(e.target.checked),
    },
  ];

  const UpdatePermissions = () => {
    // setEnquiries("");
    // setCourseList("");
    // setCategories("");
    // setStudentList("");
    // setInstructorList("");
    // setCashLedger("");
    // setFees("");
    // setScheduleClasses("");
    // setEvents("");
    // setManageStudent("");
    // setScheduleBatches("");
    // setMonthlyAchievers("");
    // setRolesPermission("");

    // Update Api For Updating Data
    fetch(baseurl + "/api/permission/" + userPermissions._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        handleOpen();
        toast.success("Permissions Updated Successfully");
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
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[50%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Change Permissions
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          {roles.map((role) => (
            <div
              key={role.name}
              className="m-3 px-4 py-3 sm:p-5 mx-auto flex items-center justify-between border border-blue-500 w-full  max-w-sm xl:max-w-lg text-md sm:text-xl font-bold text-[var(--secondary-color)] shadow-lg rounded-sm"
            >
              <div>{role.name}</div>
              <div>
                {/* {item.role === "0" && role.id === "rolesPermission" ? 
                
              
              
              } */}
                <Switch
                  id={role.id}
                  ripple={false}
                  checked={role.value}
                  value={role.value}
                  onChange={role.setvalue}
                  disabled={item.role === "0" && role.id === "rolesPermission"}
                />
              </div>
            </div>
          ))}
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
          <Button variant="gradient" color="blue" onClick={UpdatePermissions}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalPermissions;
