import express from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";

const router = express.Router();

const adotanteRepository = new AdotanteRepository(
    AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);

router.post("/",
 (req, res) => adotanteController.criaAdotante(req, res)
); // Rota para criar um adotante

export default router;