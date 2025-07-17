import { Doctor } from "../models/doctor.model.js";
import { OpenAI } from "openai";
import { asyncHandler } from "../utils/asyncHandler.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatWithAI = asyncHandler(async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  const reply = completion.choices?.[0]?.message?.content?.trim();
  res.status(200).json({ reply });
});

const getSpecialistBySymptom = asyncHandler(async (req, res) => {
  const { symptom } = req.query;

  if (!symptom) {
    return res.status(400).json({ error: "Symptom is required" });
  }

  const messages = [
    {
      role: "system",
      content: "You are a hospital triage assistant. Based on symptoms, recommend the correct type of doctor (e.g., cardiologist, dermatologist, ENT, general physician). Return only the doctor's specialty in a few words, no explanations.",
    },
    {
      role: "user",
      content: `What kind of doctor should a patient see for "${symptom}"?`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  const specialty = completion.choices?.[0]?.message?.content?.trim();
  res.status(200).json({ specialty });
});


const assignDoctorBySymptom = asyncHandler(async (req, res) => {
  const { symptom } = req.query;

  if (!symptom) {
    return res.status(400).json({ error: "Symptom is required" });
  }

  const aiMessages = [
    {
      role: "system",
      content: "You are a hospital assistant. Based on symptoms, suggest the appropriate doctor specialization. Just respond with a few words like 'Dermatologist' or 'General Physician'.",
    },
    {
      role: "user",
      content: `What type of doctor is needed for the symptom "${symptom}"?`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: aiMessages,
  });

  const specialty = completion.choices?.[0]?.message?.content?.trim();

  const doctor = await Doctor.findOne({ specialization: { $regex: new RegExp(specialty, "i") } });

  if (!doctor) {
    return res.status(404).json({ error: `No doctor found for ${specialty}` });
  }

  res.status(200).json({
    doctor,
    specialization: specialty,
    message: `Doctor assigned for symptom: ${symptom}`,
  });
});

export {
    getSpecialistBySymptom,
    assignDoctorBySymptom,
    chatWithAI
}
