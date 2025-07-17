import {Patient} from "../models/patient.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generatePatientPDF } from "../utils/pdfGenerator.js";
import { sendPatientPDFEmail } from "../utils/emailSender.js";

const generateCustomID = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let customID;

  while (true) {
    customID = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");

    const existing = await Patient.findOne({ customID });
    if (!existing) break;
  }

  return customID;
};

const addPatient = asyncHandler(async (req, res) => {
  const customID = await generateCustomID();

  const newPatient = new Patient({
    ...req.body,
    customID,
  });

  await newPatient.save();

  const fileName = `${customID}.pdf`;
  const filePath = await generatePatientPDF(newPatient.toObject(), fileName);

  await sendPatientPDFEmail(newPatient.email, filePath);

  return res.status(201).json(
    new ApiResponse(201, newPatient, "Patient added and email sent successfully")
  );
});

const getPatientByCustomId = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ customID: req.params.id });

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, patient, "Patient fetched successfully"));
});

const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find().populate("doctorId appointmentId");
  res.status(200).json(new ApiResponse(200, patients, "All patients fetched successfully"));
});

export {
    addPatient,
    getAllPatients,
    getPatientByCustomId
}