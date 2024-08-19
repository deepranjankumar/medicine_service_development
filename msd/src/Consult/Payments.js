import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appoint } = location.state;

  const handlePaymentSuccess = () => {
    axios.post('https://medicine-service-development-2.onrender.com/appoint', appoint)
      .then((response) => {
        if (response.data && response.data.status === 'success') {
          console.log('Appointment saved:', response.data);
          navigate('/confirmation');  // Redirect to confirmation page
        } else {
          console.log('Failed to save appointment:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  return (
    <div className="payment-body">
      <div className="payment">
        <div>
          <img src="/card.png" alt="card" />
        </div>
        <div className="card-input">
          <input type="text" placeholder="CARD NUMBER" />
          <input type="text" placeholder="CARD HOLDER NAME" />
        </div>
        <div className="card-date">
          <input type="text" placeholder="MM" />
          <input type="text" placeholder="YY" />
          <input type="text" placeholder="CVV" />
        </div>
        <div className="payment-btn">
          <button className="paynow" onClick={handlePaymentSuccess}>PAY NOW</button>
          <button className="cancel">CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
