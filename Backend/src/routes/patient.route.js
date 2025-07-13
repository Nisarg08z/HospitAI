import {Router} from "express";
import { addPatient, getAllPatients, getPatientById } from "../controllers/patient.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT)

router.post("/", addPatient);            
router.get("/", getAllPatients);         
router.get("/:id", getPatientById);      

export default router;
