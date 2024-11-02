import { useState } from "react";
import { ProdutoCarrinhoType } from "../../models/carrinho";
import { Poppins } from "next/font/google";
import { CarrinhoService } from "../../services/CarrinhoService";

const poppins = Poppins({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
});

export default function ContadorQuantidade({ item, quantidade, setQuantidade }: { item: ProdutoCarrinhoType, quantidade: number, setQuantidade: (quantidade: number) => void }) {

  function incrementar() {
    const novaQuantidade = quantidade + 1;
    setQuantidade(novaQuantidade);
    CarrinhoService.getInstance().atualizarQuantidade(item.id, novaQuantidade);
  }

  function decrementar() {
    if (quantidade > 1) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade);
      CarrinhoService.getInstance().atualizarQuantidade(item.id, novaQuantidade);
    }
  }

  return (
    <div className="containerContador">
      <div className="contador">
        <button onClick={decrementar} className={`menos ${poppins.className}`}>-</button>
        <p className={`${poppins.className}`}><span style={{ fontWeight: '300' }}>{quantidade}</span></p>
        <button onClick={incrementar} className={`mais ${poppins.className}`}>+</button>
      </div>
    </div>
  );
}