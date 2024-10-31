import { toast, Slide } from 'react-toastify';
import { CarrinhoService } from '../../services/CarrinhoService';
import { SaboresType } from '../../models/sabores';
import { ProdutoCarrinhoType } from '../../models/carrinho';
import { ProdutoType } from '../../models/produto';

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
    }

    return (
        <>
            <button onClick={adicionarAoCarrinho} className="add_cart" style={{ backgroundColor: produto.cor_principal }}>Adicionar ao carrinho</button>
        </>
    )
}