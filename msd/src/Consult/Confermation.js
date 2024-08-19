import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Display confirmation message and then navigate after a delay
        const timer = setTimeout(() => {
            alert("Your Payment has been successfully confirmed")
            navigate('/login');
        }, 3000); // 3000ms = 3 seconds
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
       <></>
    );
};

export default Confirmation;
