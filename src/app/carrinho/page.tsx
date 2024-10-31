'use client'

import './carrinho.css';

import { CarrinhoService } from '../../services/CarrinhoService';
import { useEffect } from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

export default function Carrinho() {
    useEffect(() => {
        const carrinho = CarrinhoService.getInstance();
        console.log('Carrinho:', carrinho.listarProdutos());
    }, []);

    return (
        <div>
            <div className="carrinho_body">
                <Header backgroundColor="var(--rosa-claro)"/>
                <div className="carrinho_container">
                    <div className="carrinho_list__products"></div>
                    <div className="carrinho_summary">
                        <div className="carrinho_cart__summary"></div>
                        <div className="carrinho_delivery"></div>
                    </div>
                </div>
            </div>
        <Footer/>
        </div>
    );
}