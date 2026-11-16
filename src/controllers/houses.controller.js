import * as housesRepository from "../repositories/houses.repository.js";
import { HTTPError } from "../errors/HTTPError.js";

export async function getHouses(req, res) {
  const houses = await housesRepository.getAllHouses();
  res.status(200).json(houses);
}

export async function getHouse(req, res) {
  const id = req.params.id;
  const house = await housesRepository.getHouseById(id);
  if (!house) throw new HTTPError(404, "House not found");
  res.status(200).json(house);
}
