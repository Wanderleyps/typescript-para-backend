import express from "express";
import PetController from "../controller/PetController"; // Adjusted import path
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const petRepository = new PetRepository(AppDataSource.getRepository("PetEntity"));
const petController = new PetController(petRepository); // Instantiate PetController here

// maneira alternativa
// router.post("/", petController.criaPet.bind(petController));
router.post("/", (req, res) => petController.criaPet(req, res));
router.get("/", (req, res) => petController.listaPets(req, res));
router.put("/:id", (req, res) => petController.atualizarPet(req, res));
router.delete("/:id", (req, res) => petController.deletarPet(req, res));

export default router;
