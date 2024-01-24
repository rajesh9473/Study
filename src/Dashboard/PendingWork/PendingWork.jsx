import React, { useState, useEffect } from 'react';
import baseurl from '../../Config';
import { useNavigate } from 'react-router-dom';

const PendingWork = () => {

    const navigate = useNavigate()
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseurl + '/api/enquiry');
                if (response.ok) {
                    const data = await response.json();
                    const pendingData = data.filter(entry => entry.status === 'pending');
                    setPendingCount(pendingData.length);
                } else {
                    console.error('Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='text-center p-5 ml-auto shadow-lg h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5'>
                <label className='font-black text-lg text-yellow-600'>Manager</label>
                {pendingCount > 0 && <div>
                    <h1 onClick={() => navigate('/admin/enquiries')} className='font-black hover:text-blue-800 hover:underline underline-offset-4 py-3 cursor-pointer'>
                        Pending or not enrolled students [{pendingCount}]
                    </h1>
                </div>}
            </div>
            {/* Footer */}
            <div className="bg-[var(--theme-color)]">
                <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
                    &#169; 2023 SMS Education | All Rights Reserved
                </h1>
            </div>
        </>
    );
};

export default PendingWork;
