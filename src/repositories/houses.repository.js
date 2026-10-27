import { pool } from "../db.js";

// Hent alle houses
export async function getAllHouses() {
  const result = await pool.query("SELECT * FROM houses");
  return result.rows;
}

// Hent ét house ud fra id
export async function getHouseById(id) {
  const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}
