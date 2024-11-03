'use client'

import './carrinho.css'

import { useState } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";
import { CarrinhoService } from "../../services/CarrinhoService";
import ItemCarrinho from "./ItemCarrinho";
import ResumoCompra from "./ResumoCompra";
import Footer from "../footer/Footer";
import Header from "../header/Header";

import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

export default function CarrinhoComponent() {
    const { produtos, valorCarrinho, quantidadeTotal, atualizarCarrinho } = useCarrinho();
    const [hasSummary, setHasSummary] = useState(true);

    const carrinho = CarrinhoService.getInstance();

    // useEffect(() => {
    //     const carrinho = CarrinhoService.getInstance();
    //     console.log('Carrinho:', carrinho.listarProdutos());
    //     // setHasSummary();
    // }, []);

    // console.log('hasSummary:', hasSummary);

    return (
        <div>
            <div className="carrinho_body">

                <Header backgroundColor="var(--rosa-claro)" />

                <div className={`carrinho_container ${!hasSummary ? 'full-width' : ''}`}>

                    <div className="carrinho_list__products">

                        <div className={`carrinho_list__products_header ${poppins.className}`}>
                           <span style={{ fontWeight: '300' }}>Seu Carrinho</span>, <span style={{ fontWeight: '500' }}>Binana!</span>
                        </div>

                        <div className="carrinho_list__products_products">
                            {
                                produtos.map((produto, index) => (
                                    <ItemCarrinho key={index} item={produto} />
                                ))
                            }
                        </div>

                    </div>
                    {hasSummary && (
                        <ResumoCompra />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}