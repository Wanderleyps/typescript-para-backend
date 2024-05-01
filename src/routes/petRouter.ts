import express from "express";
import PetController from "../controller/PetController"; // Adjusted import path

const router = express.Router();

const petController = new PetController(); // Instantiate PetController here

router.get("/", petController.listaPets);
router.post("/", petController.criaPet);
router.put("/:id", petController.atualizarPet);
router.delete("/:id", petController.deletarPet);

export default router;
