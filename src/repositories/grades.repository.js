import { pool } from "../db.js";

// Grades kan kun læses – der er ingen INSERT, UPDATE eller DELETE

// Hent alle grades
export async function getAllGrades() {
  const result = await pool.query("SELECT * FROM grades");
  return result.rows;
}

// Hent én grade ud fra bogstavet, fx "O"
export async function getGradeByLetter(letter) {
  const result = await pool.query("SELECT * FROM grades WHERE letter = $1", [letter]);
  return result.rows[0] ?? null;
}
