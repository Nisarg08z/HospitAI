import {Router} from "express";
import { addPatient, getAllPatients, getPatientByCustomId } from "../controllers/patient.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(verifyJWT)

router.post("/addpatient", addPatient);     
router.get("/addpatient/:id", getPatientByCustomId)
router.get("/allpatients", getAllPatients);             

export default router;
