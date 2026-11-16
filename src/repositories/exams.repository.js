import { pool } from "../db.js";

// Hent alle exams
export async function getAllExams() {
  const result = await pool.query("SELECT * FROM exams ORDER BY id");
  return result.rows;
}

// Hent én exam ud fra id
export async function getExamById(id) {
  const result = await pool.query("SELECT * FROM exams WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

// Opret en ny exam. exam er det objekt CreateExamDTO har godkendt
export async function createExam(exam) {
  const { course_id, student_id, grade } = exam;
  const result = await pool.query("INSERT INTO exams (course_id, student_id, grade) VALUES ($1, $2, $3) RETURNING *", [course_id, student_id, grade]);
  return result.rows[0];
}

// Opdater en exam. exam er det objekt UpdateExamDTO har godkendt
export async function updateExam(id, exam) {
  const { course_id, student_id, grade } = exam;
  const result = await pool.query("UPDATE exams SET course_id = $1, student_id = $2, grade = $3 WHERE id = $4 RETURNING *", [course_id, student_id, grade, id]);
  return result.rows[0] ?? null;
}

// Slet en exam
export async function deleteExam(id) {
  const result = await pool.query("DELETE FROM exams WHERE id = $1 RETURNING *", [id]);
  return result.rows[0] ?? null;
}
