import {Router} from "express";
import { bookAppointment, updateAppointmentTime } from "../controllers/appointment.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(verifyJWT)

router.post("/", bookAppointment);           
router.put("/:id", updateAppointmentTime);     

export default router;
