import Image from "next/image";
import { FaTrashCan } from "react-icons/fa6";
import { Poppins } from "next/font/google";
import { ProdutoCarrinhoType } from "../../models/carrinho";
import ContadorQuantidade from "./ContadorQuantidade";
import { useState, useEffect } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

export default function ItemCarrinho({ item }: { item: ProdutoCarrinhoType }) {
    const [quantidade, setQuantidade] = useState(item.quantidade);
    const [precoTotal, setPrecoTotal] = useState(item.precoTotal);
    const { removerProduto, atualizarCarrinho, produtos } = useCarrinho();

    useEffect(() => {
        setPrecoTotal(item.precoUnitario * quantidade);
    }, [quantidade, item.precoUnitario]);

    useEffect(() => {
        setQuantidade(item.quantidade);
        setPrecoTotal(item.precoTotal);
    }, [produtos]);

    const handleRemoverProduto = () => {
        removerProduto(item.id!);
    }

    return (
        <div className="carrinho_list__products_item">
            <Image
                src={`/produtos/${item.imagem}.png`}
                alt={item.alt}
                width={150}
                height={150}
            />
            <div className="h1p">
                <h1 className={`${poppins.className}`}>{item.categoria}</h1>
                <p className={`${poppins.className}`}><span style={{ fontWeight: '300' }}>{item.nome}</span></p>
            </div>

            <ContadorQuantidade item={item} quantidade={quantidade} setQuantidade={setQuantidade} />

            <p className={`valor ${poppins.className}`}>R$ <span className="carrinho_produto_preco">{precoTotal?.toFixed(2)}</span></p>

            <div className="remove__item">
                <button className="btnRemove_item" onClick={handleRemoverProduto}>
                    <FaTrashCan />
                </button>
            </div>
        </div>
    )
}