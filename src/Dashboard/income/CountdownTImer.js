import { useState, useEffect } from 'react';

const useCountdownTimer = (targetDateTime) => {
    const targetDate = new Date(targetDateTime).getTime();
    const [timeDifference, setTimeDifference] = useState(calculateTimeDifference());

    function calculateTimeDifference() {
        const now = new Date().getTime();
        const difference = targetDate - now;
        return difference > 0 ? difference : 0;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeDifference(calculateTimeDifference());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
};

export default useCountdownTimer;
