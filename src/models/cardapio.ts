import { SaboresType } from "./sabores";

export interface CardapioType {
    produtos: {
        [key: string]: SaboresType;
    }
}