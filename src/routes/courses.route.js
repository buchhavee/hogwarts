import express from "express";
import { getCourses, getCourse, addCourse, editCourse, removeCourse, addStudentToCourse, removeStudentFromCourse, changeCourseTeacher } from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", addCourse);
router.put("/:id", editCourse);
router.delete("/:id", removeCourse);
router.post("/:id/students", addStudentToCourse);
router.delete("/:id/students/:studentId", removeStudentFromCourse);
router.put("/:id/teacher", changeCourseTeacher);

export default router;
