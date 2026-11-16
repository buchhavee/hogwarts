import { pool } from "../db.js";

// Hent alle courses
export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM courses ORDER BY id");
  return result.rows;
}

// Hent ét course ud fra id
export async function getCourseById(id) {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

// Opret et nyt course. course er det objekt CreateCourseDTO har godkendt
export async function createCourse(course) {
  const { name, teacher_id, type, level, school_year } = course;
  const result = await pool.query(
    "INSERT INTO courses (name, teacher_id, type, level, school_year) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, teacher_id, type, level, school_year]
  );
  return result.rows[0];
}

// Opdater et course. course er det objekt UpdateCourseDTO har godkendt
export async function updateCourse(id, course) {
  const { name, teacher_id, type, level, school_year } = course;
  const result = await pool.query(
    "UPDATE courses SET name = $1, teacher_id = $2, type = $3, level = $4, school_year = $5 WHERE id = $6 RETURNING *",
    [name, teacher_id, type, level, school_year, id]
  );
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
