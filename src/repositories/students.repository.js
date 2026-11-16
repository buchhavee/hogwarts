import { pool } from "../db.js";

// Hent alle students
export async function getAllStudents() {
  const result = await pool.query("SELECT * FROM students ORDER BY id");
  return result.rows;
}

// Hent én student ud fra id
export async function getStudentById(id) {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

// Opret en ny student. student er det objekt CreateStudentDTO har godkendt
export async function createStudent(student) {
  const { name, house_id, birthday, school_year } = student;
  const result = await pool.query(
    "INSERT INTO students (name, house_id, birthday, school_year) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, house_id, birthday, school_year]
  );
  return result.rows[0];
}

// Opdater en student. student er det objekt UpdateStudentDTO har godkendt
export async function updateStudent(id, student) {
  const { name, house_id, birthday, school_year } = student;
  const result = await pool.query(
    "UPDATE students SET name = $1, house_id = $2, birthday = $3, school_year = $4 WHERE id = $5 RETURNING *",
    [name, house_id, birthday, school_year, id]
  );
  return result.rows[0] ?? null;
}

// Slet en student
export async function deleteStudent(id) {
  const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);
  return result.rows[0] ?? null;
}
