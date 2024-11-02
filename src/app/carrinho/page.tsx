'use client'

import './carrinho.css';

import { CarrinhoService } from '../../services/CarrinhoService';
import { useEffect, useState } from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Image from "next/image";
import item from "/public/produtos/bp_teste.png"

import { FaTrashCan } from "react-icons/fa6";

import { Poppins } from "next/font/google";
import ItemCarrinho from '../../components/carrinho/ItemCarrinho';

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

export default function Carrinho() {
    const [hasSummary, setHasSummary] = useState(true);

    useEffect(() => {
        const carrinho = CarrinhoService.getInstance();
        console.log('Carrinho:', carrinho.listarProdutos());
        // setHasSummary();
    }, []);

    console.log('hasSummary:', hasSummary);

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
                                CarrinhoService.getInstance().listarProdutos().map((produto, index) => (
                                    <ItemCarrinho key={index} item={produto} />
                                ))
                            }
                        </div>


                    </div>
                    {hasSummary && (
                        <div className="carrinho_summary">
                            <div className="carrinho_cart__summary">
                                <div className="header_carrinho_summary">
                                    <h1>Resumo da Compra</h1>
                                </div>
                                <div className="items__summary">
                                    <p>Quantidade de itens</p>
                                    <p>Forma de recebimento</p>
                                </div>
                                <div className="total">
                                    <h1>Total R$ 104.95</h1>
                                </div>
                            </div>

                            <div className="carrinho_delivery"></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}