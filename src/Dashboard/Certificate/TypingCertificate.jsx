import React, { useEffect, useState } from 'react'
import { MdArrowForward } from 'react-icons/md';
import { Button, Input, select } from '@material-tailwind/react'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import baseurl from '../../Config';
import TypingCertificateResults from './TypingCertificateResults';
import moment from 'moment/moment';
import AddTypingResultModal from './AddTypingResultModal';


const TypingCertificate = ({ back }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [fetchTypingData, setFetchTypingData] = useState([])
    const [selectStudent, setSelectStudent] = useState(null); // Added selectStudent state
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(!open)
    const [openAdd, setOpenAdd] = useState(false)
    const handleAddClose = () => setOpenAdd(!openAdd)

    const handleAddtypingResult = () => {
        setOpen(!open)
        setOpenAdd(!openAdd)
    }

    const getFetchResult = async () => {
        try {
            const response = await fetch(`${baseurl}/api/typing-result/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setFetchTypingData(result.data);
            setLoader(false);
        } catch (error) {
            console.error("Error fetching typing result:", error);
        }
    };


    const returnOptions = (data) => {
        const options = data?.map((item) => ({
            label: item?.student?.name,
            value: item?._id
        }))

        return options
    }



    useEffect(() => {
        getFetchResult()
    }, [])

    const handleSelectStudent = (selectedOption) => {
        setSelectStudent(selectedOption);
    };
    const PrintCertificate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        PrintCertificate(`/admin/certificate/print-certificate`, { state: { selectedStudent } });
        console.log('Form submitted:', selectedStudent);
    };


    useEffect(() => {
        if (selectStudent) {
            setSelectedStudent(fetchTypingData?.find((item) => item?._id === selectStudent?.value))
        }
    }, [selectStudent])

    return (
        <div>
            <div className="flex justify-between">
                <Button variant='outlined' onClick={back}>Back to Certificate</Button>
                <Button color='green' onClick={handleClose} >Typing Certificates</Button>
                <TypingCertificateResults
                    open={open}
                    handleClose={handleClose}
                    openAddCertificate={handleAddtypingResult}
                />
                <AddTypingResultModal
                    open={openAdd}
                    handleClose={handleAddClose}
                    openList={handleClose}
                    openAddCertificate={handleAddtypingResult}
                    getFetchResult={getFetchResult}
                />
            </div>
            <div className="p-5 mx-auto max-w-xl">
                <form onSubmit={handleSubmit}>
                    {/* Course Select Field */}

                    <div className="py-2">
                        <Select
                            id="name"
                            name="name"
                            value={selectStudent}
                            onChange={handleSelectStudent}
                            options={returnOptions(fetchTypingData)}
                            placeholder="Select Student"
                            isSearchable
                        />
                    </div>

                    <div className="py-2">
                        <Input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            value={selectedStudent?.typingLang}
                            label="Typing Language"
                            size="regular"
                            fullWidth
                            disabled
                        />
                    </div>

                    <div className="py-2">

                        <Input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            value={selectedStudent?.fname}
                            label="Father's Name"
                            size="regular"
                            fullWidth
                            disabled
                        />

                    </div>
                    <div className="py-2">

                        <Input
                            type="text"
                            id="regNo"
                            name="regNo"
                            value={selectedStudent?.regno}
                            label="Registration Number"
                            size="regular"
                            fullWidth
                            disabled
                        />
                    </div>
                    <div className="py-2">

                        <Input
                            type="number"
                            id="speedWpm"
                            name="speedWpm"
                            value={selectedStudent?.speed}
                            label="Speed"
                            size="regular"
                            fullWidth
                            disabled
                        />
                    </div>
                    <div className="py-2">

                        <Input
                            type="number"
                            id="average"
                            name="average"
                            value={selectedStudent?.accuracy}
                            label="Average"
                            size="regular"
                            fullWidth
                            disabled
                        />
                    </div>
                    <div className="py-2">

                        <Input
                            type="text"
                            id="address"
                            name="address"
                            value={selectedStudent?.student?.address}
                            label="Address"
                            size="regular"
                            fullWidth
                            disabled
                        />
                    </div>
                    <div className="py-2">
                        <Input
                            type="date"
                            id="from"
                            name="from"
                            value={selectedStudent?.from ? moment(selectedStudent?.from).format('YYYY-MM-DD') : ''}
                            variant="outlined"
                            label="From"
                            size="regular"
                            fullWidth
                            disabled
                        />

                    </div>
                    <div className="py-2">
                        <Input
                            type="date"
                            id="to"
                            name="to"
                            value={selectedStudent?.from ? moment(selectedStudent?.to).format('YYYY-MM-DD') : ''}
                            variant="outlined"
                            label="To"
                            size="regular"
                            fullWidth
                            disabled
                        />

                    </div>
                    <div className="py-2">
                        <Input
                            id="grade"
                            name="grade"
                            value={selectedStudent?.obtain_marks < 60 ? 'B' : selectedStudent?.obtain_marks > 60 ? 'A' : selectedStudent?.obtain_marks > 80 ? 'A+' : null}
                            variant="outlined"
                            label="Enter Marks"
                            size="regular"
                            fullWidth
                            disabled
                        />
                    </div>

                    <Button
                        type="submit"
                        buttonType="filled"
                        size="lg"
                        ripple="light"
                        fullWidth
                        className='flex justify-center items-center mt-2'
                    >
                        Submit <MdArrowForward size={20} className="ml-2" />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default TypingCertificate