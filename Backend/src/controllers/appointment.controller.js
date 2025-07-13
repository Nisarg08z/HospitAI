import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import { sendAppointmentEmail } from "../utils/mailer.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const bookAppointment = asyncHandler(async (req, res) => {
  const { patientId, doctorId, time } = req.body;

  const newAppointment = await Appointment.create({ patientId, doctorId, time });

  await Patient.findByIdAndUpdate(patientId, { appointmentId: newAppointment._id });

  const doctor = await Doctor.findById(doctorId);
  const patient = await Patient.findById(patientId);

  if (!doctor || !patient) {
    throw new ApiError(404, "Doctor or Patient not found");
  }

  await sendAppointmentEmail(patient.email, doctor.name, time);

  res.status(201).json(new ApiResponse(201, newAppointment, "Appointment booked successfully"));
});

const updateAppointmentTime = asyncHandler(async (req, res) => {
  const { newTime } = req.body;

  const appointment = await Appointment.findById(req.params.id).populate("patientId doctorId");

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  appointment.time = newTime;
  await appointment.save();

  await sendAppointmentEmail(appointment.patientId.email, appointment.doctorId.name, newTime, true);

  res.status(200).json(new ApiResponse(200, appointment, "Appointment time updated successfully"));
});

export {
    bookAppointment,
    updateAppointmentTime
}