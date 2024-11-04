'use client'

import CarrinhoComponent from '../../components/carrinho/CarrinhoComponent';
import CarrinhoVazioComponent from '../../components/carrinho/CarrinhoVazioComponent';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { CarrinhoProvider, useCarrinho } from '../../context/CarrinhoContext';
import { useEffect, useState } from 'react';

function CarrinhoPageContent() {
    const { produtos } = useCarrinho();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [produtos]);

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return produtos.length > 0 ? <CarrinhoComponent /> : <CarrinhoVazioComponent/>;
}

export default function Carrinho() {
    return (
        <CarrinhoProvider>
            <Header backgroundColor="var(--rosa-claro)" />
            <CarrinhoPageContent />
            <Footer/>
        </CarrinhoProvider>
    );
}