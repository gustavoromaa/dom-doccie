import { Alata } from 'next/font/google'
import Produto from './Produto'
import cardapio from "./../../../cardapio.json"
import { ProdutoType } from '../../models/produto';


const alata = Alata({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
  })

export default function ContainerProdutos({titulo, cor_principal, sabores}: ProdutoType) {
    return (
        <div className="bolo_no_pote" style={{backgroundColor: cor_principal}}>

          <h1 className={`bonopote ${alata.className}`}>{titulo}</h1>

          <div className="doces_container">
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
    )
}