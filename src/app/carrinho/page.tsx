'use client'

import CarrinhoComponent from '../../components/carrinho/CarrinhoComponent';
import { CarrinhoProvider } from '../../context/CarrinhoContext';

export default function Carrinho() {
    return (
        <CarrinhoProvider>
            <CarrinhoComponent/>
        </CarrinhoProvider>

    )
}