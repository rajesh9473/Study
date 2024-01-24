import React, { useEffect, useState } from 'react'
import { Button, Input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import baseurl from '../../Config';
import Select from "react-select";


const IdCard = () => {

    const [loader, setLoader] = useState(true);
    const [idcard, setIdCard] = useState([])
    const [selectStudent, setSelectStudent] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null)
    const PrintIdCard = useNavigate()

    const [userDetails, setUserDetails] = useState({
        name: selectStudent?.label,
        guardianName: selectedStudent?.fname,
        address: selectedStudent?.address,
        regNo: selectedStudent?.regno,
        course: selectedStudent?.course,
        contactNo: selectedStudent?.contact,
        imageUrl: selectedStudent?.profilePic
    });

    const getIdCardData = async () => {
        try {

            const response = await fetch(`${baseurl}/api/students`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setIdCard(result.data);
            setLoader(false);
        } catch (error) {
            console.error("Error fetching student list:", error);
        }
    };

    const handleSelectStudent = (selectedStudent) => {

        // setFormData((prevData) => ({
        //     ...prevData,
        //     student: selected,
        // }));
        setSelectStudent(selectedStudent);

    };

    useEffect(() => {
        getIdCardData()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    useEffect(() => {
        if (selectStudent) {
          setSelectedStudent(idcard?.find((item) => item?._id === selectStudent?.value))
        }
      }, [selectStudent])


    const handleSubmit = (e) => {
        e.preventDefault();
        PrintIdCard(`/admin/idCard/id-generator`, { state: { selectedStudent } });
        console.log('Form submitted:', selectedStudent);
    };

    const returnOptions = (data) => {
        const options = data?.map((item) => ({
            label: item?.name,
            value: item?._id
        }))

        return options
    }


    return (
        <>
            <div className="h-screen p-5 ml-auto  bg-[#f5f6fa]">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 space-y-6">

                    <Select
                        id="name"
                        name="name"
                        value={selectStudent}
                        onChange={handleSelectStudent}
                        options={returnOptions(idcard)}
                        placeholder="Select Student"
                        isSearchable
                    />
                    <Input
                        type="text"
                        label="Guardian Name"
                        name="guardianName"
                        value={selectedStudent?.fname}
                        required
                    />
                    <Input
                        type="text"
                        label="Address"
                        name="address"
                        value={selectedStudent?.address}
                        required
                    />
                    <Input
                        type="text"
                        label="Reg. No."
                        name="regNo"
                        value={selectedStudent?.regno}
                        required
                    />
                    <Input
                        type="text"
                        label="Course"
                        name="course"
                        value={selectedStudent?.course}
                        required
                    />
                    <Input
                        type="url"
                        label="Contact No."
                        name="contactNo"
                        value={selectedStudent?.contact}
                        required
                    />
                    <Button onClick={handleSubmit} type="submit" color="blue" ripple="light">
                        Submit
                    </Button>
                </form>
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

export default IdCard