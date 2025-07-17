import React from "react";
import { usePatient } from "../../contexts/PatientContext";

const PatientForm = () => {
  const { patientData, updateField } = usePatient();

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Patient Form</h2>
      <form className="grid gap-4">
        {Object.entries(patientData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-gray-700 capitalize mb-2" htmlFor={key}>
              {key}
            </label>
            <input
              type="text"
              id={key}
              value={value}
              onChange={(e) => updateField(key, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={key === "customID" || key === "doctorId" || key === "appointmentId"} 
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default PatientForm;
