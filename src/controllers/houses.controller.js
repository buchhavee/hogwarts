import { getAllHouses, getHouseById } from "../repositories/houses.repository.js";

export const getHouses = async (req, res) => {
  const houses = await getAllHouses();
  res.status(200).json(houses);
};

export const getHouse = async (req, res) => {
  const house = await getHouseById(req.params.id);
  if (house) {
    res.status(200).json(house);
  } else {
    res.status(404).json({ message: "House not found" });
  }
};
