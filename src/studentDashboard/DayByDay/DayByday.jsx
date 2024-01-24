import React, { useEffect, useState } from 'react'
import { IconButton } from '@material-tailwind/react'
import { MdFileDownload } from "react-icons/md";
import baseurl from '../../Config';
import { useAuthContext } from '../../context/useStateContext';
import Loader from '../../Components/Loader';

const DayByday = () => {

    const { currentUser } = useAuthContext();
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState('')
    const [courseData, setCourseData] = useState([]);
    const [courseName, setCourseName] = useState('');




    const getCourseDetails = () => {

        setLoader(true)

        fetch(baseurl + `/api/course/new-lession/get?course=${courseName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setData(result);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)
            });
    };

    const getCoursesList = () => {
        fetch(baseurl + `/api/course`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setCourseData(result);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getCourseNameById = (courseId) => {
        const course = courseData.find((course) => course?.title === courseId);
        return course ? course._id : 'Course not found';
    };

    useEffect(() => {
        getCourseDetails();
        getCoursesList();
    }, [currentUser?.course]);

    useEffect(() => {
        const yourId = currentUser?.course;
        const yourCourseName = getCourseNameById(yourId);
        setCourseName(yourCourseName);
    }, [currentUser?.course, courseData]);


    const downloadNotes = (notes) => {
        if (notes) {
            const downloadLink = document.createElement("a");
            downloadLink.href = notes;
            downloadLink.download = true;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };
    return (
        <section className=" p-2 sm:p-5 md:p-10 ">
            <div className="w-full p-1">
                <div className="flex justify-between items-center p-1 pb-4">
                    <h2 className="text-3xl font-semibold text-[var(--secondary-color)] text-center sm:text-start my-5 sm:my-7 md:my-10">
                        Day By Day Lesson Plan
                    </h2>
                </div>

                <div className="w-full border border-black rounded-sm">

                    {loader && <Loader />}
                    {!loader && (
                        <table className="border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="border border-black text-gray-800 font-semibold p-1">Day</th>
                                    <th className="border border-black text-gray-800 font-semibold p-1">Topics</th>
                                    <th className="border border-black text-gray-800 font-semibold p-1">Notes</th>
                                    <th className="border border-black text-gray-800 font-semibold p-1">Instructor</th>
                                </tr>
                            </thead>
                            {data?.data?.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td className='border border-black p-1 text-center'>
                                            {
                                                item.topic.map((item, index) => (
                                                    <p className='p-2' key={index}>{index + 1}</p>
                                                ))
                                            }
                                        </td>
                                        <td className='border font-semibold border-black p-1'>
                                            {
                                                item.topic.map((item, index) => (
                                                    <p className='p-2' key={index}>{item.topics}</p>
                                                ))
                                            }
                                        </td>
                                        <td className='border font-semibold border-black p-1'>
                                            {
                                                item.topic.map((topic, index) => (
                                                    <div key={index} className='flex justify-center p-1'>
                                                        <IconButton onClick={() => downloadNotes(topic.notes)}>
                                                            <MdFileDownload />
                                                        </IconButton>
                                                    </div>
                                                ))
                                            }
                                        </td>
                                        <td className='border font-semibold border-black p-1'>
                                            {item.instructorList.map((instructor, index) => (
                                                <h2 key={index}>{instructor.name}</h2>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    )}

                </div>
            </div>
        </section>)
}

export default DayByday