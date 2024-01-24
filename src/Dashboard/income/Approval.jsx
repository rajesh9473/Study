import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Radio,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import moment from "moment/moment";

const Approval = ({ selectedYear, currentYear }) => {

    const [loader, setLoader] = useState(true);
    const [transitApproveData, setTransitApproveData] = useState([])
    const [openapproval, setApproval] = useState(false)
    const handleApprovelModal = () => setApproval(!openapproval)

    const getApprovalTransections = async () => {
        try {
            const response = await fetch(`${baseurl}/api/cashbook/transaction/get-unapproved/${selectedYear}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setTransitApproveData(result);
            setLoader(false);
        } catch (error) {
            console.error("Error fetching typing result:", error);
        }
    };

    function getApprove(id) {
        if (window.confirm("Are you sure You want to Approve this Transaction?")) {
            fetch(`${baseurl}/api/cashbook/transaction/status/${id}/${selectedYear}?status=true`, {
                method: "GET",
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Error: ${res.status} - ${res.statusText}`);
                    }
                    return res.json();
                })
                .then((res) => {
                    if (res.success) {
                        toast.success("Updated Successfully");
                        getApprovalTransections(currentYear);
                    } else {
                        toast.error("Failed to update");
                    }
                })
                .catch((error) => {
                    console.error("Error updating transaction:", error);
                    toast.error("Failed to update");
                });
        }
    }



    useEffect(() => {
        getApprovalTransections()
    }, [])

    // console.log(transitApproveData)


    return (
        <>
            <div class="relative inline-flex">
                <Button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    onClick={() => handleApprovelModal()}
                    color="red"
                    type="button">
                    View Deduction Approval
                </Button>
                {transitApproveData?.data?.length ? <span
                    className="absolute rounded-full border border-white-2 py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]">
                    {transitApproveData?.data?.length}
                </span> : null}
            </div>

            <Dialog
                open={openapproval}
                // handler={handleOpen}
                size="sm"
                className="min-w-[80%] md:min-w-[60%] lg:min-w-[80%]"
            >
                <DialogHeader className="text-center justify-center">
                    {" "}
                    Approval Requests
                </DialogHeader>
                <DialogBody divider className="h-[25rem] overflow-y-scroll">
                    <div>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Sr. No.</th>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Particular</th>
                                    <th className="py-2 px-4 border-b">Detail</th>
                                    <th className="py-2 px-4 border-b">Dr Amount</th>
                                    <th className="py-2 px-4 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transitApproveData?.data?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border-b text-center">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                            <td className="py-2 px-4 border-b text-center">{item.source}</td>
                                            <td className="py-2 px-4 border-b text-center">{item.discrption}</td>
                                            <td className="py-2 px-4 border-b text-center text-red-700">{item.amount}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                {item.approved === true ?
                                                    <Button variant="text" disabled >Approved</Button> :
                                                    <Button onClick={() => {
                                                        getApprove(item._id);
                                                    }} >Approve</Button>}
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleApprovelModal}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default Approval;
