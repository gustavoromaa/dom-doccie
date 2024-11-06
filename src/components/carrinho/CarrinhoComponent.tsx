'use client'

import './carrinho.css'

import { useState, useEffect } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";
import { CarrinhoService } from "../../services/CarrinhoService";
import ItemCarrinho from "./ItemCarrinho";
import ResumoCompra from "./ResumoCompra";
import Footer from "../footer/Footer";
import Header from "../header/Header";

import { Poppins } from "next/font/google";
import ModalNovoNome from '../modal/ModalNovoNome';

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

export default function CarrinhoComponent() {
    const { produtos, valorCarrinho, quantidadeTotal, atualizarCarrinho } = useCarrinho();
    const [hasSummary, setHasSummary] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nome, setNome] = useState('');

    const carrinho = CarrinhoService.getInstance();

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmitNome = (nome: string) => {
        localStorage.setItem('nome', nome);
        setNome(nome);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const storedNome = localStorage.getItem('nome');
        if (storedNome) {
            setNome(storedNome);
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    }, []);

    return (
        <div>
            <div className="carrinho_body">

                <div className={`carrinho_container ${!hasSummary ? 'full-width' : ''}`}>

                    <div className="carrinho_list__products">

                        <div className={`carrinho_list__products_header ${poppins.className}`}>
                        <span style={{ fontWeight: '300' }}>Seu Carrinho</span>
                        {nome && <span style={{ fontWeight: '500' }}>, {nome}</span>}
                        </div>

                        <div className="carrinho_list__products_products">
                            {
                                produtos.map((produto, index) => (
                                    <ItemCarrinho key={index} item={produto} />
                                ))
                            }
                        </div>

                    </div>
                        <ResumoCompra />
                </div>
            </div>
            <ModalNovoNome isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitNome} />
        </div>
    );
}