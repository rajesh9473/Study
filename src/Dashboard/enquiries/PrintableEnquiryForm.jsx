import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Radio, Select, Textarea } from '@material-tailwind/react';
import SMSLOGO from '../../assets/images/logo.png'
import baseurl from '../../Config';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const PrintableEnquiryForm = ({ open, handleOpen, getEnquiryList }) => {
    const [name, setName] = useState("");
    const [fname, setFatherName] = useState("");
    const [address, setPostalAddress] = useState("");
    const [contact, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [academicQualifications, setAcademicQualifications] = useState("");
    const [computerAwareness, setComputerAwareness] = useState("");
    const [previousknowledge, setPreviousknowledge] = useState("");
    const [pdClasses, setPdClasses] = useState("");
    const [carrierClasses, setCarrierClasses] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [gender, setGender] = useState("");
    const [counseller, setCounseller] = useState("");
    const [ref_by, setReferenced] = useState("")
    const [courseData, setCourseData] = useState([]);

    const data = {
        name: name,
        fname: fname,
        address: address,
        gender: gender,
        contact: contact,
        maritalStatus: maritalStatus,
        dob: dob,
        academicQualifications: academicQualifications,
        computerAwareness: computerAwareness,
        previousknowledge: previousknowledge,
        pdClasses: pdClasses,
        carrierClasses: carrierClasses,
        email: email,
        course: course,
        counseller: counseller,
        ref_by: ref_by
    };

    const onSubmitClick = (e) => {
        setName("");
        setFatherName("");
        setPostalAddress("");
        setDob("");
        setCourse("");
        setPhoneNumber("");
        setMaritalStatus("");
        setAcademicQualifications("");
        setComputerAwareness("");
        setPreviousknowledge("");
        setPdClasses("");
        setCarrierClasses("");
        setEmail("");
        setGender("");
        setCounseller("");
        e.preventDefault();
        console.log(data)
        // Post Api For Posting Data
        fetch(baseurl + "/api/enquiry", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === true && result.code === 200) {
                    toast.success("Enquiry Added Successfully");
                    getEnquiryList();
                    handleOpen();
                } else {
                    toast.info(`${result.message}`);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const getCourseData = () => {
        fetch(baseurl + "/api/course", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setCourseData(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCourseData();
    }, []);

    // handelPrint


    const handlePrint = () => {
        const printWindow = window.open('', '', 'width=800,height=800');
        printWindow.document.open();
        printWindow.document.write(`<html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="Content-Style-Type" content="text/css" />
            <meta name="generator" content="Aspose.Words for .NET 23.9.0" />
            <title></title>
            <style type="text/css">
                body {
                    font-family: 'Times New Roman';
                    font-size: 12pt;
                    background-color: rgb(158, 158, 82);
                }
        
                p {
                    margin: 0pt
                }
            </style>
        </head>
        
        <body>
            <div style="border: double 5px black; padding: 20px;">
                <div style="max-height: 200px;">
                    <div style="display: flex; justify-content: center;">
                        <img src=${SMSLOGO} style="width: 150px; min-width: 150px;"
                            alt="mainLogo">
                        <div>
                            <h1 style="font-weight: 800; font-size: 50px;margin-left: 10px;">SMS EDUCATION</h1>
                        </div>
                    </div>
                    <center style="margin-left: 20px;">
                        <p style="font-size: larger;">Opp. Laxman Nursery, Gauri, Sarojini Nagar, Kanpur Road, Lucknow. E-mail
                            :smseducation@outlook.com
                            Ph. : (0522) 6004415, 3274415</p>
                    </center>
                </div>
                <center style="margin-top: 30px;">
                    <div style="text-align: center; color: white; max-width: fit-content;">
                        <center style="background-color: black; padding: 5px; font-size: x-large;">ENQUIRY FORM</center>
                    </div>
                </center>
                <div style="display: flex; justify-content: space-between; max-height: 65px;">
                    <div>
                        <h5 style="font-size: x-large;">Name </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; max-height: 65px;">
                    <div>
                        <h5 style="font-size: x-large;">Father's Name </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; max-height: 65px;">
                    <div>
                        <h5 style="font-size: x-large;">Postal Address </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; max-height: 65px;">
                    <div>
                        <h5 style="font-size: x-large;">Phone Number </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; max-height: 65px;">
                    <div>
                        <h5 style="font-size: x-large;">Marital Status </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; max-height: 65px;">
                    <div>
                        <h5 style="font-size: x-large;">Date of Birth </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; max-height: 65px;">
                    <div>
                        <h5 style="font-size: x-large;">Academic Qualification </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; max-height: 65px;">
                    <div>
                        <h5 style="font-size: x-large;">Computer Awareness in Family (if Any) </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <h5 style="font-size: x-large;">Previous knowledge of Computer, Give Institute Name (if Yes) </h5>
                    </div>
                    <div contenteditable
                        style="border-bottom: 2px solid black; width: 80%; height: 50px; margin-top: 20px; display: flex; align-items: center;">
                        :
                    </div>
                </div>
        
                <hr style="margin: 0px 30px; border: solid 1px black;">
                <hr style="border: solid 1px black;margin: 5px 5px;">
                <hr style="margin: 0px 30px; border: solid 1px black;">
        
                <div style="margin-top: 20px;">
                    <div style="display: flex; justify-content: space-between; max-height: 65px;">
                        <div style="width: 50%;">
                            <h5 style="font-size: x-large;">Interest to attend Personality Development Classes :</h5>
                        </div>
                        <div style="width: 50%; height: 25px; margin-top: 20px; display: flex; align-items: center;">
                            <div
                                style="border: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; width: 20%;">
                            </div>
                            <h6 style="font-size: x-large; padding: 0px 25px;">Yes</h6>
                            <div
                                style="border: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; width: 20%">
                            </div>
                            <h6 style="font-size: x-large; padding: 0px 25px;">No</h6>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; max-height: 65px;">
                        <div style="width: 50%;">
                            <h5 style="font-size: x-large;">Interest to attend Carrier Classes :</h5>
                        </div>
                        <div style="width: 50%; height: 25px; margin-top: 20px; display: flex; align-items: center;">
                            <div
                                style="border: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; min-width: 20%;">
                            </div>
                            <h6 style="font-size: x-large; padding: 0px 25px;">Yes</h6>
                            <div
                                style="border: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; min-width: 20%">
                            </div>
                            <h6 style="font-size: x-large; padding: 0px 25px;">No</h6>
                        </div>
                    </div>
                    <div style="display: flex; max-height: 60px; align-items: baseline;">
                        <div style="min-width: 20%;">
                            <h5 style="font-size: x-large;">Expected Joining Date </h5>
                        </div>
                        <div
                            style="border-bottom: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; width: 10%;">
                        </div>
                        <h6 style="font-size: x-large; padding: 0px 10px;">/</h6>
                        <div
                            style="border-bottom: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; width: 10%">
                        </div>
                        <h6 style="font-size: x-large; padding: 0px 10px;">/</h6>
                        <div
                            style="border-bottom: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; width: 10%">
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <div>
                            <h5 style="font-size: large;">Reference :</h5>
                        </div>
                        <div
                            style="border: 2px solid black; height: 50px; display: flex; align-items: center; min-width: 12%; margin: 0px 5px;">
                        </div>
                        <div>
                            <h5 style="font-size: large;">Advertisement :</h5>
                        </div>
                        <div
                            style="border: 2px solid black; height: 50px; display: flex; align-items: center; min-width: 12%; margin: 0px 5px;">
                        </div>
                        <div>
                            <h5 style="font-size: large;">Student :</h5>
                        </div>
                        <div
                            style="border: 2px solid black; height: 50px; display: flex; align-items: center; min-width: 12%; margin: 0px 5px;">
                        </div>
                        <div>
                            <h5 style="font-size: large;">others</h5>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; max-height: 50px; padding: 0px 100px;">
                        <div>
                            <h5 style="font-size: x-large;">Date ......................</h5>
                        </div>
                        <div>
                            <h5 style="font-size: x-large;">Signature</h5>
                        </div>
                    </div>
                </div>
        
                <div style="border-top: dotted 4px black; margin-top: 50px;">
                    <center style="margin-top: 50px;">
                        <div style="text-align: center; color: white; max-width: fit-content;">
                            <center style="background-color: black; padding: 5px; font-size: x-large;">FOR OFFICE USE ONLY
                            </center>
                        </div>
                    </center>
        
                    <div style="display: flex; max-height: 60px; align-items: baseline;">
                        <div style="min-width: 15%;">
                            <h5 style="font-size: x-large;">Course :</h5>
                        </div>
                        <div
                            style="border-bottom: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; min-width: 30%;">
                        </div>
                        <div style="min-width: 20%;">
                            <h5 style="font-size: x-large;">Accepted By :</h5>
                        </div>
                        <div
                            style="border-bottom: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; width: 30%;">
                        </div>
                    </div>
                    <div style="display: flex; max-height: 60px; align-items: baseline; margin: 20px 0px;">
                        <div style="min-width: 10%;">
                            <h5 style="font-size: x-large;">Date :</h5>
                        </div>
                        <div
                            style="border-bottom: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; width: 40%;">
                        </div>
                        <div style="min-width: 20%;">
                            <h5 style="font-size: x-large;">Signature :</h5>
                        </div>
                        <div
                            style="border-bottom: 2px solid black; height: 50px; margin-top: 20px; display: flex; align-items: center; width: 40%;">
                        </div>
                    </div>
                </div>
        
            </div>
        </body>
        
        </html>`);
        printWindow.print();
        printWindow.close();
    };

    const handleSelectChange = (newValue) => {
        setCourse(newValue);
    };


    return (
        <Dialog
            open={open}
            size='xxl'
            handler={handleOpen}
            className="min-w-[80%] md:min-w-[60%] lg:min-w-[90%]"
        >
            <DialogHeader className="flex justify-between items-center">

                <h3>Add Enquiry</h3>
                <Button
                    type="button"
                    onClick={handlePrint}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
                >
                    Print Form
                </Button>
            </DialogHeader>
            <DialogBody divider className="h-[40rem] overflow-y-scroll">

                <div className="border-double border-5 border-black p-10">
                    <div className="max-h-200">
                        <div className="flex justify-center items-center">
                            <img
                                src="https://www.smseducationlko.com/Images/LogoSmall.png"
                                className="w-32 min-w-32"
                                alt="mainLogo"
                            />
                            <div>
                                <h1 className="font-bold text-6xl mt-2 ml-5 mb-8">SMS EDUCATION</h1>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-lg">
                                Opp. Laxman Nursery, Gauri, Sarojini Nagar, Kanpur Road, Lucknow. E-mail :smseducation@outlook.com
                                Ph. : (0522) 6004415, 3274415
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <div className="bg-black text-white max-w-max mx-auto p-3 text-2xl font-bold">
                            ENQUIRY FORM
                        </div>
                    </div>

                    {/* Form fields */}
                    <form onSubmit={onSubmitClick} className="mt-10 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                                    Name
                                </label>
                                <Input variant='static'
                                    type="text"
                                    id="name"
                                    value={name}
                                    placeholder="Enter your name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                    Father's Name
                                </label>
                                <Input variant='static'
                                    type="text"
                                    id="fname"
                                    value={fname}
                                    placeholder="Enter your father's name"
                                    onChange={(e) => {
                                        setFatherName(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="address" className="block text-xl font-medium text-gray-700">
                                    Postal Address
                                </label>
                                <Input variant='static'
                                    type="text"
                                    id="address"
                                    value={address}
                                    placeholder="Enter your postal address"
                                    onChange={(e) => {
                                        setPostalAddress(e.target.value);
                                    }}
                                />
                            </div>


                            <div className="w-full md:w-1/2 px-3 mb-3">
                                <label htmlFor="maritalStatus" className="block text-xl font-medium text-gray-700">
                                    Marital Status
                                </label>
                                <div className="flex flex-wrap">
                                    <Radio
                                        id="single"
                                        name="maritalStatus"
                                        label="Single"
                                        value={maritalStatus}
                                        onChange={(e) => {
                                            setMaritalStatus("single");
                                        }}
                                    />
                                    <Radio
                                        id="married"
                                        name="maritalStatus"
                                        label="Married"
                                        value={maritalStatus}
                                        onChange={(e) => {
                                            setMaritalStatus("married");
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-3">
                                <label htmlFor="maritalStatus" className="block text-xl font-medium text-gray-700">
                                    Gender
                                </label>
                                <div className="flex flex-wrap">
                                    <Radio
                                        id="male"
                                        name="type"
                                        label="Male"
                                        value={gender}
                                        onChange={(e) => {
                                            setGender("male");
                                        }}
                                    />
                                    <Radio
                                        id="female"
                                        name="type"
                                        label="Female"
                                        value={gender}
                                        onChange={(e) => {
                                            setGender("female");
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="dob" className="block text-xl font-medium text-gray-700">
                                    Date of Birth
                                </label>
                                <input
                                    className="scroll-smooth appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="dob"
                                    type="date"
                                    value={dob}
                                    onChange={(e) => {
                                        setDob(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="academicQualification" className="block text-xl font-medium text-gray-700">
                                    Academic Qualification
                                </label>
                                <Input variant='static'
                                    type="text"
                                    id="academicQualification"
                                    value={academicQualifications}
                                    placeholder="Enter your academic qualification"
                                    onChange={(e) => {
                                        setAcademicQualifications(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="computerAwareness" className="block text-xl font-medium text-gray-700">
                                    Computer Awareness in Family (if Any)
                                </label>
                                <Input variant='static'
                                    type="text"
                                    id="computerAwareness"
                                    value={computerAwareness}
                                    placeholder="Enter computer awareness details"
                                    onChange={(e) => {
                                        setComputerAwareness(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="previousKnowledge" className="block text-xl font-medium text-gray-700">
                                    Previous knowledge of Computer, Give Institute Name (if Yes)
                                </label>
                                <Input variant='static'
                                    type="text"
                                    id="previousKnowledge"
                                    value={previousknowledge}
                                    placeholder="Enter previous knowledge details"
                                    onChange={(e) => {
                                        setPreviousknowledge(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Additional fields */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Interest in Personality Development Classes */}
                            <div className='w-full'>
                                <label className="block text-xl font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="w-full">
                                    <Input variant='static'
                                        type="tel"
                                        id="contact"
                                        value={contact}
                                        placeholder="Enter phone number"
                                        // onChange={(e) => {
                                        //     setPhoneNumber(e.target.value);
                                        // }}
                                        onChange={(e) => {
                                            const enteredValue = e.target.value.replace(/\D/g, '');
                                            if (enteredValue.length <= 10) {
                                                setPhoneNumber(e.target.value, enteredValue);
                                            }
                                          }}
                                    />
                                </div>
                            </div>

                            {/* Interest in Carrier Classes */}
                            <div className='w-full'>
                                <div className="block text-xl font-medium text-gray-700 w-full">
                                    Email Address
                                </div>
                                <div className='w-full'>
                                    <Input variant='static'
                                        type="text"
                                        id="email"
                                        value={email}
                                        placeholder="Enter email address"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Interest in Personality Development Classes */}
                            <div className='flex items-center w-full'>
                                <label className="block text-xl font-medium text-gray-700">
                                    Interest to attend Personality Development Classes
                                </label>
                                <div className="flex justify-around w-full">
                                    <div className="flex mt-2 items-center">
                                        <Radio value={pdClasses}
                                            variant='static'
                                            type="radio"
                                            id="yesPD"
                                            name="pdInterest"
                                            className="form-radio h-6 w-6"
                                            onChange={(e) => {
                                                setPdClasses(true);
                                            }}
                                        />
                                        <label htmlFor="yesPD" className="ml-2 text-lg">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="flex mt-2 items-center">
                                        <Radio
                                            value={pdClasses}
                                            variant='static'
                                            type="radio"
                                            id="noPD"
                                            name="pdInterest"
                                            className="form-radio h-6 w-6"
                                            onChange={(e) => {
                                                setPdClasses(false);
                                            }}
                                        />
                                        <label htmlFor="noPD" className="ml-2 text-lg">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Interest in Carrier Classes */}
                            <div className='flex items-center justify-around'>
                                <div className="block text-xl font-medium text-gray-700 w-full">
                                    Interest to attend Carrier Classes
                                </div>
                                <div className='flex justify-around w-full'>
                                    <div className="flex items-center">
                                        <Radio
                                            variant='static'
                                            type="radio"
                                            id="yesCarrier"
                                            name="carrierInterest"
                                            className="form-radio h-6 w-6"
                                            value={carrierClasses}
                                            onChange={(e) => {
                                                setCarrierClasses(true);
                                            }}
                                        />
                                        <label htmlFor="yesCarrier" className="ml-2 text-lg">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <Radio
                                            variant='static'
                                            type="radio"
                                            id="noCarrier"
                                            name="carrierInterest"
                                            className="form-radio h-6 w-6"
                                            value={carrierClasses}
                                            onChange={(e) => {
                                                setCarrierClasses(false);
                                            }}
                                        />
                                        <label htmlFor="noCarrier" className="ml-2 text-lg">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr />

                        {/* Main fields */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Interest in Personality Development Classes */}
                            <div className='w-full'>
                                <label className="block text-xl font-medium text-gray-700">
                                    Select Intrested Courses
                                </label>
                                <div className="w-full">
                                    <Select value={course} onChange={handleSelectChange}>
                                        <Option value="">Select Course</Option>
                                        {courseData?.map((item) => (
                                            <Option key={item._id} value={item.title}>
                                                {item.title}
                                            </Option>
                                        ))}
                                        <Option value="other">Other</Option>
                                    </Select>


                                    <div className="flex items-center mt-5 justify-around">

                                        <label className="block text-xl font-medium text-gray-700">
                                            Refered By :
                                        </label>

                                        <Checkbox
                                            value={ref_by}
                                            label='Advertisement'
                                            onChange={(e) => {
                                                setReferenced("advertisement");
                                            }}
                                        />
                                        <Checkbox
                                            value={ref_by}
                                            label='Student'
                                            onChange={(e) => {
                                                setReferenced("student");
                                            }}
                                        />
                                        <Checkbox
                                            value={ref_by}
                                            label='Others'
                                            onChange={(e) => {
                                                setReferenced("others");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Interest in Carrier Classes */}
                            <div className=''>
                                <div className="block text-xl font-medium text-gray-700 w-full">
                                    counseller
                                </div>
                                <div className='flex justify-around w-full'>
                                    <Textarea
                                        value={counseller}
                                        label="Message"
                                        onChange={(e) => {
                                            setCounseller(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    </form>

                </div>

            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" type='submit' color="blue" onClick={onSubmitClick}>
                    <span>Submit</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default PrintableEnquiryForm;
