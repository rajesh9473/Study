import React, { useEffect, useState } from "react";
import { Button, Card } from "@material-tailwind/react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  gridClasses,
} from "@mui/x-data-grid";
import ModalChangeStatus from "./ModalChangeStatus";
import { useAuthContext } from "../../context/useStateContext";
import baseurl from "../../Config";
import { CiEdit } from "react-icons/ci";
import moment from "moment/moment";

const InstructorStudents = () => {


  const [isStastusChangeModalopen, setIsStatusChangeModal] = useState(false)
  const [updateId, setUpdateId] = useState('')
  const handleStatuschange = (id) => {
    setUpdateId(id)
    setIsStatusChangeModal(!isStastusChangeModalopen)
  }
  const { GetInstructorStudents, instructorStudents, currentUser } = useAuthContext();
  const [Data, setData] = useState([])
  const [loader, setLoader] = useState(true);
  const [instructorData, setInstructorData] = useState(
    JSON.parse(window.sessionStorage.getItem("instructor-data"))
  );


  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  };


  const getScheduledBatchesListById = () => {

    const instructorId = instructorData?._id; // Make sure _id is available

    if (!instructorId) {
      console.error("Instructor ID is not available.");
      return;
    }

    fetch(baseurl + `/api/batch/get?instructor=${instructorId}`, {
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
        setData(result.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getScheduledBatchesListById();
  }, [instructorData]);

  const DataWithID = (data) => {
    const NewData = [];
    if (data && Array.isArray(data)) {
      for (let item of data) {
        NewData.push({
          ...item,
          id: data.indexOf(item),
        });
      }
    }
    return NewData;
  };

  const columns = [
    {
      field: "id", headerName: "Sr. No.", width: 100,
      renderCell: (params) => (
        <div>
          {params.row.id + 1}
        </div>
      )
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      height: 400,
      renderCell: (params) => (
        <div>
          {
            params.row.students.map((item, index) => (
              <div>
                <p key={index}>{index + 1}.   {item.name}</p>
                <p className="text-blue-800 font-black uppercase">{item.status ==='break' && 'DropOut'}</p>

              </div>
            ))}
        </div>
      )
    },
    {
      field: "regNo", headerName: "Reg No", width: 100,
      renderCell: (params) => (
        <div>
          {
            params.row.students.map((item, index) => (
              <p key={index}>{item.regno}</p>
            ))}
        </div>
      )
    },
    {
      field: "admdate",
      headerName: "DOJ",
      width: 100,
      renderCell: (params) => (
        <div>
          {
            params.row.students.map((item, index) => (
              <p key={index}>{item.admdate}</p>
            ))}
        </div>
      )
    },
    {
      field: "shift",
      headerName: "Batch Slot",
      width: 100,
      renderCell: (params) => (
        <div>
          {
            params.row.students.map((item, index) => (
              <p key={index}>{item.shift}</p>
            ))}
        </div>
      )
    },
    {
      field: "course", headerName: "Course", width: 150,
      renderCell: (params) => (
        <div>
          {
            params.row.course?.title
          }
        </div>
      )
    },
    {
      field: "batchTime", headerName: "Batch Time", width: 200,
      renderCell: (params) => (
        <div className='flex justify-around'>
          <div>
            {moment(params.row.batchTime?.from).format('h:mm a')}
          </div>
          <b>&nbsp;	 - &nbsp;	 </b>
          <div>
            {moment(params.row.batchTime?.from).format('h:mm a')}
          </div>
        </div>
      )
    },
    // {
    //   field: "lastMontDue",
    //   headerName: "Last Month Due",
    //   width: 100,
    //   renderCell: (params) => (
    //     <div className="flex justify-center">
    //       {moment(params.row.dob).format("MMMM Do YYYY")}
    //     </div>
    //   ),
    // },
    // {
    //   field: "thisMonthDue",
    //   headerName: "This Month Due",
    //   width: 100,
    //   renderCell: (params) => (
    //     <div className="flex justify-center">
    //       {moment(params.row.admdate).format("MMMM Do YYYY")}
    //     </div>
    //   ),
    // },
    // {
    //   field: "feeDate",
    //   headerName: "Fee Date",
    //   type: "number",
    //   width: 100,
    //   renderCell: (params) => (
    //     <div className="flex justify-center">
    //       <p>{params?.locker_no || "NA"}</p>
    //     </div>
    //   ),
    // },
    // {
    //   field: "thisMonthPaid",
    //   headerName: "This Month Paid",
    //   width: 100,
    // },
    // {
    //   field: "totalDue",
    //   headerName: "Total Due",
    //   width: 100,
    // },
    {
      field: "mobileNo", headerName: "Mobile No", width: 150,
      renderCell: (params) => (
        <div>
          {
            params.row.students.map((item, index) => (
              <p key={index}>{item.contact}</p>
            ))}
        </div>
      )
    },
    {
      field: "teacherName",
      headerName: "Teacher Name",
      width: 150,
      renderCell: (params) => (
        <div>
          {currentUser?.name}
        </div>
      )
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <div className="uppercase">
          {
            params.row.students.map((item, index) => (
              <p key={index}>{item.status}</p>
            ))}
        </div>
      )
    },
    {
      headerName: "Action",
      width: 100,
      renderCell: (params) => (

        <div>
          {
            params.row.students.map((item, index) => (
              <Button
                key={item._id}
                className="block my-2"
                variant="outlined"
                size="sm"
                onClick={() => handleStatuschange(item._id)}
              >
                <CiEdit size={20} />
              </Button>
            ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-5 ml-auto shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5">
        <div className="grid grid-cols-4 gap-4 my-2">
          <Card className="p-5 text-center text-red-500">
            <h1 className="text-lg">Total Last Month Due</h1>
            <p className="text-2xl font-bold">25000</p>
          </Card>
          <Card className="p-5 text-center text-blue-800">
            <h1 className="text-lg">Total Last Month Fees</h1>
            <p className="text-2xl font-bold">25000</p>
          </Card>
          <Card className="p-5 text-center text-blue-800">
            <h1 className="text-lg">Total This Month Paid</h1>
            <p className="text-2xl font-bold">25000</p>
          </Card>
          <Card className="p-5 text-center text-red-900">
            <h1 className="text-lg">Total Due</h1>
            <p className="text-2xl font-bold">25000</p>
          </Card>
        </div>
        <DataGrid
          rows={DataWithID(Data)}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 7,
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          defaultDensity="Comfortable"
        />
        <ModalChangeStatus
          open={isStastusChangeModalopen}
          handleOpen={handleStatuschange}
          updateId={updateId}
        />
      </div>
    </>
  );
};

export default InstructorStudents;
