import {Doctor} from "../models/doctor.model.js";
import {Appointment} from "../models/appointment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addDoctor = asyncHandler(async (req, res) => {
  const newDoctor = await Doctor.create(req.body);
  res.status(201).json(new ApiResponse(201, newDoctor, "Doctor added successfully"));
});

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(new ApiResponse(200, doctors, "All doctors fetched successfully"));
});


const getDoctorAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ doctorId: req.params.id }).populate("patientId");

  if (!appointments || appointments.length === 0) {
    throw new ApiError(404, "No appointments found for this doctor");
  }

  res.status(200).json(new ApiResponse(200, appointments, "Doctor's appointments fetched successfully"));
});

export {
    addDoctor,
    getAllDoctors,
    getDoctorAppointments
}