import {Router} from "express";
import { addDoctor, getAllDoctors, getDoctorAppointments } from "../controllers/doctor.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(verifyJWT)

router.post("/", addDoctor);                
router.get("/", getAllDoctors);                
router.get("/:id/appointments", getDoctorAppointments); 

export default router;
