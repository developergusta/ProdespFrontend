import { Fabricante } from "./Fabricante";

export class Imunobiologico{
    id?: string;
    anoLote?: number;
    nome?: string;
    dataCadastro?: Date;
    fabricante?: Fabricante;
}