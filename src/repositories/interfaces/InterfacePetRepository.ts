import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {

    criaPet(pet: PetEntity): void;
    
    // Pode ser uma lista diretamente ou uma Promise que contém a lista.
    listaPet(): Array<PetEntity> | Promise<PetEntity[]>; 

    atualizaPet(
        id: number,
        pet: PetEntity
      ): Promise<{ success: boolean; message?: string }> | void;

    deletaPet(id: number): Promise<{ success: boolean; message?: string }> | void;
}
