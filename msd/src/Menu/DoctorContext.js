import React, { createContext, useState, useContext } from 'react';

// Create the context
const DoctorContext = createContext();

// Create a provider component
export const DoctorProvider = ({ children }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <DoctorContext.Provider value={{ selectedDoctor, setSelectedDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

// Custom hook to use the DoctorContext
export const useDoctor = () => useContext(DoctorContext);
