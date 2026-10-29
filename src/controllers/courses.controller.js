import * as coursesRepository from "../repositories/courses.repository.js";

// hent alle courses
export async function getCourses(req, res) {
  try {
    const courses = await coursesRepository.getAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// hent enkelt course
export async function getCourse(req, res) {
  try {
    const course = await coursesRepository.getCourseById(req.params.id);
    if (!course) return res.sendStatus(404);
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// opret nyt course
export async function addCourse(req, res) {
  try {
    const { name, teacher_id } = req.body;
    if (!name || !teacher_id) return res.sendStatus(400);
    const course = await coursesRepository.createCourse(name, teacher_id);
    res.status(201).json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// opdater et course
export async function editCourse(req, res) {
  try {
    const { name, teacher_id } = req.body;
    if (!name || !teacher_id) return res.sendStatus(400);
    const course = await coursesRepository.updateCourse(req.params.id, name, teacher_id);
    if (!course) return res.sendStatus(404);
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// slet et course
export async function removeCourse(req, res) {
  try {
    const course = await coursesRepository.deleteCourse(req.params.id);
    if (!course) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// tilføj en student til et course
export async function addStudentToCourse(req, res) {
  try {
    const course_id = req.params.id;
    const { student_id } = req.body;
    if (!student_id || !course_id) return res.sendStatus(400);
    const courseStudent = await coursesRepository.addStudentToCourse(course_id, student_id);
    res.status(201).json(courseStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// remove student from course
export async function removeStudentFromCourse(req, res) {
  try {
    const course_id = req.params.id;
    const student_id = req.params.studentId;
    if (!student_id || !course_id) return res.sendStatus(400);

    const removed = await coursesRepository.removeStudentFromCourse(course_id, student_id);
    if (!removed) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

// skift course teacher
export async function changeCourseTeacher(req, res) {
  try {
    const course_id = req.params.id;
    const { teacher_id } = req.body;
    if (!course_id || !teacher_id) return res.sendStatus(400);
    const course = await coursesRepository.changeCourseTeacher(course_id, teacher_id);
    if (!course) return res.sendStatus(404);
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}
