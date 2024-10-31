import { SaboresType } from "./sabores";

export interface ProdutoType {
    titulo: string;
    cor_principal: string;
    sabores: SaboresType[];
}