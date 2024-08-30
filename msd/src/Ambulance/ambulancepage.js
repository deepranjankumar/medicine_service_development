import React, { useEffect, useState } from 'react';
import './ambulance.css'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import  BottomDash from '../Menu/BottomDash.js'
const Ambulance=()=>{
  const [cookies, removeCookie] = useCookies([]);
    const[swap,SetSwap]=useState(true);
    const navigate = useNavigate();
    const clickEvent=()=>{
        SetSwap(!swap)
    }
    const [amb_book, Setamb_book] = useState({
      from: '',
      to: '',
      mail:'',
    });

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
         Setamb_book((oldData) => ({
                    ...oldData,
                    mail:data.user,
                }));
      }
    } catch (error) {
      console.error("Verification error:", error);
      localStorage.removeItem("jwtoken");
      navigate("/login");
    }
  };

  verifyUser();
}, [navigate]);

    
      const InputEvent = (event) => {
        const { name, value } = event.target;
        Setamb_book((olddata) => ({
          ...olddata,
          [name]: value,
        }));
      };
      const clickBook = (e) => {
        e.preventDefault();
        navigate('/ambulance-payment', { state: { amb_book } });
      };
    
 
      console.log(amb_book);

    return(<>
    <form onSubmit={clickBook}>
        <div className="ambulance" >
        <input
  type="text"
  placeholder={swap ? "enter source address" : "enter destination address"}
  required
  name="from"
 value={amb_book.from}
onChange={InputEvent}
  />

<img src="/ambupdown.png" alt="updown" onClick={clickEvent} />

<input
  type="text"
  placeholder={swap ? "enter destination address" : "enter source address"}
  required
  name="to"
 value={amb_book.to}
onChange={InputEvent}
  />

<button type="submit" >Book Now</button>
        </div>
</form>
        <div className="offer">
            <div>
            <img src="/ambulance.png" alt='offer' className='offerimg'/>
            </div>
            <div className="booking-offer">
            <h3 style={{padding:'0px', margin:'0px'}}>Pahli Booking </h3>
            <h3 style={{padding:'0px', margin:'0px'}}>Ke Liye Upto 60% money cashback</h3>
            </div>
            <div className="price-offer">
            <p style={{padding:'0px', margin:'0px'}}>Starting Price</p>
            <p style={{padding:'0px', margin:'0px'}}>₹199</p>
            </div>
        </div>
        <div style={{backgroundColor:"#0056b3",height:'100%',marginTop:"25vh"}}>
        < BottomDash/>
        </div>
    </>)
}

export default Ambulance;
