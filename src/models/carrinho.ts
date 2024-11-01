import { SaboresType } from "./sabores";

export interface ProdutoCarrinhoType extends SaboresType {
    quantidade: number;
    precoTotal?: number;
}

export interface CarrinhoType {
    produtos: ProdutoCarrinhoType[];
    valorCarrinho: number;
    quantidadeTotal: number;
}