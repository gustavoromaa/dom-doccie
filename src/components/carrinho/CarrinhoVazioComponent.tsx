'use client'

import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

export default function CarrinhoVazioComponent() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header className='bg-rosa-claro w-full'/>
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="flex flex-col items-center justify-center w-full max-w-4xl bg-white rounded-lg shadow-md p-10">
                    <div className="text-center mb-5">
                        <div className={`text-2xl mb-5 ${poppins.className}`}>
                            <span className="font-light">Seu carrinho está vazio &#x1F641;</span>
                        </div>
                        <div className="text-lg text-gray-600 mb-5">
                            <p className={`${poppins.className} font-light`}>Clique <span className="text-[#F9AAC0] font-bold">abaixo</span> para adicionar produtos ao carrinho</p>
                        </div>
                        <Link href="/#opcoes">
                            <button className="bg-[#F9AAC0] text-white py-2 px-4 rounded-lg shadow-md hover:transform hover:scale-105 transition duration-300 ease-in-out">
                                Iniciar Pedido
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer className='w-full'/>
        </div>
    );
}