import React from 'react';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { useDoctor } from './DoctorContext';

const DocCard = (props) => {
  const navigate = useNavigate();
  const { setSelectedDoctor } = useDoctor();

  // Log props to see if it has the expected values
  // console.log('DocCard props:', props);
  const handleConsult = () => {
    setSelectedDoctor(props);
    navigate('/consult'); // Navigate to the consult page after setting the doctor
  };
  
  const handleViewDetails = () => {
    // console.log('Setting Doctor:', props); 
    setSelectedDoctor(props); // Store selected doctor details in context
    navigate('/docdetail'); // Navigate to details page
  };

  return (
    <div className="doc-card">
      <img src={props.img} alt="DocPhoto" />
      <h1 style={{ textAlign: 'center', margin: '0px', padding: '0px', color: 'black' }}>{props.speclist}</h1>
      <h2 style={{ textAlign: 'center' }}>{props.name}</h2>
      <h2 style={{ textAlign: 'center', margin: '0px', padding: '0px' }}>Consultant fee: {props.consultantFee}</h2>
      <div className="doc-card-btn">
        <button className="btn-doc-card" onClick={handleViewDetails}>View Details</button>
        <button className="btn-doc-card" onClick={handleConsult}>Consult</button>
      </div>
    </div>
  );
}

export default DocCard;
