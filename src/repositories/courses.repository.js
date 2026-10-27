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
