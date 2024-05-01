import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/enumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: Array<TipoPet> = [];
let id = 0;

function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
  constructor(private repository: PetRepository) {}

  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  criaPet(req: Request, res: Response) {
    const { adotado, especie, dataNascimento, nome } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ error: "Especie inválida" });
    }

    const novoPet = new PetEntity();
    novoPet.id = geraId();
    novoPet.adotado = adotado;
    novoPet.especie = especie;
    novoPet.dataNascimento = dataNascimento;
    novoPet.nome = nome;
    this.repository.criaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  atualizarPet(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, especie, adotado, dataNascimento } = <TipoPet>req.body;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(404).json({ erro: "Espécie inválida" });
    }
    pet.nome = nome;
    pet.dataNascimento = dataNascimento;
    pet.especie = especie;
    pet.adotado = adotado;
    return res.status(200).json(pet);
  }

  deletarPet(req: Request, res: Response) {
    //const { id } = <TipoPet>req.body;
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }
    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);
    return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
  }
}
