import "../produtos/Produto.css";
import { Slide, toast } from 'react-toastify';
import { ProdutoCarrinhoType } from '../../models/carrinho';
import { SaboresType } from '../../models/sabores';
import { CarrinhoService } from '../../services/CarrinhoService';
import ContadorQuantidade from "../carrinho/ContadorQuantidade";
import { useState } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";

export default function BtnAdicionarCarrinho({ produto, quantidade = 1, mostrarValor, onClick }: { produto: SaboresType, quantidade?: number, mostrarValor: boolean, onClick?: () => void }) {

    const [quantidadeAtual, setQuantidade] = useState(quantidade || 1);
    
    const adicionarAoCarrinho = () => {
        if (onClick) {
            onClick();
        }

        toast.success('Produto adicionado com sucesso!', {
            position: "top-right",
            autoClose: 1000,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });

        const produtoCarrinho: ProdutoCarrinhoType = {
            ...produto,
            precoTotal: produto.precoUnitario,
            quantidade: 1,
        }

        CarrinhoService.getInstance().adicionarProduto(produtoCarrinho, quantidade);
    }

    return (
        <div>
            {mostrarValor ? (
                <button className="add_cart flex flex-row gap-6" style={{backgroundColor: produto.cor_principal}} onClick={adicionarAoCarrinho}>
                    <p>Adicionar ao carrinho</p>
                    <p className="hidden sm:block">R${(produto.precoUnitario * quantidade).toFixed(2)}</p>
                </button>
            ) : (
                <button onClick={adicionarAoCarrinho} className="add_cart" style={{ backgroundColor: produto.cor_principal }}>
                    Adicionar ao carrinho
                </button>
            )}
        </div>
    )
}