import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderDetails.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Ambulance_details = () => {
    const [mail, Setmail] = useState('');
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login");
            } else {
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    { withCredentials: true }
                );
                if (!data.status) {
                    removeCookie("jwt");
                    navigate("/login");
                } else {
                    Setmail(data.user); // Assuming data.user is just the email
                }
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    useEffect(() => {
        if (mail) {
            const fetchAppointments = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/api/ambulance_details/${mail}`);
                    console.log(response.data);
                    setAppointments(response.data);
                } catch (error) {
                    console.error('Error fetching the appointment data:', error);
                }
            };
            fetchAppointments();
        }
    }, [mail]);

    if (appointments.length === 0) return <div>Loading...</div>;

    return (
        <div className="order-details-container">
            <h1>Ambulance Booking Details</h1>
            {appointments.map((appointment,ind) => (
                <div className="order-details" key={appointment._id}>
                    <div className="order-info">
                        <p><strong>{ind+1}.Booking ID:</strong> {appointment._id}</p>
                        <p><strong>Date:</strong> {appointment.date}</p>
                        <p><strong>From:</strong> {appointment.from}</p>
                        <p><strong>To:</strong> {appointment.to}</p>
                        <p><strong>Fare:</strong> {appointment.Fare}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                    </div>
                   
                
                </div>
            ))}
        </div>
    );
};

export default Ambulance_details;
