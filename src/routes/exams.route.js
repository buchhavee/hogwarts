import express from "express";
import { getExams, getExam, addExam, editExam, removeExam } from "../controllers/exams.controller.js";

const router = express.Router();

router.get("/", getExams);
router.get("/:id", getExam);
router.post("/", addExam);
router.put("/:id", editExam);
router.delete("/:id", removeExam);

export default router;
