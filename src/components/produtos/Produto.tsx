import "./Produto.css";

import Image from "next/image";
import BtnAdicionarCarrinho from "../Botoes/BtnAdicionarCarrinho";
import { SaboresType } from "../../models/sabores";
import { Yrsa, Alata } from 'next/font/google';
import { Poppins } from "next/font/google";
import localFont from 'next/font/local';

const sagona = localFont({
  src: [
    {
      path: '../../app/fonts/SAGONABOOK.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

const schibstedGrotesk = Yrsa({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const alata = Alata({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function Produto({ id, categoria, nome, descricao, precoUnitario, cor_principal, imagem, alt}: SaboresType) {
  const produto = { id, categoria, nome, descricao, precoUnitario, cor_principal, imagem, alt };

  return (
    <div className="card" data-id={produto.id}>
      <Image
        src={`/produtos/${produto.imagem}.png`}
        alt={produto.alt}
        width={150}
        height={150}
        className="card_image"
      />

      <div className="doces_details">
        <h1 className={`titulo ${sagona.className}`}>{produto.nome}</h1>
        <h2 className={`card_produto_descricao ${poppins.className}`}>{produto.descricao}</h2>
        <h1 className={`card_produto_valor ${poppins.className}`}>R${produto.precoUnitario}</h1>
      </div>

      <div className={`${poppins.className}`}><BtnAdicionarCarrinho {...produto} /></div>
    </div>
  );
}