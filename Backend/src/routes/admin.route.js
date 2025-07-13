import {Router} from "express";
import { registerAdmin, loginAdmin, checkPassword } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/check-password", verifyJWT, checkPassword); 

export default router;
