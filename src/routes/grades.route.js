import express from "express";
import { getGrades, getGrade } from "../controllers/grades.controller.js";

const router = express.Router();

// kun GET – karaktersystemet må ikke ændres fra klienten
router.get("/", getGrades);
router.get("/:letter", getGrade);

export default router;
