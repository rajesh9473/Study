import React, { useEffect, useState } from 'react'
import { Button, Carousel, IconButton, Tooltip } from '@material-tailwind/react'
import baseurl from '../../Config';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdDeleteForever } from "react-icons/md";


const SliderMgmt = () => {

    const [loader, setLoader] = useState(false);
    const [sliderImage, setSliderImage] = useState([])

    const getSliderImages = async () => {
        try {
            setLoader(true);
            const response = await fetch(`${baseurl}/api/slider/getall`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            setSliderImage(result.data);
            setLoader(false);
        } catch (error) {
            console.error("Error fetching typing result:", error);
            setLoader(false);
        }
    };

    useEffect(() => {
        getSliderImages()
    }, [])

    const handleFileUpload = async (file) => {

        try {
            const formdata = new FormData();
            formdata.append("file", file);


            try {
                const upload = await axios.post(baseurl + `/api/upload/file?fileName=${file.name}`, formdata)
                if (upload.status === 200) {
                    const fileUrl = upload.data.fileName
                    toast.info("Image uploaded successfully", fileUrl)
                    const updateSlider = await axios.post(`${baseurl}/api/slider/add`, {
                        img: fileUrl,
                    });

                    if (updateSlider.status === 200) {
                        console.log('Slider updated successfully');
                        getSliderImages();
                    } else {
                        console.error('Failed to update slider');
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteData = async (id) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this data?");

        if (userConfirmed) {
            try {
                await fetch(baseurl + `/api/slider/delete/${id}`, {
                    method: "DELETE",
                });
                toast.success("Delete successfully")
                getSliderImages();
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Deletion canceled by user.");
        }
    };


    return (
        <>
            <div className='p-5 ml-auto h-screen bg-[#f5f6fa]'>
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
                        Slider Management
                    </h2>

                    <div className="flex gap-4 items-center">
                        <input
                            type="file"
                            className="uploadDocs hidden"
                            onChange={(e) =>
                                handleFileUpload(e.target.files[0])
                            }
                        />
                        <Button className='flex gap-4 items-center' onClick={() => document.querySelector(".uploadDocs").click()} color="" variant="contained">
                            <FaUpload />
                            Upload Image
                        </Button>
                    </div>
                </div>
                <div className='mt-2'>
                    <Carousel className="rounded-xl">
                        {
                            sliderImage?.map((item, index) => (
                                <div className='grid place-items-center px-5 pt-5' key={index}>
                                    <img
                                        src={item.img}
                                        alt={`image ${index + 1}`}
                                        className="h-[600px] w-full object-fill object-center rounded-lg"
                                    />
                                    <div className=" absolute flex gap-4 hover:shadow-[rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px] " style={{ boxShadow: 'box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
                                        <Tooltip content="Upload New Image">
                                            <IconButton onClick={() => document.querySelector(".uploadDocs").click()} color='blue' className='scale-110 hover:scale-150 rounded-full' size='lg' variant='contained'>
                                                <FaUpload size={25} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Click to Delete Image">
                                            <IconButton onClick={() => deleteData(item._id)} color='red' className='scale-110 hover:scale-150' size='lg' variant='contained'>
                                                <MdDeleteForever size={25} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>
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

export default SliderMgmt