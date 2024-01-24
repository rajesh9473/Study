import { tab } from '@material-tailwind/react';
import React, { useState } from 'react'
import { RiKeyboardBoxFill } from "react-icons/ri";
import { TbFileCertificate } from "react-icons/tb";
import CoursesCertificate from './CoursesCertificate';
import TypingCertificate from './TypingCertificate';

const Certificate = () => {

    const [Twoway, setTwoway] = useState('NoWay')

    const handleWay = (tab) => {
        setTwoway(tab)
    }

    return (
        <div>
            <div className="p-5 ml-auto shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5">
                <div className='text-2xl text-center font-black'>
                    {Twoway === 'OneWay' ? 'Courses ' : Twoway === 'TwoWay' ? 'Typing ' : ''}
                    Certificate Generation
                </div>
                {Twoway === 'NoWay' && <div className='grid grid-cols-2 place-items-center' >
                    <div onClick={() => handleWay('OneWay')} className="w-48 h-48 p-10 m-3 text-2xl text-[#6bbd4a] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#6bbd4a] ring-offset-1"
                    >
                        <div className="py-1 text-[#6bbd4a]">
                            <TbFileCertificate className="w-28 h-28" />
                        </div>
                        <div>Courses certificate</div>
                    </div>
                    <div onClick={() => handleWay('TwoWay')} className="w-48 h-48 p-10 m-3 text-2xl text-[#654abd] font-semibold text-center flex flex-col justify-center items-center bg-gray-200 border rounded-lg shadow-2xl hover:-translate-y-4 transition cursor-pointer ring-2 ring-[#654abd] ring-offset-1"
                    >
                        <div className="py-1 text-[#654abd]">
                            <RiKeyboardBoxFill className="w-28 h-28" />
                        </div>
                        <div>Typing certificate</div>
                    </div>
                </div>}

                {
                    Twoway === 'OneWay' ? <CoursesCertificate back={() => setTwoway('NoWay')} /> : Twoway === 'TwoWay' && <TypingCertificate back={() => setTwoway('NoWay')} />
                }

            </div>
            {/* Footer */}
            <div className="bg-[var(--theme-color)]">
                <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
                    &#169; 2023 SMS Education | All Rights Reserved
                </h1>
            </div>
        </div>
    )
}

export default Certificate