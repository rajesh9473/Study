import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import baseurl from '../../Config';
import moment from 'moment/moment';

const CourseCertificateResults = ({ open, handleClose }) => {

    const [loader, setLoader] = useState(true);
    const [courseResults, setCourseResults] = useState([])

    const getFetchResult = async (resultType) => {
        try {
            const response = await fetch(`${baseurl}/api/marks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const allResults = await response.json();

            // Filter the results based on resultType
            const filteredResults = allResults.filter(result => result.resultType === resultType);

            setCourseResults(filteredResults);
            setLoader(false);
        } catch (error) {
            console.error("Error fetching student list:", error);
        }
    };

    useEffect(() => {
        getFetchResult('final');
    }, []);

    return (
        <>
            <Dialog
                open={open}
                className="min-w-[90%] md:min-w-[60%] lg:min-w-[90%]"
            >
                <DialogHeader className="text-center justify-center">
                    {" "}
                    Typing Results
                </DialogHeader>
                <DialogBody divider className="h-[25rem] overflow-y-scroll">
                    <div className="overflow-x-auto">
                        {/* <div className="flex justify-end">
                            <Button onClick={openAddCertificate} >Add Result</Button>
                        </div> */}
                        <table className="min-w-full border border-gray-300 my-2">
                            <thead>
                                <tr>
                                    {/* Header columns */}
                                    <th className="border border-gray-300 p-2">Course</th>
                                    <th className="border border-gray-300 p-2">Student Name</th>
                                    <th className="border border-gray-300 p-2">Reg. No.</th>
                                    <th className="border border-gray-300 p-2">Father Name</th>
                                    <th className="border border-gray-300 p-2">Date</th>
                                    <th className="border border-gray-300 p-2">Obtained Marks</th>
                                    <th className="border border-gray-300 p-2">Total Marks</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    courseResults.map((item, index) => (
                                        <tr key={index} className="border border-gray-300">
                                            <td className="border border-gray-300 p-2">{item?.course}</td>
                                            <td className="border border-gray-300 p-2">{item?.name}</td>
                                            <td className="border border-gray-300 p-2">{item?.regno}</td>
                                            <td className="border border-gray-300 p-2">{item?.student?.fname}</td>
                                            <td className="border border-gray-300 p-2">{moment(item?.date).format('MM Do YYYY')}</td>
                                            <td className="border border-gray-300 p-2">{item?.obtain_marks}</td>
                                            <td className="border border-gray-300 p-2">{item?.total_marks}</td>
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
                        onClick={handleClose}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default CourseCertificateResults