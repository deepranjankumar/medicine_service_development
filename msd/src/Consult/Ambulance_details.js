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
    const token = localStorage.getItem("jwtoken");
    console.log("Stored JWT Token:", token);

    if (!token) {
      console.log("No JWT token found in localStorage, navigating to login...");
      navigate("/login");
      return;
    }

    try {

        const { data } = await axios.post(
          "https://medicine-service-development-2.onrender.com",
          {},
          { withCredentials: true }
        );
      
      if (!data.status) {
        localStorage.removeItem("jwtoken");
        navigate("/login");
      } else {
        Setmail(data.user);
      }
    } catch (error) {
      console.error("Verification error:", error);
      localStorage.removeItem("jwtoken");
      navigate("/login");
    }
  };

  verifyUser();
}, [navigate]);

    useEffect(() => {
        if (mail) {
            const fetchAppointments = async () => {
                try {
                    const response = await axios.get(`https://medicine-service-development-2.onrender.com/api/ambulance_details/${mail}`);
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
