import React, { useEffect, useState } from 'react'
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Loader from '../../Components/Loader';
import { MdPendingActions } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { GiCash } from "react-icons/gi";
import Select from 'react-select'
import baseurl from '../../Config';
import moment from 'moment/moment';



const BalanceReport = () => {


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

    const [loader, setLoader] = useState(false);
    const [instructor, setInstructor] = useState([])
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [balanceReport, setBalanceReport] = useState([])

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

    const getIstructors = async () => {
        try {
            setLoader(true);
            const response = await fetch(`${baseurl}/api/instructor`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setInstructor(result);
            setLoader(false);
        } catch (error) {
            console.error("Error fetching typing result:", error);
            setLoader(false);
        }
    };

    useEffect(() => {
        getIstructors()
    }, [])

    const getBalanceReport = async () => {
        try {
            setLoader(true);
            const response = await fetch(`${baseurl}/api/balance-report/${selectedInstructor.value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setBalanceReport(result.data[0]);
            console.log(result.data[0])
            setLoader(false);
        } catch (error) {
            console.error("Error fetching typing result:", error);
            setLoader(false);
        }
    };

    useEffect(() => {
        getIstructors()
        getBalanceReport()
    }, [selectedInstructor])




    const handleSelectInstructorOption = (selectedInstructor) => {
        setSelectedInstructor(selectedInstructor);
    };

    const instructorOptions = instructor.map((instructor) => ({
        value: instructor._id,
        label: instructor.name,
    }));

    const columns = [
        {
            field: "id",
            headerName: "Sr. No.",
            width: 100,
            renderCell: (params) => (
                <div className="flex justify-center">{params.row.id + 1}</div>
            ),
        },

        {
            field: "name",
            headerName: "Name",
            width: 200,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.name}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        },

        {
            field: "regNo",
            headerName: "Reg. No.",
            width: 100,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.regno}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        },
        {
            field: "doj",
            headerName: "DOJ",
            type: "text",
            width: 200,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{moment(item?.createdAt).format('MMMM Do YYYY')}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        },
        {
            field: "batchSlot",
            headerName: "Batch Slot",
            width: 100,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.shift === '1st Shift' ? 'Morning' : 'Evening'}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        },
        {
            field: "course",
            headerName: "Course",
            width: 100,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.course}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        },
        {
            field: "batchTime",
            headerName: "Batch Time",
            width: 200,
            renderCell: (params) => (
                <div className="">
                    <p><b>From:</b> {moment(params.row?.batchTime?.from).format('MMMM Do YYYY')}</p>
                    <p>{moment(params.row?.batchTime?.from).format('h:mm:ss a')}</p>
                    <p><b>To:</b> {moment(params.row?.batchTime?.to).format('MMMM Do YYYY')}</p>
                    <p>{moment(params.row?.batchTime?.to).format('h:mm:ss a')}</p>
                </div>
            ),
        },
        {
            field: "lastMonthPaid",
            headerName: "Last Month Paid",
            width: 140,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.lastMonthPaid}</td>
                            </tr>
                        ))
                    }
                </div>
            ),

        },
        // {
        //     field: "thisMonthFee",
        //     headerName: "This Month Fee",
        //     width: 140,
        //     renderCell: (params) => (
        //         <div >
        //             {
        //                 params.row?.students?.map((item, index) => (
        //                     <tr key={index}>
        //                         <td>{item?.amountDue}</td>
        //                     </tr>
        //                 ))
        //             }
        //         </div>
        //     ),
        // },
        {
            field: "feeDate",
            headerName: "Fee Date",
            width: 150,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <p>{moment(item.feeDate).format('MMMM Do YYYY')}</p>
                            </tr>
                        ))
                    }
                </div>
            ),
        },
        {
            field: "amountPaid",
            headerName: "Amount Paid",
            width: 140,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.amountPaid}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        },
        {
            field: "totalDue",
            headerName: "Total Due",
            width: 140,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.amountDue}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        },
        {
            field: "mobileNo",
            headerName: "Mobile No.",
            width: 100,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.contact}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        },
        {
            field: "teacherName",
            headerName: "Instructor Name",
            width: 100,
            renderCell: (params) => (
                <div className="flex justify-center">{params.row?.instructor?.name}</div>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            width: 100,
            renderCell: (params) => (
                <div >
                    {
                        params.row?.students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.status}</td>
                            </tr>
                        ))
                    }
                </div>
            ),
        }
    ];



    return (
        <>
            <div className="mt-5 p-5 ml-auto  bg-[#f5f6fa]">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
                        Balance Report
                    </h2>
                    <Select
                        name="instructor"
                        id="instructor"
                        placeholder="Select Instructor"
                        options={instructorOptions}
                        value={selectedInstructor}
                        onChange={handleSelectInstructorOption}
                        className='w-64'
                    />
                </div>
                <div className="flex justify-around flex-wrap my-10">
                    <div className="m-3 flex items-center w-fit px-5 py-7 sm:py-10 text-orange-500 rounded-lg shadow-xl hover:-translate-y-2 transition">
                        <LiaCashRegisterSolid className='w-16 h-16' />
                        <div className="text-center">
                            <div className=" text-3xl">{balanceReport?.finalAmountPaid}</div>
                            <div className="p-2 text-[var(--secondary-color)] sm:text-2xl font-semibold">
                                Total Last Month Paid
                            </div>
                        </div>
                    </div>
                    <div className="m-3 flex items-center w-fit px-5 py-7 sm:py-10 text-green-500 rounded-lg shadow-xl hover:-translate-y-2 transition">
                        <BsCash className='w-16 h-16' />

                        <div className="text-center">
                            <div className=" text-3xl">{balanceReport?.finalMonthPaid}</div>
                            <div className="p-2 text-[var(--secondary-color)] sm:text-2xl font-semibold">
                                Total Amount Paid
                            </div>
                        </div>
                    </div>
                    <div className="m-3 flex items-center w-fit px-5 py-7 sm:py-10 text-red-500 rounded-lg shadow-xl hover:-translate-y-2 transition">
                        <GiCash className='w-16 h-16' />

                        <div className="text-center">
                            <div className=" text-3xl">{balanceReport?.finalAmoutDue}</div>
                            <div className="p-2 text-[var(--secondary-color)] sm:text-2xl font-semibold">
                                Total Amount Due
                            </div>
                        </div>
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
                                    rows={DataWithID(balanceReport.data) || []}
                                    columns={columns}
                                    components={{ Toolbar: CustomToolbar }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                        density: 'comfortable',
                                    }}
                                    pageSizeOptions={[5, 10, 25]}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    getRowHeight={() => 'auto'}
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
    )
}

export default BalanceReport