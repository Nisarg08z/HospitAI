import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import adminRoutes from "./routes/admin.route.js";
import patientRoutes from "./routes/patient.route.js";
import doctorRoutes from "./routes/doctor.route.js";
import appointmentRoutes from "./routes/appointment.route.js";

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("🩺 HospitAI API is running");
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: err.data || null,
      errors: err.errors || [],
    });
  }

  console.error("Unhandled Error:", err.stack || err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    data: null,
    errors: [],
  });
});

export { app };
