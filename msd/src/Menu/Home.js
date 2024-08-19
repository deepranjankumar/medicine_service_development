import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import DocCard from './DocCard';
import DocData from '../Data/DocData.js';
import './Menu.css';
import { ToastContainer } from 'react-toastify';
import BottomDash from './BottomDash.js';

export default function Home(props) {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [temp, setTemp] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(DocData);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

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
          setTemp(data.user);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value.toLowerCase());
  };

  const handleSearchClick = () => {
    const results = DocData.filter(doc =>
      doc.location && doc.location.toLowerCase().includes(searchLocation)
    );
    setFilteredDoctors(results);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  const findOrder=()=>{
    navigate('/order_details')
  }
const findAbulance=()=>{
  navigate('/ambulance_details')
}

  return (
    <>
      <div className="Head">
        <div className="navbar">
          <div className="logo-amb">
            <img src='images/medic.png' alt='logo' className="logo" />
            <img src='images/ambulance.png' alt='ambulance' className="abmulance" onClick={() => navigate('/ambulance')} />
          </div>
          <div className="button">
            <div className="static-toast">
              {/* <p>{temp}</p> */}
              <img
                src="user_logo.jpg"
                alt='logo'
                style={{ width: '28px', height: '28px', borderRadius: '25px', cursor: 'pointer' }}
                onClick={toggleDropdown} // Toggle dropdown on click
              />
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <p>{temp}</p>
                  <p onClick={findOrder}>Appointments</p>
                  <p onClick={findAbulance}> Booking</p>
                </div>
              )}
            </div>
            {props.pro ? (
              <button onClick={() => navigate('/login')}>Login</button>
            ) : (
              <button onClick={logOut}>Logout</button>
            )}
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search"
            placeholder="Search by location"
            value={searchLocation}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </div>
      <div className="Card-body">
        <div className="Card">
          {filteredDoctors.map((ele, ind) => (
            <DocCard
              key={ind}
              speclist={ele.speclist}
              name={ele.name}
              img={ele.img}
              consultantFee={ele.consultantFee}
              university={ele.university}
              reg={ele.reg}
              year_of_exp={ele.year_of_exp}
              location={ele.location}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
      <div style={{ backgroundColor: "black" }}>
        <BottomDash />
      </div>
    </>
  );
}
