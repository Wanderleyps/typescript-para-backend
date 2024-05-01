import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/enumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: Array<TipoPet> = [];

export default class PetController {
  constructor(private repository: PetRepository) {}

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json(listaDePets);
  }

  criaPet(req: Request, res: Response) {
    const { adotado, especie, dataNascimento, nome } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ error: "Especie inválida" });
    }

    const novoPet = new PetEntity(nome, especie, dataNascimento, adotado);
    this.repository.criaPet(novoPet);

    return res.status(201).json(novoPet);
  }

  async atualizarPet(req: Request, res: Response) {
    const { id } = req.params;
    const { especie } = <TipoPet>req.body;
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(404).json({ erro: "Espécie inválida" });
    }

    const { success, message } = await this.repository.atualizaPet(
        Number(id),
        req.body as PetEntity
      );
  
      if (!success) {
        return res.status(404).json({ message });
      }
      return res.sendStatus(204);// no content
  }

  async deletarPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

}
