'use client';

import { Poppins } from "next/font/google";
import { useCarrinho } from "../../context/CarrinhoContext";
import BtnEnviarPedido from "../Botoes/BtnEnviarPedido";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import TipoEntrega from "./tipoEntrega";
import { motion, AnimatePresence } from 'framer-motion';
import EnviarEndereco from "./EnviarEndereco";

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

export default function ResumoCompra() {

    const [tipoEntrega, setTipoEntrega] = useState('');
    const [possivelEnviarPedido, setpossivelEnviarPedido] = useState(false);
    const [endereco, setEndereco] = useState('');

    const { valorCarrinho, quantidadeTotal } = useCarrinho();

    function definirTipoEntrega(tipo: string) {
        localStorage.setItem('tipoEntrega', tipo);

        if (tipo === 'Retirada') {
            setpossivelEnviarPedido(true);
        } else {
            setpossivelEnviarPedido(false);
        }

        setTipoEntrega(tipo);
    }

    const handleAddressComplete = (isComplete: boolean) => {
        setpossivelEnviarPedido(isComplete);
    };

    useEffect(() => {
        setTipoEntrega(localStorage.getItem('tipoEntrega') || 'Entrega');
    }, []);

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
                                    <motion.p
                                        key={quantidadeTotal}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {quantidadeTotal} {quantidadeTotal === 1 ? 'item' : 'itens'}
                                    </motion.p>
                                ) : (
                                    <motion.p
                                        key={quantidadeTotal}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        0 itens
                                    </motion.p>
                                )
                            }
                        </div>
                        <div className="formRece">
                            <p>Forma de recebimento</p>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={tipoEntrega}
                                    style={{ fontWeight: 400 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {tipoEntrega}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="total">
                        <h1>Total R$ {valorCarrinho.toFixed(2)}</h1>
                    </div>

                    <BtnEnviarPedido endereco={endereco} canClick={possivelEnviarPedido} />
                </div>

            </div>

            <div className={`carrinho_delivery ${poppins.className}`} style={{ fontWeight: 300 }}>

                <div className={`header_carrinho_delivery`} >
                    <h1>Forma de Recebimento</h1>
                </div>

                <div className="container_opcoes">
                    <TipoEntrega icone={<MdOutlineDeliveryDining />} titulo="Entrega" descricao="A entrega será realizada por meio de um aplicativo de entrega." ativo={tipoEntrega === "Entrega"} onClick={() => definirTipoEntrega("Entrega")} />
                    <TipoEntrega icone={<RiMapPin2Line />} titulo="Retirada" descricao="A entrega será realizada por meio de um local de retirada definido." ativo={tipoEntrega === "Retirada"} onClick={() => definirTipoEntrega("Retirada")} />
                </div>
            </div>
            {
                tipoEntrega === 'Entrega' && <EnviarEndereco onAddressComplete={handleAddressComplete} setEndereco={setEndereco} />
            }
        </div>
    )
}