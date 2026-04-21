import express from "express";
import { userLogin } from "./userLogin.js";
import { registerUser } from "./registerUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);

export default router;
