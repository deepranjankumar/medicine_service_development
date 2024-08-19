import React, { useEffect, useState } from 'react';
import './consult.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useDoctor } from '../Menu/DoctorContext';

const Consult = () => {
  const { selectedDoctor } = useDoctor();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  console.log(selectedDoctor)
  const [appoint, SetAppoint] = useState({
    name: '',
    gender: '',
    address: '',
    age: '',
    phone: '',
    mail:'',
    date:'',
    status:'',
    docName:'',
    docSpec:'',
    docConsfee:'',
    docLoc:'',
  });

  useEffect(() => {
    // console.log('Selected Doctor:', selectedDoctor);
    if (!selectedDoctor) {
      console.log('No doctor selected. Redirecting...');
      navigate('/home'); // Redirect or handle the case when no doctor is selected
      return;
    }
    const currentDate = new Date();
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "https://medicine-service-development-2.onrender.com",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          SetAppoint(prevAppoint => ({
            ...prevAppoint,
            mail: data.user,
            date: currentDate,
            status: 'pending',
            docName: selectedDoctor.name,
            docConsfee: selectedDoctor.consultantFee,
            docSpec: selectedDoctor.speclist,
            docLoc: selectedDoctor.location
          }));
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie, selectedDoctor]);

  const InputEvent = (event) => {
    const { name, value } = event.target;
    SetAppoint((olddata) => ({
      ...olddata,
      [name]: value,
    }));
  };

  const Onsubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { appoint } });
  };

  const clickEvent = (link) => {
    navigate(link);
  };

  return (
    <>
      <div className="consult">
        <div className="consult-item">
          <div>
            <h1 style={{ color: 'black' }}>Skip the travel!</h1>
            <h1 style={{ color: 'black' }}>Take Online Doctor Consultation</h1>
            <button className='consult-btn' onClick={() => clickEvent('/consult-video')}>CONSULT</button>
            <div className="consult-logo">
              <div>
                <img src="/images/logo/verified.jpeg" alt="Verified Doctors" />
                <p>Verified Doctors</p>
              </div>
              <div>
                <img src="/images/logo/Prescription.png" alt="Digital Prescription" />
                <p>Digital Prescription</p>
              </div>
              <div>
                <img src="/images/logo/followup.png" alt="Free Followup" />
                <p>Free Followup</p>
              </div>
            </div>
          </div>
          <img src="/images/logo/consult.png" alt="consult" />
        </div>
      </div>
      <h1 style={{ textAlign: 'center', color: "black", marginTop: '0px' }}>OR</h1>

      <div className="consult-cont">
        <h1 style={{ textAlign: 'center', color: "black" }}>FIX APPOINTMENT</h1>
        <div className="consult-form">
          <form method="post" onSubmit={Onsubmit}>
            <input type="text" placeholder="Enter your name" required
              name="name"
              value={appoint.name}
              onChange={InputEvent}
            />
            <input type="text" placeholder="Enter your gender" required
              name="gender"
              value={appoint.gender}
              onChange={InputEvent}
            />
            <input type="text" placeholder="Enter your address" required
              name="address"
              value={appoint.address}
              onChange={InputEvent}
            />
            <input type="text" placeholder="Enter your age" required
              name="age"
              value={appoint.age}
              onChange={InputEvent}
            />
            <input type="text" placeholder="Enter your phone number" required
              name="phone"
              value={appoint.phone}
              onChange={InputEvent}
            />
            <button type="submit" name="btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Consult;
