import express from "express";
import { getTeachers, getTeacher, addTeacher, editTeacher, removeTeacher } from "../controllers/teachers.controller.js";

const router = express.Router();

router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.post("/", addTeacher);
router.put("/:id", editTeacher);
router.delete("/:id", removeTeacher);

export default router;
