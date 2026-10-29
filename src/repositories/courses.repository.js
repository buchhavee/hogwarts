import { pool } from "../db.js";

// Hent alle courses
export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM courses");
  return result.rows;
}

// Hent ét course ud fra id
export async function getCourseById(id) {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

// Opret en ny course
export async function createCourse(name, house_id) {
  const result = await pool.query("INSERT INTO courses (name, house_id) VALUES ($1, $2) RETURNING *", [name, house_id]);
  return result.rows[0];
}

// Opdater et course
export async function updateCourse(id, name, house_id) {
  const result = await pool.query("UPDATE courses SET name = $1, house_id = $2 WHERE id = $3 RETURNING *", [name, house_id, id]);
  return result.rows[0] ?? null;
}

// Slet et course
export async function deleteCourse(id) {
  const result = await pool.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id]);
  return result.rows[0] ?? null;
}

// Tilføj en student til et course
export async function addStudentToCourse(course_id, student_id) {
  const result = await pool.query("INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *", [course_id, student_id]);
  return result.rows[0];
}

// Fjern en student fra et course
export async function removeStudentFromCourse(course_id, student_id) {
  const result = await pool.query("DELETE FROM course_students WHERE course_id = $1 AND student_id = $2 RETURNING *", [course_id, student_id]);
  return result.rows[0] ?? null;
}

// Skift lærer for course
export async function changeCourseTeacher(course_id, teacher_id) {
  const result = await pool.query("UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *", [teacher_id, course_id]);
  return result.rows[0] ?? null;
}