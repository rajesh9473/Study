import React, { useEffect, Fragment, useState } from "react";
import { Button } from "@material-tailwind/react";
import baseurl from "../../Config";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import ScheduleBatchesTable from "./ScheduleBatchesTable";
import ModalAddBatch from "./ModalAddBatch";
import moment from "moment/moment";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import ModalViewMapList from "./ModalViewMapList";
import ModalEditBatch from "./ModalEditBatch";
import { toast } from "react-toastify";

const ScheduleBatches = () => {


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


  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [viewMapStudent, setViewMapStudent] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState(null);
  const handleOpenViewModal = (batchId) => {
    const selectedBatchData = product.data.find((batch) => batch._id === batchId);
    setSelectedBatch(selectedBatchData);
    setViewMapStudent(true);
  };


  const handleCloseViewModal = () => {
    setViewMapStudent(!viewMapStudent)
  }

  const [open2, setOpen2] = useState(false);
  const [updateId, setUpdateId] = useState("")
  const handleOpen2 = (id) => {
    setUpdateId(id)
    setOpen2(!open2)
  }

  useEffect(() => {
    getScheduledBatchesList();
  }, [page]);

  const getScheduledBatchesList = () => {
    fetch(baseurl + "/api/batch/get", {
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
        setProduct(result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function deleteData(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(baseurl + "/api/batch/delete/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((res) => {
          toast.success("Deleted Successfully");
          getScheduledBatchesList();
        })
        .catch((error) => {
          console.error("Error during deletion:", error);
        });
    }
  }

  const MappedData = ({ params }) => {
    return <div className="py-2">
      <table className="table-auto">
        <thead>
          <tr className="text-left">
            <th>Reg No.</th>
            <th>Student Name</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {params.row?.students?.map((item, index) => (
            <tr key={index}>
              <td>{item?.regno}</td>
              <td>{item?.name}</td>
              <td>{item?.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => handleOpenViewModal(params.row?._id)}>View</Button>
    </div>
  }

  const DataWithID = (data) => {
    const NewData = [];
    if (data !== undefined) {
      for (let item of data) {
        NewData.push({
          ...item,
          id: data.indexOf(item)
        });
      }
    }
    return NewData;
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <div className="flex justify-center">{params.row?.id + 1}</div>
      ),
    },
    {
      field: "instructor",
      headerName: "Instructor Name",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center">{params.row?.instructor?.name}</div>
      ),
    },
    {
      field: "course",
      headerName: "Course",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center">{params.row?.course?.title}</div>
      ),
    },
    {
      field: "from",
      headerName: "From",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center">{moment(params.row?.batchTime?.from).format('MMMM Do YYYY')}</div>
      ),
    },
    {
      field: "to",
      headerName: "To",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center">{moment(params.row?.batchTime?.to).format('MMMM Do YYYY')}</div>
      ),
    },
    {
      field: "students",
      headerName: "students",
      width: 500,
      renderCell: (params) => (
        <MappedData params={params} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
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
                <div onClick={() => handleOpen2(params.row._id)} className="flex ">
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
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  className="flex "
                  onClick={() => {
                    deleteData(params.row?._id);
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
  ]

  return (
    <>
      <div className="p-5 ml-auto shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Batches
          </h2>
          {/* Students */}
          <div className="flex items-center flex-col sm:flex-row">
            <div className=" w-48 mx-2">
              <div className="relative flex w-full flex-wrap items-stretch">
                <input
                  type="textarea"
                  className="relative m-0 block w-[1%] min-w-0 pl-2 pr-8 py-2  flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-[var(--theme-color)] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Search by name"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                <div
                  className=" absolute bottom-1 right-1 input-group-text flex items-center whitespace-nowrap rounded px-1 py-1.5 text-center text-base font-normal text-neutral-700  cursor-pointer"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Button onClick={handleOpen} className="h-fit">
              + Add Batch
            </Button>
          </div>
        </div>
        <ModalAddBatch
          open={open}
          handleOpen={handleOpen}
          getScheduledBatchesList={getScheduledBatchesList}
        />

        {/* Student Table */}
        <div className="my-10">
          <div className="relative overflow-x-auto ">
            {loader ? (
              <div className="w-full h-[60vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div>
                {console.log(DataWithID(product?.data))}
                <DataGrid
                  rows={DataWithID(product?.data)}
                  columns={columns}
                  getRowHeight={() => 'auto'}
                  components={{ Toolbar: CustomToolbar }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
                <ModalViewMapList
                  open={viewMapStudent}
                  handleOpen={handleCloseViewModal}
                  data={selectedBatch}
                />

                <ModalEditBatch
                  open={open2}
                  handleOpen={handleOpen2}
                  getScheduledBatchesList={getScheduledBatchesList}
                  batchId={updateId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default ScheduleBatches;
