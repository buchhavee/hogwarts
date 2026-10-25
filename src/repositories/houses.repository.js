import pool from "../db.js";

// Hent alle houses
export const getAllHouses = async () => {
  const result = await pool.query("SELECT * FROM houses");
  return result.rows;
};

// Hent ét house ud fra id
export const getHouseById = async (id) => {
  const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
  return result.rows[0] ?? null;
};
