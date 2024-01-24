import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import baseurl from '../Config';

const InstructorList = () => {
    const [instData, setInstData] = useState([]);

    function getInstructorData() {
        fetch(baseurl + "/api/instructor", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setInstData(result);
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getInstructorData();
    }, []);

    console.log(instData)

    return (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {instData.map((item) => {
                return (
                    <div className="relative overflow-hidden transition w-64 h-64 duration-300 transform rounded-full shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                        <img
                            className="object-cover object-top w-full h-[100%] md:h-[100%] xl:h-[100%]"
                            // src={baseurl + "/api/teacherpic/" + item.profilePic}
                            src={`${baseurl}/${item?.profilePic}`}
                            alt="Person"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                            <p className="mb-1 text-lg font-bold text-gray-100">
                                {item.name}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default InstructorList