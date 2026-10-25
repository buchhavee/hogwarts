import pool from "../db.js";

// Hent alle students
export const getAllStudents = async () => {
  const result = await pool.query("SELECT * FROM students");
  return result.rows;
};

// Hent én student ud fra id
export const getStudentById = async (id) => {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  return result.rows[0] ?? null;
};

// Opret en ny student
export const createStudent = async (name, house_id) => {
  const result = await pool.query("INSERT INTO students (name, house_id) VALUES ($1, $2) RETURNING *", [name, house_id]);
  return result.rows[0];
};

// Opdater en student
export const updateStudent = async (id, name, house_id) => {
  const result = await pool.query("UPDATE students SET name = $1, house_id = $2 WHERE id = $3 RETURNING *", [name, house_id, id]);
  return result.rows[0] ?? null;
};

// Slet en student
export const deleteStudent = async (id) => {
  const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);
  return result.rows[0] ?? null;
};
