import express from "express";
import { getHouses, getHouse } from "../controllers/houses.controller.js";

const router = express.Router();

router.get("/", getHouses);
router.get("/:id", getHouse);

export default router;
