import { getAllHouses, getHouseById } from "../repositories/houses.repository.js";

export async function getHouses(req, res) {
  try {
    const houses = await getAllHouses();
    res.status(200).json(houses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function getHouse(req, res) {
  try {
    const house = await getHouseById(req.params.id);
    res.status(200).json(house);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
}
