import pool from "../db.js";

// Hent alle courses
export const getAllCourses = async () => {
  const result = await pool.query("SELECT * FROM courses");
  return result.rows;
};

// Hent ét course ud fra id
export const getCourseById = async (id) => {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
  return result.rows[0] ?? null;
};
