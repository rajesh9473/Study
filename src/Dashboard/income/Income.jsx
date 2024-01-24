import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import baseurl from "../../Config";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import ModalAddIncome from "./ModalAddIncome";
import Approval from "./Approval";
import Select from 'react-select'
import moment from "moment/moment";
import Loader from "../../Components/Loader";
import ModalStartNewYear from "./ModalStartNewYear";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import ModalAddExpense from "./ModalAddExpense";


const Income = () => {
  const [timer, setTimer] = useState(new Date().getSeconds())
  const [loader, setLoader] = useState(true);
  const [transitData, setTransitData] = useState([])
  const [statsData, setStatsData] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [openExpense, setOpenExpense] = useState(false)
  const handleExpense = () => setOpenExpense(!openExpense)
  const [openFinancial, setOpenFinancial] = useState(false);
  const handleOpenFinancialYear = () => setOpenFinancial(!openFinancial);
  const [getYear, setGetYear] = useState([])

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const options = getYear?.map((year) => ({
    value: `${year}`,
    label: `${year}`,
  }));

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

  const getAllStats = async (selectedYear) => {
    try {
      setLoader(true);

      toast.promise(
        (async () => {
          const response = await axios.get(`${baseurl}/api/cashbook/report/${selectedYear}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.status === 200) {
            setStatsData(response.data.data);
            setLoader(false);
          } else {
            setStatsData(null)
          }
        })(),
        {
          pending: `Fetching data for ${selectedYear}`,
          success: `Year ${selectedYear} Data updated`,
          error: `No record found in this year ${selectedYear}`,
        }
      );
    } catch (error) {
      console.error('Error fetching typing result:', error.message);
      setLoader(false);
    }
  };

  const getAllTransections = async (selectedYear) => {
    try {
      setLoader(true);
      const response = await fetch(`${baseurl}/api/cashbook/transaction/get/${selectedYear}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setTransitData(result.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching typing result:", error);
      setLoader(false);
    }
  };

  const getYears = async () => {
    try {
      setLoader(true);
      const response = await fetch(`${baseurl}/api/cashbook/transaction/cashbook-years`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setGetYear(result.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching typing result:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear) {
        await getAllStats(selectedYear);
        await getAllTransections(selectedYear);
      }
    };

    fetchData();
    getYears()
  }, [selectedYear]);


  const deleteData = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this Entry?");

    if (userConfirmed) {
      try {
        await fetch(baseurl + `/api/cashbook/transaction/delete/${currentYear}/${id}`, {
          method: "DELETE",
        });
        toast.success("Delete successfully")
        getAllTransections(currentYear);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Deletion canceled by user.");
    }
  };


  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
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
      headerName: "Sr. No.",
      width: 90,
      renderCell: (params) => (
        <div className="flex justify-center">{params.row.id + 1}</div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      renderCell: (params) => (
        <div className="flex justify-center">{moment(params.row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
      ),
    },
    {
      field: "particular",
      headerName: "Particular",
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-center">{params.row.source}</div>
      ),
    },
    {
      field: "discrption",
      headerName: "Detail",
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-center">{params.row.discrption}</div>
      ),
    },
    {
      field: "debitAmount",
      headerName: "DR (Amount)",
      type: "text",
      width: 150,
      renderCell: (params) => (
        
        <div className="flex justify-center text-red-700">{params.row.incomeType === 'debit' && params.row.amount}</div>
      ),
    },
    {
      field: "creditAmount",
      headerName: "CR (Amount)",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center text-green-500">{params.row.incomeType === 'credit' && params.row.amount}</div>
      ),
    },
    {
      headerName: "Action",
      width: 100,
      renderCell:(params) => (
        <div className="text-red-600">
          <MdDeleteForever  onClick={() => deleteData(params.row._id)} size={30} />
        </div>
      )
    },
  ];


  return (
    <>
      <div className="relative  mx-auto p-5 shadow-lg  h-screen overflow-y-scroll scrollbar-hide bg-[#f5f6fa]">
        <div className="text-red-800 font-extrabold"><span className="font-black text-black">Note:</span> Every new financial year starts on the night of December 31st at 11:00 PM. </div>
        {loader && <Loader />}
        <div className="flex justify-between">
          <div>
            Year {selectedYear} (<b className="text-blue-700">Opening Balance {statsData?.openingBalance}</b>)
          </div>
          <div className="flex gap-4">
            <Select
              options={options}
              className="w-40"
              defaultValue={options[0]}
              onChange={handleYearChange}
            />

            {/* <Button onClick={handleOpenFinancialYear} variant="contained">Start New Financial Year</Button> */}
          </div>
          <ModalStartNewYear
            open={openFinancial}
            handleClose={handleOpenFinancialYear}
            currentYear={currentYear}
          />
        </div>
        {/* Stats */}
        <div className="flex justify-around flex-wrap my-10">
          <div className="m-3 flex items-center px-5 py-7 sm:py-10  rounded-lg shadow-xl hover:-translate-y-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 sm:w-16 h-12 sm:h-16 mr-5 text-[var(--theme-color)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <div className="">
              <div className="text-[var(--theme-color)] text-3xl">{statsData?.totalExpense}</div>
              <div className="text-[var(--secondary-color)] sm:text-2xl font-semibold">
                Total Expense
              </div>
            </div>
          </div>
          <div className="m-3 flex items-center w-fit px-5 py-7 sm:py-10  rounded-lg shadow-xl hover:-translate-y-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 sm:w-16 h-12 sm:h-16 mr-5 text-[var(--theme-color)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>

            <div className="">
              <div className="text-[var(--theme-color)] text-3xl">{statsData?.totalIncome}</div>
              <div className="text-[var(--secondary-color)] sm:text-2xl font-semibold">
                Total Income
              </div>
            </div>
          </div>
          <div className="m-3 flex items-center w-fit px-5 py-7 sm:py-10  rounded-lg shadow-xl hover:-translate-y-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 sm:w-16 h-12 sm:h-16 mr-5 text-[var(--theme-color)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="">
              <div className="text-[var(--theme-color)] text-3xl">{statsData?.totalRevenue}</div>
              <div className="text-[var(--secondary-color)] sm:text-2xl font-semibold">
                Total Revenue
              </div>
            </div>
          </div>
          <div className="m-3 flex items-center w-fit px-5 py-7 sm:py-10  rounded-lg shadow-xl hover:-translate-y-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 sm:w-16 h-12 sm:h-16 mr-5 text-[var(--theme-color)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="">
              <div className="text-[var(--theme-color)] text-3xl">{statsData?.closingBalance}</div>
              <div className="text-[var(--secondary-color)] sm:text-2xl font-semibold">
                Balance
              </div>
            </div>
          </div>
        </div>
        {/* Incomes */}
        <div className=" flex flex-col sm:flex-row justify-between items-center py-4">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] text-center sm:text-start ">
            Balance Report
          </h2>
          {/* Students */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
            <Button color="orange" onClick={handleExpense} className="h-fit mr-1" disabled={statsData?.status === "close"}>
              + Add Expense
            </Button>
            <Button onClick={handleOpen} className="h-fit mr-1" disabled={statsData?.status === "close"}>
              + Add Fund
            </Button>
            <Approval
              selectedYear={selectedYear}
              currentYear={currentYear}
            />
          </div>
        </div>
        <ModalAddIncome
          open={open}
          handleOpen={handleOpen}
          currentYear={currentYear}
          getAllTransections={getAllTransections}
        />
        <ModalAddExpense
          open={openExpense}
          handleOpen={handleExpense}
          currentYear={currentYear}
          getAllTransections={getAllTransections}
        />

        <DataGrid
          rows={DataWithID(transitData) || []}
          // rows={dataa}
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

export default Income;
