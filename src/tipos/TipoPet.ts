import EnumEspecie from "../enum/enumEspecie";

type TipoPet = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    adotado: boolean;
    dataNascimento: Date;
}

export default TipoPet;