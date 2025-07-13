import {Patient} from "../models/patient.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addPatient = asyncHandler(async (req, res) => {
  const newPatient = await Patient.create(req.body);
  res.status(201).json(new ApiResponse(201, newPatient, "Patient added successfully"));
});

const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find().populate("doctorId appointmentId");
  res.status(200).json(new ApiResponse(200, patients, "All patients fetched successfully"));
});

const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate("doctorId appointmentId");

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  res.status(200).json(new ApiResponse(200, patient, "Patient fetched successfully"));
});

export {
    addPatient,
    getAllPatients,
    getPatientById
}