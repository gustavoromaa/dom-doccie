import { CarrinhoType, ProdutoCarrinhoType } from "../models/carrinho";
import { SaboresType } from "../models/sabores";

const CARRINHO_STORAGE_KEY = 'carrinho';

export class CarrinhoService {
    private carrinho: CarrinhoType;
    private static instance: CarrinhoService;
  
    private constructor() {
      this.carrinho = this.carregarCarrinho();
    }
  
    public static getInstance(): CarrinhoService {
      if (!CarrinhoService.instance) {
        CarrinhoService.instance = new CarrinhoService();
      }
      return CarrinhoService.instance;
    }
  
    private salvarCarrinho(): void {
      localStorage.setItem(CARRINHO_STORAGE_KEY, JSON.stringify(this.carrinho));
    }
  
    private carregarCarrinho(): CarrinhoType {
      const carrinhoJson = localStorage.getItem(CARRINHO_STORAGE_KEY);
      return carrinhoJson ? JSON.parse(carrinhoJson) : { produtos: [] };
    }
  
    adicionarProduto(produto: ProdutoCarrinhoType): void {
      const produtoExistente = this.carrinho.produtos.find(p => p.id === produto.id);
      if (produtoExistente) {
          produtoExistente.quantidade += 1;
          produtoExistente.precoTotal += produtoExistente.precoUnitario;
      } else {
          const novoProduto: ProdutoCarrinhoType = {
            ...produto,
            quantidade: 1,
            precoTotal: produto.precoUnitario
          };
          this.carrinho.produtos.push(novoProduto);
      }
      this.salvarCarrinho();
    }

    private calcularPrecoCarrinho(): number {
      return this.carrinho.produtos.reduce((acc, p) => acc + p.precoTotal, 0);
    }

    removerProduto(produto: SaboresType): void;
    removerProduto(produtoId: number): void;
    removerProduto(produtoOrId: SaboresType | number): void {
      if (typeof produtoOrId === 'number') {
        this.carrinho.produtos = this.carrinho.produtos.filter(p => p.id !== produtoOrId);
      } else {
        this.carrinho.produtos = this.carrinho.produtos.filter(p => p.id !== produtoOrId.id);
      }
      this.salvarCarrinho();
    }
  
    listarProdutos(): ProdutoCarrinhoType[] {
      return this.carrinho.produtos;
    }
  
    limparCarrinho(): void {
      this.carrinho.produtos = [];
      this.salvarCarrinho();
    }
}