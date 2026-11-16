import { pool } from "../db.js";

// Hent alle teachers
export async function getAllTeachers() {
  const result = await pool.query("SELECT * FROM teachers ORDER BY id");
  return result.rows;
}

// Hent én teacher ud fra id
export async function getTeacherById(id) {
  const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

// Opret en ny teacher. teacher er det objekt CreateTeacherDTO har godkendt
export async function createTeacher(teacher) {
  const { name, house_id, employment_start, currently_active, deceased } = teacher;
  const result = await pool.query(
    `INSERT INTO teachers (name, house_id, employment_start, currently_active, deceased)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, house_id, employment_start, currently_active, deceased]
  );
  return result.rows[0];
}

// Opdater en teacher. teacher er det objekt UpdateTeacherDTO har godkendt
export async function updateTeacher(id, teacher) {
  const { name, house_id, employment_start, currently_active, deceased } = teacher;
  const result = await pool.query(
    `UPDATE teachers SET name = $1, house_id = $2, employment_start = $3, currently_active = $4, deceased = $5
     WHERE id = $6 RETURNING *`,
    [name, house_id, employment_start, currently_active, deceased, id]
  );
  return result.rows[0] ?? null;
}

// Slet en teacher
export async function deleteTeacher(id) {
  const result = await pool.query("DELETE FROM teachers WHERE id = $1 RETURNING *", [id]);
  return result.rows[0] ?? null;
}
