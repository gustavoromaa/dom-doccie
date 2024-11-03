import "./Produtos.css"

import ContainerProdutos from "./ContainerProduto"
import cardapio from "../../../cardapio.json"
import { ProdutoType } from "../../models/produto";

import Image from "next/image";
import brownie from "/public/produtos/brownie.webp"
import boloNoPote from "/public/bolonopote.jpg"

import { WindSong } from 'next/font/google'
import { Poppins } from "next/font/google";

const windSong = WindSong({
    weight: '400',
    subsets: ['latin'],
})

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})

export default function Produtos() {

    const produtos = cardapio.produtos;

    const handleImageClick = (index: number) => {
        const container = document.getElementById(`produto-${index}`);
        if (container) {
            container.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const containerRect = container.getBoundingClientRect();
                window.scrollBy(0, containerRect.top - -10);
            });
        }
    };

    return (
        <div>
            <div className="nossos_doces_separator_container">
            </div>
            <div className="nossos_doces_opcoes_container">
                <h1 className={`${windSong.className}`}>Nossos Doces</h1>

                <div className="nossos_doces_opcoes">
                    {Object.keys(produtos).map((key, index) => (
                        <div className="nossos_doces_item">
                            <Image
                                key={index}
                                className="nossos_doces_img"
                                src={boloNoPote}
                                alt={produtos[key].titulo}
                                onClick={() => handleImageClick(index)}
                                style={{ boxShadow: `9px 3px 0 -2px ${produtos[key].cor_principal}` }}
                            />
                            

                            <p className={`nossos_doces_p ${poppins.className}`}>{produtos[key].titulo}</p>
                        </div>
                    ))}
                </div>
            </div>

            {Object.keys(produtos).map((key, index) => {
                const produto = produtos[key] as ProdutoType;
                return (
                    <div id={`produto-${index}`} key={index}>
                        <ContainerProdutos
                            key={index}
                            titulo={produto.titulo}
                            sabores={produto.sabores}
                            cor_principal={produto.cor_principal}
                        />
                    </div>
                );
            })}
        </div>
    )
}