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
import { AnimatePresence, motion } from 'framer-motion';

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
        <div className="mt-1">
            <Header className='absolute bg-rosa-claro w-full' />
            <div className="carrinho_body flex flex-col min-h-screen bg-gray-100">
                <div className={`carrinho_container mt-28`}>
                    <motion.div
                        className="carrinho_list__products"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={`carrinho_list__products_header ${poppins.className}`}>
                            <div className="texto">
                                <span style={{ fontWeight: '300' }}>Seu Carrinho</span>
                                {nome && <span style={{ fontWeight: '500' }}>, {nome}</span>}!
                            </div>
                        </div>
                        <div className="carrinho_list__products_products">
                            <AnimatePresence>
                                {produtos.map((produto, index) => (
                                    <motion.div
                                        key={produto.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <ItemCarrinho item={produto} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                    <ResumoCompra />
                </div>
            </div>
            <ModalNovoNome isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitNome} />
            <Footer/>
        </div>
    );
}