import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import AddStudent from "./AddStudent";
import baseurl from "../../Config";
import Loader from "../../Components/Loader";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import moment from "moment";
import StudenDocument from "./StudenDocument";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Students = ({ updateAuth }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [selectedData, setSelectedData] = useState(null);
  const [documentopen, setDocumentOpen] = useState(false);
  const navigate = useNavigate();

  const handleDocumentOpen = (data) => {
    setDocumentOpen(!documentopen);
    setSelectedData(data);
  };

  useEffect(() => {
    getStudentList();
  }, [currentPage]);


  const getStudentList = async () => {
    try {
      const query = new URLSearchParams({
        page: currentPage,
        limit: 1300,
      }).toString();

      const res = await fetch(baseurl + "/api/students?" + query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      setProduct(result);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };


  function deleteData(id) {
    if (window.confirm("Are you sure You want to delete ?")) {
      fetch(baseurl + `/api/students/` + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          toast.success("Deleted Successfully");
          getStudentList();
        });
    }
  }

  const ShowStudent = (student) => {
    sessionStorage.setItem("auth", JSON.stringify(student._id));
    updateAuth();
    navigate("/student/dashboard");
  };

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

  const DataWithID = (data) => {
    const NewData = [];
    if (data !== undefined) {
      for (let item of data) {
        NewData.push({
          ...item,
          id: data.indexOf(item),
          date: moment(item.createdAt).format("D / M / Y"),
        });
      }
    } else {
      NewData.push({ id: 0 });
    }
    return NewData;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <div className="flex justify-center">{params.row.id + 1}</div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <div
          onClick={() => ShowStudent(params.row)}
          style={{ cursor: "pointer" }}
        >
          <div className="flex items-center gap-1">
            <img
              className="rounded-full w-10 h-10"
              src={
                baseurl + `/${params.row?.profilePic}` ||
                "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"
              }
              alt="profile"
            />
            <h5>{params.row?.name}</h5>
          </div>
        </div>
      ),
    },
    {
      field: "regno",
      headerName: "Reg No",
      width: 100,
    },
    {
      field: "course",
      headerName: "Course",
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      type: "text",
      width: 150,
    },
    {
      field: "contact",
      headerName: "Contact No.",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "dob",
      headerName: "DOB",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center">
          {moment(params.row.dob).format("MMMM Do YYYY")}
        </div>
      ),
    },
    {
      field: "admdate",
      headerName: "DOJ",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center">
          {moment(params.row.admdate).format("MMMM Do YYYY")}
        </div>
      ),
    },
    {
      field: "locker_no",
      headerName: "Locker No.",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center">
          <p>{params?.locker_no || "NA"}</p>
        </div>
      ),
    },
    {
      field: "documents",
      headerName: "Documents",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center">
          <Button onClick={() => handleDocumentOpen(params.row)} size="sm">
            View
          </Button>
        </div>
      ),
    },
    {
      field: "shift",
      headerName: "Shift",
      width: 80,
      renderCell: (params) => (
        <div className="flex justify-center">
          <p>{params.row?.shift || "-"}</p>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center">
          <Menu>
            <MenuHandler>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link
                  to={"/admin/editStudent/" + params.row._id}
                  state={params.row}
                  className="flex "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  Edit
                </Link>
              </MenuItem>
              <MenuItem>
                <div
                  className="flex "
                  onClick={() => {
                    deleteData(params.row._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                  Delete
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mt-5 p-5 ml-auto  bg-[#f5f6fa]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Students
          </h2>
          {/* Students */}
          <div className="flex items-center flex-col sm:flex-row">
            <Button onClick={handleOpen} className="h-fit">
              + Add Student
            </Button>
            <AddStudent open={open} handleOpen={handleOpen} />
          </div>
        </div>

        {/* Student Table */}
        <div className="my-10">
          <div className=" ">
            {loader ? (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="relative overflow-x-scroll">
                <DataGrid
                  rows={DataWithID(product.data) || []}
                  columns={columns}
                  components={{ Toolbar: CustomToolbar }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                    filter: {
                      filterModel: {
                        items: [
                          {
                            field: "status",
                            operatorValue: "contains",
                            value: "active",
                          },
                        ],
                      },
                    }
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
                <StudenDocument
                  item={selectedData}
                  open={documentopen}
                  handleDocumentOpen={handleDocumentOpen}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default Students;
