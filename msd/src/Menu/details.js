import React from 'react';
import { useDoctor } from './DoctorContext';
import './detail.css';

const Details = () => {
  const { selectedDoctor } = useDoctor();

  if (!selectedDoctor) {
    return <p>Please select a doctor to view their details.</p>;
  }

  return (
    <div className="details">
       <div className="name-specialist">
      <img src={selectedDoctor.img} alt="Doctor" />
      <div className="name-specialist-details">
        <h1 style={{ color: 'black' }}>Name: {selectedDoctor.name}</h1>
        <h1 style={{ color: 'black' }}>Specialist: {selectedDoctor.speclist}</h1>
        <h1 style={{ color: 'black' }}>Year Of Experience: {selectedDoctor.year_of_exp}</h1>
        <h1 style={{ color: 'black' }}>Consultant Fee: {selectedDoctor.consultantFee}</h1>
        <h1 style={{ color: 'black' }}>Location: {selectedDoctor.location}</h1>
        <h1 style={{ color: 'black' }}>Education: {selectedDoctor.university}</h1>
        <h1 style={{ color: 'black' }}>Registration No: {selectedDoctor.reg}</h1>
        </div>
      </div>
      <p>Dr. {selectedDoctor.name} stands as a pillar of excellence in the medical field, distinguished by their unwavering commitment to patient care and profound medical expertise. With a rich background in {selectedDoctor.name}, Dr. {selectedDoctor.name}brings both depth and breadth to their practice, making them a trusted choice for those seeking not only treatment but also a compassionate healthcare partner.</p>
    </div>
  );
}

export default Details;
