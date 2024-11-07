import { Poppins } from "next/font/google";
import { useCarrinho } from "../../context/CarrinhoContext";
import BtnEnviarPedido from "../Botoes/BtnEnviarPedido";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

export default function ResumoCompra() {

    const { valorCarrinho, quantidadeTotal } = useCarrinho();

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
                            {
                                quantidadeTotal >= 1 ? (
                                    <p>
                                        {quantidadeTotal} {quantidadeTotal === 1 ? 'item' : 'itens'}
                                    </p>
                                ) : (
                                    <p>0 itens</p>
                                )
                            }
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
                        <BtnEnviarPedido />
                    </div>
                </div>

            </div>

            <div className={`carrinho_delivery ${poppins.className}`} style={{ fontWeight: 300 }}>

                <div className={`header_carrinho_delivery`} >
                    <h1>Forma de Recebimento</h1>
                </div>

                <div className="container_opcoes">
                    <div className="delivery">

                        <div className="header_icons">
                            <div className="moto">
                                <MdOutlineDeliveryDining />
                            </div>

                            <div className="checkbox">
                                <div className="checkbox_border">
                                    <div className="checkbox_fill">
                                        {/* .aa */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h1popcoes">
                            <h1>Delivery</h1>
                            <p>A entrega será realizada por meio de um aplicativo de entrega.</p>
                        </div>

                    </div>

                    <div className="retirada">

                        <div className="casa">
                            <RiMapPin2Line />
                        </div>

                        <div className="h1popcoes">
                            <h1>Retirada</h1>
                            <p>A entrega será realizada por meio de um aplicativo de entrega.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}