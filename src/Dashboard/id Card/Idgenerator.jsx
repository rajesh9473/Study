import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from "../../assets/images/logo.png";

const Idgenerator = () => {
    const location = useLocation();
    const formData = location.state?.selectedStudent || {};

    console.log(formData)

    return (
        <>
            <div className="h-screen p-5 ml-auto bg-[#f5f6fa]">
                <div className="max-w-xl rounded-lg overflow-hidden text-white bg-gradient-to-r from-white to-blue-500 shadow-lg mx-auto mt-8 p-4">
                    <div className='flex flex-col md:flex-row items-center gap-4 border-2 border-t-[transparent] border-l-[transparent] border-r-[transparent] border-b-[var(--theme-color)]'>
                        <img className="mx-3 my-2 h-24 w-24" src={logo} alt="logo" />
                        <div className='text-center'>
                            <div className='text-xl font-black'>SMS EDUCATION</div>
                            <div>NIELIT Authorized Computer Center</div>
                            <div className='text-xs'>Kudrat Vihar Colony, Sarojini Nagar, Lucknow, Uttar Pradesh 226008, Mob : 8090004415, Email : smseducationlko@gmail.com</div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row text-black'>
                        <div className='w-full md:w-1/4 p-2'>
                            <img className="w-full border h-36 border-blue-500" src={formData?.imageUrl} alt="..." />
                        </div>
                        <div className='w-full md:w-3/4 flex p-2'>
                            <div className='w-44'>
                                <div>Name </div>
                                <div>Guardian Name </div>
                                <div>Address </div>
                                <div>Reg. No. </div>
                                <div>Course </div>
                                <div>Contact No. </div>
                            </div>
                            <div className='w-full'>
                                <div>: {formData.name}</div>
                                <div>: {formData.guardianName}</div>
                                <div>: {formData.address}</div>
                                <div>: {formData.regNo}</div>
                                <div>: {formData.course}</div>
                                <div>: {formData.contactNo}</div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <div className="text-sm text-black font-semibold mb-2 flex justify-between">
                            <div>Issuer Signature</div>
                            <div>Director Signature</div>
                        </div>
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
}

export default Idgenerator;
