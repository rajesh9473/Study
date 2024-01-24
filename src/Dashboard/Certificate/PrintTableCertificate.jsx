import React, { useRef, useState } from 'react';
import CertificatePreview from '../../assets/images/homepage/Certificate.png';
import test from '../../assets/images/hero-img.jpg'
import Draggable from 'react-draggable';
import { Button } from '@material-tailwind/react';
import { FaPrint } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import moment from 'moment/moment';


const PrintTableCertificate = () => {


    const location = useLocation();
    const formData = location.state?.selectedStudent || {};
    const formDataa = location.state?.selectedStudent || {};


    console.log(formData)
    console.log(formDataa)

    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        const capture = document.querySelector(".Certificate");
        setLoader(true);

        html2canvas(capture, { scale: 1 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const doc = new jsPDF("landscape", "mm", "a4");
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();

            // Ensure the canvas image fits in the PDF in portrait mode
            const aspectRatio = canvas.width / canvas.height;
            const pdfWidth = componentWidth;
            const pdfHeight = pdfWidth / aspectRatio;

            // Only add the image if the container is in portrait view
            if (pdfHeight <= componentHeight) {
                doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            }

            setLoader(false);
            doc.save("certificate.pdf");
        });
    };

    return (
        <div className='bg-white flex items-start justify-center'>
            <Button onClick={downloadPDF} className='mt-8' >
                <FaPrint size={28} />
            </Button>
            {
                formData.course  ?
                    <div className='grid place-items-center relative text-center font-serif Certificate'>
                        <img src={CertificatePreview} alt='...' />
                        <div className='absolute top-[7%] left-[80%] font-black'>124563</div>
                        <div className='absolute w-20 top-[30%] left-[78%]'>
                            <img
                                className='h-24 w-full'
                                src={formData?.student?.profilePic}
                                alt='...'
                            />
                        </div>
                        <div className='absolute w-6/12 top-[45%] font-black text-xl text-blue-800'>
                            {formData?.course}
                        </div>
                        <Draggable>
                            <div
                                style={{ fontFamily: 'Charm, cursive' }}
                                className='absolute leading-loose w-[650px] text-[16px] font-bold inset-x-auto top-2/4 text-left tracking-wider'
                            >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This certificate is awarded to Mr./Mrs./Miss{' '}
                                <span className='text-blue-800'>...{formData?.name}...</span> S/o, W/o, D/o <span className='text-blue-800'>...{formData?.student?.fname}...</span> Registration No <span className='text-blue-800'>...{formData?.student?.regno}...</span> on
                                the <span className='text-blue-800'>...{moment(formData?.date).format('D')}...</span> Day of the month <span className='text-blue-800'>...{moment(formData?.date).format('MMMM')}...</span> in the year of <span className='text-blue-800'>...{moment(formData?.date).format('YYYY')}...</span> Attending the Course from our{' '}
                                <span className='text-blue-800'>...SMS Education Computer...</span> Center in the Grade of <span className='text-blue-800'>...{formData?.obtain_marks < 60 ? 'Credit' : formData?.obtain_marks > 60 ? 'Distinction' : formData?.obtain_marks > 80 ? 'Excellent' : null}...</span>
                            </div>
                        </Draggable>
                    </div> :
                    <div className='grid place-items-center relative text-center font-serif Certificate'>
                        <img src={CertificatePreview} alt='...' />
                        <Draggable>
                            <div
                                style={{ fontFamily: 'Charm, cursive' }}
                                className='absolute leading-loose w-[650px] text-[17px] font-bold inset-x-auto top-[42%] text-left tracking-wider'
                            >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is to certified that Mr./Mrs./Miss <span className='text-blue-800'>...{formDataa?.student?.name}...</span> S/o,
                                W/o, D/o <span className='text-blue-800'>...{formDataa?.student?.fname}...</span> Registration No <span className='text-blue-800'>...{formDataa?.student?.regno}...</span> on successfully
                                completed course of <span className='text-blue-800'>...Certificate of Computer in {formDataa?.language?.label} Typing...</span> average test
                                speed <span className='text-blue-800'>...{formDataa?.speed} wpm...</span> average accuracy <span className='text-blue-800'>...{formDataa?.accuracy}%...</span> at <span className='text-blue-800'>...SMS Education Computer...</span> of duration from <span className='text-blue-800'>...{moment(formDataa?.from).format("MMM-YYYY")}...</span> to <span className='text-blue-800'>...{moment(formDataa?.to).format("MMM-YYYY")}...</span> and achieved the
                                grade <span className='text-blue-800'>...{formDataa?.obtain_marks < 60 ? 'B' : formDataa?.obtain_marks > 60 ? 'A' : formDataa?.obtain_marks > 80 ? 'A+' : null}...</span>
                            </div>
                        </Draggable>
                    </div>
            }


        </div>
    );
};

export default PrintTableCertificate;
