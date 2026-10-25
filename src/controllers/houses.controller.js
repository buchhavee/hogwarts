import { getAllHouses, getHouseById } from "../repositories/houses.repository.js";

export const getHouses = async (req, res) => {
  try {
    const houses = await getAllHouses();
    res.status(200).json(houses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const getHouse = async (req, res) => {
  try {
    const house = await getHouseById(req.params.id);
    if (!house) return res.sendStatus(404);
    res.status(200).json(house);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
};
