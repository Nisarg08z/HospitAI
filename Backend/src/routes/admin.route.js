import {Router} from "express";
import { registerAdmin, loginAdmin, checkPassword, getCurrentAdmin } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/check-password", verifyJWT, checkPassword); 
router.get("/me", verifyJWT, getCurrentAdmin)

export default router;
