import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendAppointmentEmail = async (to, doctor, time, updated = false) => {
  const subject = updated ? "Updated Appointment Time" : "Appointment Confirmation";
  const text = updated
    ? `Your appointment with Dr. ${doctor} has been rescheduled to ${new Date(time).toLocaleString()}.`
    : `Your appointment with Dr. ${doctor} is scheduled at ${new Date(time).toLocaleString()}.`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};
