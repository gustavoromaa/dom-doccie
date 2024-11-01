'use client'

import './carrinho.css';

import { CarrinhoService } from '../../services/CarrinhoService';
import { useEffect, useState } from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Image from "next/image";
import item from "/public/produtos/bp_kitkat.png"

import { FaTrashCan } from "react-icons/fa6";

import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ['300', '500'],
    subsets: ['latin'],
});

export default function Carrinho() {
    const [hasSummary, setHasSummary] = useState(false);

    useEffect(() => {
        const carrinho = CarrinhoService.getInstance();
        console.log('Carrinho:', carrinho.listarProdutos());
        setHasSummary(true);
    }, []);

    console.log('hasSummary:', hasSummary);

    return (
        <div>
            <div className="carrinho_body">
                <Header backgroundColor="var(--rosa-claro)" />
                <div className={`carrinho_container ${!hasSummary ? 'full-width' : ''}`}>
                    <div className="carrinho_list__products">
                        <div className={`carrinho_list__products_header ${poppins.className}`}>
                            <span style={{ fontWeight: '300' }}>Seu Carrinho</span>, <span style={{ fontWeight: '500' }}>Binana</span>
                        </div>

                        <div className="carrinho_list__products_product">
                            <Image
                                src={item}
                                alt='Produto'
                            />
                            <div className="h1p">
                                <h1 className={`${poppins.className}`}>Bolo no pote</h1>
                                <p className={`${poppins.className}`}>Kit kat</p>
                            </div>

                            <div className="contador">
                                <button className={`menos ${poppins.className}`}>-</button>
                                <p className={`${poppins.className}`}>2</p>
                                <button className={`mais ${poppins.className}`}>+</button>
                            </div>

                            <p className={`${poppins.className}`}>R$ 15,00</p>

                            <div className="remove__item">
                                <button className="btnRemove_item">
                                    <FaTrashCan/>
                                </button>
                            </div>
                        </div>

                    </div>
                    {hasSummary && (
                        <div className="carrinho_summary">
                            <div className="carrinho_cart__summary"></div>
                            <div className="carrinho_delivery"></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}