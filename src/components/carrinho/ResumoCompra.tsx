import { Poppins } from "next/font/google";
import { useCarrinho } from "../../context/CarrinhoContext";
import { CarrinhoService } from "../../services/CarrinhoService";
import BtnEnviarPedido from "../Botoes/BtnEnviarPedido";

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

export default function ResumoCompra() {

    const { valorCarrinho, quantidadeTotal } = useCarrinho();

    const carrinho = CarrinhoService.getInstance();

    return (
        <div className="carrinho_summary">

            <div className={`carrinho_cart__summary ${poppins.className}`} style={{ fontWeight: 300 }}>

                <div className={`header_carrinho_summary`} >
                    <h1>Resumo da Compra</h1>
                </div>
                <div className="bodyteste">
                    <div className="items__summary">
                        <div className="qtndItem">
                            <p>Quantidade de itens</p>
                            <p>{quantidadeTotal} itens</p>
                        </div>
                        <div className="formRece">
                            <p>Forma de recebimento</p>
                            <p style={{ fontWeight: 400 }}>Entrega</p>
                        </div>
                    </div>

                    <div className="total">
                        <h1>Total R$ {valorCarrinho.toFixed(2)}</h1>
                    </div>

                    <div className="btnSend">
                        <BtnEnviarPedido/>
                    </div>
                </div>

            </div>

            <div className="carrinho_delivery"></div>
        </div>
    )
}