import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import adminRoutes from "./routes/admin.route.js";
import patientRoutes from "./routes/patient.route.js";
import doctorRoutes from "./routes/doctor.route.js";
import appointmentRoutes from "./routes/appointment.route.js";

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);

export { app };
