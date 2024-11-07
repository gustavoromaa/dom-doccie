import { ProdutoType } from '../../models/produto';
import ModalProduto from '../modal/ModalProduto';
import Produto from './Produto';

import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ['latin'],
});


export default function ContainerProdutos({titulo, cor_principal, sabores}: ProdutoType) {
    return (
        <div className="doces_background" style={{backgroundColor: cor_principal}}>
          <div className="doces_container">

          <h1 className={`doces_titulo ${poppins.className}`}>{titulo}</h1>

          <div className="doces_opcoes_container">
          {sabores.map((produto, index) => (
              <Produto 
                key={index}
                categoria={titulo}
                id={produto.id} 
                nome={produto.nome} 
                descricao={produto.descricao} 
                cor_principal={cor_principal}
                imagem={produto.imagem}
                precoUnitario={produto.precoUnitario}
                alt={`${produto.alt} - ${produto.nome}`}
              />
            ))}
            </div>
          </div>
        </div>
    )
}