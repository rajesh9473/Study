import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from '@material-tailwind/react';
import moment from 'moment/moment';
import { useNavigate, useParams } from 'react-router-dom';
import baseurl from '../../Config';

const FeesReceipt = () => {

    const [loader, setLoader] = useState(false);
    const [feesData, setFeesData] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate()


    const getFeesList = () => {
        fetch(baseurl + "/api/fee/data/get?regno=" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setFeesData(result.data[0]);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getFeesList();
    }, []);

    console.log(feesData)

    const downloadPDF = () => {
        const capture = document.querySelector(".receipt");
        setLoader(true);
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL("img/png");
            const doc = new jsPDF("landscape", "mm", "a4");
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
            setLoader(false);
            doc.save("receipt.pdf");
        });
    };
    return (
        <section className=" p-5 sm:p-5 md:p-10 mt-5">
            <Button
                className="my-5 text-center mx-auto mr-1"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
            <Button
                onClick={downloadPDF}
                disabled={!(loader === false)}
                className="my-5 text-center mx-auto"
            >
                Download
            </Button>
            <div style={{ margin: 'auto auto' }} className="receipt w-[100%] h-[150vh]">
                <div
                    style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}
                    className="max-w-4xl mx-auto p-5">
                    {/* Heading */}
                    <div className="flex justify-between items-start">
                        <div className="m-2 flex flex-col justify-center items-center w-fit">
                            <h3 className="text-sm my-1">ISO Certified : 9001:2008</h3>
                            <img src={logo} className="w-20 h-20 mt-1" alt="" />
                        </div>
                        <div className="m-2 text-xl text-center uppercase font-extrabold font-mono">
                            <h1 className="text-5xl mb-5">SMS Education</h1>
                            <h3 className="my-2">
                                Opp. Laxman Nursery, Gauri Sarojini Nagar
                            </h3>
                            <h3 className="my-2">Lucknow - 226008</h3>
                            <h3 className="my-2">
                                Email :{" "}
                                <span className="lowercase">smseducationlko@gmail.com</span>
                            </h3>
                        </div>
                        <div className="m-2 flex flex-col justify-center items-center w-fit">
                            <h3 className="text-sm my-1">ISO Certified : 9001:2008</h3>
                            <img src={logo} className="w-20 h-20 mt-1" alt="" />
                        </div>
                    </div>

                    {/* Receipt Heading*/}
                    <h2 className="font-bold text-center mt-8 text-xl underline underline-offset-2">
                        Fee Receipt
                    </h2>
                    {/* Receipient Details */}
                    <div className="mt-5 flex justify-between border-b border-black">
                        {/* left block */}
                        <div className="m-3">
                            {/* 1st detail */}
                            <div className="flex ">
                                <div className="font-extrabold w-36">Registration No:</div>
                                <div>{feesData?.regno}</div>
                            </div>
                            {/* 2nd detail */}
                            <div className="flex ">
                                <div className="font-extrabold w-36">Name:</div>
                                <div>{feesData?.name}</div>
                            </div>
                        </div>
                        {/* Right block */}
                        <div className="m-3">
                            {/* 2nd detail */}
                            <div className="flex ">
                                <div className="font-extrabold w-36">Receipt No. :</div>
                                <div>{feesData?.recieptNo}</div>
                            </div>
                            {/* 3rd detail */}
                            <div className="flex ">
                                <div className="font-extrabold w-36">Date :</div>
                                <div>{moment(feesData?.date).format("MMM Do YY")}</div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="max-w-lg mx-auto mt-10">
                        <div className="flex justify-between border-b border-black px-2 font-semibold py-1">
                            <div>Sr. No.</div>
                            <div>Course</div>
                            <div>Amount</div>
                        </div>
                        <div className="flex justify-between border-b border-black px-2 py-2 text-md">
                            <div>1.</div>
                            <div>{feesData?.course?.title}</div>
                            <div>{feesData?.paid}</div>
                        </div>
                        <div className="flex text-xl justify-between border-b border-black px-2 font-semibold py-2">
                            <div className=" ml-10">Total</div>
                            <div></div>
                            <div>{feesData?.paid}</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between mt-10 text-sm">
                        <div>
                            <span className="font-extrabold">
                                Print Date & Time : <span>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
                            </span>
                        </div>
                        <div className="uppercase font-extrabold">SMS Education</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeesReceipt