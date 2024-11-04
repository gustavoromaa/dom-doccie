import "../produtos/Produto.css";

import { Slide, toast } from 'react-toastify';
import { ProdutoCarrinhoType } from '../../models/carrinho';
import { SaboresType } from '../../models/sabores';
import { CarrinhoService } from '../../services/CarrinhoService';

export default function BtnAdicionarCarrinho(produto: SaboresType) {

    const adicionarAoCarrinho = () => {
        console.log(produto)
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

        CarrinhoService.getInstance().adicionarProduto(produtoCarrinho);

    }

    return (
        <>
            <button onClick={adicionarAoCarrinho} className="add_cart" style={{ backgroundColor: produto.cor_principal}}>Adicionar ao carrinho</button>
        </>
    )
}