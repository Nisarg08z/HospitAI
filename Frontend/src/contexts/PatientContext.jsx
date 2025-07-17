// src/context/PatientContext.js
import React, { createContext, useContext, useState } from "react";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    symptoms: "",
    doctorId: null,
    appointmentId: null,
    customID: "",
  });

  const updateField = (field, value) => {
    setPatientData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setPatientData({
      name: "",
      age: "",
      gender: "",
      email: "",
      symptoms: "",
      doctorId: null,
      appointmentId: null,
      customID: "",
    });
  };

  return (
    <PatientContext.Provider value={{ patientData, updateField, resetForm }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
