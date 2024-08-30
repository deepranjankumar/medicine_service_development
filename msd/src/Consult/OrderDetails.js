import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderDetails.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const OrderDetails = () => {
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
        console.log(data.user)
        Setmail(data.user);
          console.log(mail)
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
                    const response = await axios.get(`https://medicine-service-development-2.onrender.com/api/appointment/${mail}`);
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
            <h1>Appointment Details</h1>
            {appointments.map((appointment,ind) => (
                <div className="order-details" key={appointment._id}>
                    <div className="order-info">
                        <h2>{ind+1}.Appointment Information</h2>
                        <p><strong>Appointment ID:</strong> {appointment._id}</p>
                        <p><strong>Date:</strong> {appointment.date}</p>
                        <p><strong>Doctor:</strong> {appointment.docName}</p>
                        <p><strong>Doctor Specialist:</strong> {appointment.docSpec}</p>
                        <p><strong>Doctor Consultant Fee:</strong> {appointment.docConsfee}</p>
                        <p><strong>Doctor Locatoin:</strong> {appointment.docLoc}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                    </div>
                    <div className="user-info">
                        <h2>User Information</h2>
                        <p><strong>Name:</strong> {appointment.name}</p>
    
                        <p><strong>Age:</strong> {appointment.age}</p>
                        <p><strong>Gender:</strong> {appointment.gender}</p>
                        <p><strong>Address:</strong> {appointment.address}</p>
                        <p><strong>Phone:</strong> {appointment.phone}</p>
                    </div>
                
                </div>
            ))}
        </div>
    );
};

export default OrderDetails;
