// import { Switch } from "@material-tailwind/react";
// import React, { useState } from "react";

// const AdminRoles = () => {
//   const [enquiries, setEnquiries] = useState(true);
//   const [courseList, setCourseList] = useState(true);
//   const [categories, setCategories] = useState(true);
//   const [studentList, setStudentList] = useState(true);
//   const [instructorList, setInstructorList] = useState(true);
//   const [cashLedger, setCashLedger] = useState(true);
//   const [fees, setFees] = useState(true);
//   const [scheduleClasses, setScheduleClasses] = useState(true);
//   const [events, setEvents] = useState(true);
//   const [manageStudent, setManageStudent] = useState(true);
//   const [scheduleBatches, setScheduleBatches] = useState(true);
//   const [monthlyAchievers, setMonthlyAchievers] = useState(true);
//   const [rolesPermission, setRolesPermission] = useState(true);
//   const data = {
//     enquiries,
//     courseList,
//     categories,
//     studentList,
//     instructorList,
//     cashLedger,
//     fees,
//     scheduleClasses,
//     events,
//     manageStudent,
//     scheduleBatches,
//     monthlyAchievers,
//     rolesPermission,
//   };

//   console.log(data);
//   const roles = [
//     {
//       id: "enquiries",
//       name: "Enquiries",
//       value: enquiries,
//       setvalue: (e) => setEnquiries(e.target.checked),
//     },
//     {
//       id: "courseList",
//       name: "CourseList",
//       value: courseList,
//       setvalue: (e) => setCourseList(e.target.checked),
//     },
//     {
//       id: "categories",
//       name: "Categories",
//       value: categories,
//       setvalue: (e) => setCategories(e.target.checked),
//     },
//     {
//       id: "studentList",
//       name: "Student List",
//       value: studentList,
//       setvalue: (e) => setStudentList(e.target.checked),
//     },
//     {
//       id: "instructorList",
//       name: "Instructor List",
//       value: instructorList,
//       setvalue: (e) => setInstructorList(e.target.checked),
//     },
//     {
//       id: "cashLedger",
//       name: "Cash Ledger",
//       value: cashLedger,
//       setvalue: (e) => setCashLedger(e.target.checked),
//     },
//     {
//       id: "fees",
//       name: "Fees",
//       value: fees,
//       setvalue: (e) => setFees(e.target.checked),
//     },
//     {
//       id: "scheduleClasses",
//       name: "Schedule Classes",
//       value: scheduleClasses,
//       setvalue: (e) => setScheduleClasses(e.target.checked),
//     },
//     {
//       id: "events",
//       name: "Events",
//       value: events,
//       setvalue: (e) => setEvents(e.target.checked),
//     },
//     {
//       id: "manageStudent",
//       name: "Manage Student",
//       value: manageStudent,
//       setvalue: (e) => setManageStudent(e.target.checked),
//     },
//     {
//       id: "scheduleBatches",
//       name: "Schedule Batches",
//       value: scheduleBatches,
//       setvalue: (e) => setScheduleBatches(e.target.checked),
//     },
//     {
//       id: "monthlyAchievers",
//       name: "Monthly Achievers",
//       value: monthlyAchievers,
//       setvalue: (e) => setMonthlyAchievers(e.target.checked),
//     },
//     {
//       id: "rolesPermission",
//       name: "Roles And Permissions",
//       value: rolesPermission,
//       setvalue: (e) => setRolesPermission(e.target.checked),
//     },
//   ];
//   return (
//     <>
//       <section className="my-5 sm:my-10 grid grid-cols-2 gap-4">
//         {roles.map((role) => (
//           <div
//             key={role.name}
//             className="m-3 px-4 py-3 sm:p-5 mx-auto flex items-center justify-between border border-blue-500 w-full  max-w-sm xl:max-w-lg text-md sm:text-xl font-bold text-[var(--secondary-color)] shadow-lg rounded-sm"
//           >
//             <div>{role.name}</div>
//             <div>
//               <Switch
//                 id={role.id}
//                 ripple={false}
//                 checked={role.value}
//                 value={role.value}
//                 onChange={role.setvalue}
//               />
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// };

// export default AdminRoles;
import { Switch } from "@material-tailwind/react";
import React, { useState } from "react";

const AdminRoles = () => {
  const [data, setData] = useState({
    enquiries: true,
    courseList: true,
    categories: true,
    studentList: true,
    instructorList: true,
    cashLedger: true,
    fees: true,
    scheduleClasses: true,
    events: true,
    manageStudent: true,
    scheduleBatches: true,
    monthlyAchievers: true,
    rolesPermission: true,
  });


  const roles = [
    {
      id: "enquiries",
      name: "Enquiries",
    },
    {
      id: "courseList",
      name: "CourseList",
    },
    {
      id: "categories",
      name: "Categories",
    },
    {
      id: "studentList",
      name: "Student List",
    },
    {
      id: "instructorList",
      name: "Instructor List",
    },
    {
      id: "cashLedger",
      name: "Cash Ledger",
    },
    {
      id: "fees",
      name: "Fees",
    },
    {
      id: "scheduleClasses",
      name: "Schedule Classes",
    },
    {
      id: "events",
      name: "Events",
    },
    {
      id: "manageStudent",
      name: "Manage Student",
    },
    {
      id: "scheduleBatches",
      name: "Schedule Batches",
    },
    {
      id: "monthlyAchievers",
      name: "Monthly Achievers",
    },
    {
      id: "rolesPermission",
      name: "Roles And Permissions",
    },
  ];

  const handleChange = (id) => {
    setData((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <>
      <section className="my-5 sm:my-10 grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="m-3 px-4 py-3 sm:p-5 mx-auto flex items-center justify-between border border-blue-500 w-full max-w-sm xl:max-w-lg text-md sm:text-xl font-bold text-[var(--secondary-color)] shadow-lg rounded-sm"
          >
            <div>{role.name}</div>
            <div>
              <Switch
                id={role.id}
                ripple={false}
                checked={data[role.id]}
                value={data[role.id]}
                onChange={() => handleChange(role.id)}
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default AdminRoles;
