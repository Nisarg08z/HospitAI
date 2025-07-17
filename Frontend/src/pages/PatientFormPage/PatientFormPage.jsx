
import React from "react";
import { PatientProvider } from "../../contexts/PatientContext";
import VoiceAgent from "../../components/PasientForm/VoiceAgent";
import PatientForm from "../../components/PasientForm/PatientForm";

const PatientFormPage = () => {
  return (
    <PatientProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          🏥 Welcome to AI-Powered Hospital Intake
        </h1>
        <div className="max-w-3xl mx-auto">
          <VoiceAgent />
          <PatientForm />
        </div>
      </div>
    </PatientProvider>
  );
};

export default PatientFormPage;
