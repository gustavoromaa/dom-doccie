import { useState } from "react";
import "./Produto.css";
import Image from "next/image";
import BtnAdicionarCarrinho from "../Botoes/BtnAdicionarCarrinho";
import { SaboresType } from "../../models/sabores";
import { Yrsa, Alata } from 'next/font/google';
import { Poppins } from "next/font/google";
import localFont from 'next/font/local';
import ModalProduto from "../modal/ModalProduto";

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

export default function Produto({ id, categoria, nome, descricao, precoUnitario, cor_principal, imagem, alt }: SaboresType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canOpen, setCanOpen] = useState(true);
  const produto = { id, categoria, nome, descricao, precoUnitario, cor_principal, imagem, alt };

  const handleOpenModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canOpen) {
      event.stopPropagation();
      setIsModalOpen(true);
      setCanOpen(false);
    }
  };

  const handleCloseModal = (event?: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setIsModalOpen(false);
    setTimeout(() => setCanOpen(true), 300);
  };

  return (
    <>
      <div className="card" data-id={produto.id} onClick={handleOpenModal}>
        <Image
          src={`/produtos/${produto.imagem}.png`}
          alt={produto.alt}
          width={150}
          height={150}
          className="card_image"
        />
    
        <div className="doces_details">
          <h1 className={`card_produto_titulo ${sagona.className}`}>{produto.nome}</h1>
          <h2 className={`card_produto_descricao ${poppins.className}`}>{produto.descricao}</h2>
          <h1 className={`card_produto_valor ${poppins.className}`} style={{ color: cor_principal }}>R${produto.precoUnitario.toFixed(2)}</h1>
        </div>
        <div onClick={(event) => event.stopPropagation()} className={`doces_footer ${poppins.className}`}>
          <BtnAdicionarCarrinho produto={produto} onClick={handleCloseModal} mostrarValor={false} />
        </div>
      </div>

      {isModalOpen && canOpen && (
        <ModalProduto
          id={produto.id}
          categoria={produto.categoria}
          nome={produto.nome}
          descricao={produto.descricao}
          precoUnitario={produto.precoUnitario}
          cor_principal={produto.cor_principal}
          imagem={produto.imagem}
          alt={produto.alt}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}