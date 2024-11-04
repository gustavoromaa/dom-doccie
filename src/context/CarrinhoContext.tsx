import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProdutoCarrinhoType } from "../models/carrinho";
import { CarrinhoService } from "../services/CarrinhoService";

interface CarrinhoContextType {
    produtos: ProdutoCarrinhoType[];
    valorCarrinho: number;
    quantidadeTotal: number;
    atualizarCarrinho: () => void;
    removerProduto: (id: number) => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [produtos, setProdutos] = useState<ProdutoCarrinhoType[]>([]);
    const [valorCarrinho, setValorCarrinho] = useState(0);
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);

    const carrinhoService = CarrinhoService.getInstance();

    const atualizarCarrinho = () => {
        const produtos = carrinhoService.listarProdutos();
        setProdutos(produtos);
        setValorCarrinho(carrinhoService.getValorCarrinho());
        setQuantidadeTotal(carrinhoService.getQtndTotal());
    };

    const removerProduto = (id: number) => {
        carrinhoService.removerProduto(id);
        atualizarCarrinho();
    }

    useEffect(() => {
        atualizarCarrinho();
    }, []);

    return (
        <CarrinhoContext.Provider value={{ produtos, valorCarrinho, quantidadeTotal, atualizarCarrinho, removerProduto }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error("Não tem um provider de CarrinhoProvider")
    }
    return context;
}