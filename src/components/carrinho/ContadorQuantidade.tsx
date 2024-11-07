import { ProdutoCarrinhoType } from "../../models/carrinho";
import { Poppins } from "next/font/google";
import { CarrinhoService } from "../../services/CarrinhoService";
import { useCarrinho } from "../../context/CarrinhoContext";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";

const poppins = Poppins({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
});

export default function ContadorQuantidade({ item, quantidade, setQuantidade }: { item: ProdutoCarrinhoType, quantidade: number, setQuantidade: (quantidade: number) => void }) {

  const { atualizarCarrinho } = useCarrinho();
  const [isAnimating, setIsAnimating] = useState(false);

  function incrementar() {
    if (!isAnimating) {
      const novaQuantidade = quantidade + 1;
      setQuantidade(novaQuantidade);
      CarrinhoService.getInstance().atualizarQuantidade(item.id, novaQuantidade);
      atualizarCarrinho();
    }
  }

  function decrementar() {
    if (quantidade > 1 && !isAnimating) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade);
      CarrinhoService.getInstance().atualizarQuantidade(item.id, novaQuantidade);
      atualizarCarrinho();
    }
  }

  return (
    <div className="containerContador">
      <div className="contador">
        <button onClick={decrementar} className={`menos ${poppins.className}`} disabled={isAnimating}>-</button>
        <AnimatePresence mode="wait">
          <motion.p
            key={quantidade}
            className={`${poppins.className}`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <span style={{ fontWeight: '300' }}>{quantidade}</span>
          </motion.p>
        </AnimatePresence>
        <button onClick={incrementar} className={`mais ${poppins.className}`} disabled={isAnimating}>+</button>
      </div>
    </div>
  );
}