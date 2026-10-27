import { pool } from "../db.js";

// Hent alle teachers
export async function getAllTeachers() {
  const result = await pool.query("SELECT * FROM teachers");
  return result.rows;
}

// Hent én teacher ud fra id
export async function getTeacherById(id) {
  const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

// Opret en ny teacher
export async function createTeacher(name, house_id) {
  const result = await pool.query("INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *", [name, house_id]);
  return result.rows[0];
}

// Opdater en teacher
export async function updateTeacher(id, name, house_id) {
  const result = await pool.query("UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *", [name, house_id, id]);
  return result.rows[0] ?? null;
}

// Slet en teacher
export async function deleteTeacher(id) {
  const result = await pool.query("DELETE FROM teachers WHERE id = $1 RETURNING *", [id]);
  return result.rows[0] ?? null;
}
