import { useState } from "react";
import {
  speakText,
  getPatientByCustomId,
  addPatient,
  getDoctorBySymptom,
} from "../utils/api";

const questions = [
  { field: "name", prompt: "What is your full name?" },
  { field: "age", prompt: "How old are you?" },
  { field: "gender", prompt: "What is your gender?" },
  { field: "email", prompt: "Please tell me your email address." },
  { field: "symptoms", prompt: "Describe your symptoms." },
];

const useVoiceAgent = () => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(-1);
  const [isOldPatient, setIsOldPatient] = useState(null);
  const [customID, setCustomID] = useState("");

  const handleUserResponse = async (text) => {
    const lower = text.toLowerCase();

    if (step === -1) {
      speakText("Welcome to our hospital. Are you a new patient or returning?");
      setStep(0);
      return;
    }
    
    if (step === 0) {
      if (lower.includes("old") || lower.includes("returning")) {
        setIsOldPatient(true);
        speakText("Please say your custom ID or type it manually.");
        setStep(1);
      } else if (lower.includes("new")) {
        setIsOldPatient(false);
        setStep(2);
        speakText(questions[0].prompt);
      } else {
        speakText("Sorry, I didn't get that. Are you a new patient or returning?");
      }
      return;
    }

    if (isOldPatient && step === 1) {
      try {
        const res = await getPatientByCustomId(text);
        if (res) {
          setFormData(res);
          speakText("Welcome back, " + res.name + ". We retrieved your data. You may ask questions or book a new appointment.");
          setStep(questions.length + 2);
        } else {
          speakText("No record found. Proceeding as a new patient.");
          setIsOldPatient(false);
          setStep(2);
          speakText(questions[0].prompt);
        }
      } catch {
        speakText("Error retrieving patient. Proceeding as a new patient.");
        setIsOldPatient(false);
        setStep(2);
        speakText(questions[0].prompt);
      }
      return;
    }

    if (!isOldPatient && step >= 2 && step < questions.length + 2) {
      const currentQuestion = questions[step - 2];
      const field = currentQuestion.field;
      setFormData((prev) => ({ ...prev, [field]: text }));
      speakText(`You said ${text} for ${field}. Is that correct?`);
      setStep((prev) => prev + 100); 
      return;
    }

    if (step >= 102 && step < 102 + questions.length) {
      if (lower.includes("yes")) {
        const nextStep = step - 100 + 1;
        if (nextStep < questions.length + 2) {
          speakText(questions[nextStep - 2].prompt);
          setStep(nextStep);
        } else {
          speakText("Submitting your form now.");

          try {
            const doctor = await getDoctorBySymptom(formData.symptoms);

            const payload = {
              ...formData,
              doctorId: doctor?._id || null,
            };

            await addPatient(payload);

            if (doctor) {
              speakText(`Dr. ${doctor.name} has been assigned to you.`);
            } else {
              speakText("No matching doctor found. Your case will be reviewed manually.");
            }

            speakText("Thank you. Please check your email for appointment details.");
            alert("Check your email for confirmation.");

            setStep(-1);
            setFormData({});
            setIsOldPatient(null);
            setCustomID("");
          } catch (err) {
            speakText("An error occurred while submitting your form.");
            console.error(err);
          }
        }
      } else {
        speakText("Okay, please type it manually.");
      }
      return;
    }

    if (step >= questions.length + 2) {
      if (lower.includes("where") || lower.includes("when") || lower.includes("open")) {
        speakText("Our hospital is open 24/7 and located near City Center.");
        return;
      } else if (lower.includes("appointment")) {
        speakText("Once your form is submitted, an appointment will be scheduled.");
        return;
      } else {
        speakText("Do you want to fill a new patient form?");
        setStep(-1);
        setFormData({});
      }
    }
  };

  return {
    handleUserResponse,
    formData,
  };
};

export default useVoiceAgent;
