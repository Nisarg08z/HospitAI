// routes/ai.route.js
import { Router } from "express";
import { chatWithAI, getSpecialistBySymptom, assignDoctorBySymptom } from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(verifyJWT)

router.post("/chat", chatWithAI);
router.get("/specialist", getSpecialistBySymptom); 
router.get("/assign", assignDoctorBySymptom);

export default router;
