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
    if (typeof window !== 'undefined') {
      this.carrinho.valorCarrinho = this.carrinho.produtos.reduce((acc, p) => acc + p.precoTotal!, 0);
      this.carrinho.quantidadeTotal = this.carrinho.produtos.reduce((acc, p) => acc + p.quantidade, 0);
      localStorage.setItem(CARRINHO_STORAGE_KEY, JSON.stringify(this.carrinho));
    }
  }

  private carregarCarrinho(): CarrinhoType {
    if (typeof window !== 'undefined') {
      const carrinhoJson = localStorage.getItem(CARRINHO_STORAGE_KEY);
      return carrinhoJson ? JSON.parse(carrinhoJson) : { produtos: [], valorCarrinho: 0, quantidadeTotal: 0 };
    }
    return { produtos: [], valorCarrinho: 0, quantidadeTotal: 0 };
  }

  atualizarQuantidade(produtoId: number, quantidade: number): void {
    const produto = this.carrinho.produtos.find(p => p.id === produtoId);
    if (produto) {
      produto.quantidade = quantidade;
      produto.precoTotal = produto.precoUnitario * quantidade;
      this.salvarCarrinho();
    }
  }

  adicionarProduto(produto: ProdutoCarrinhoType, quantidade: number): void {
    const produtoExistente = this.carrinho.produtos.find(p => p.id === produto.id);
    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
      produtoExistente.precoTotal! += produtoExistente.precoUnitario;
    } else {
      const novoProduto: ProdutoCarrinhoType = {
        ...produto,
        quantidade: quantidade,
        precoTotal: produto.precoUnitario,
      };
      this.carrinho.produtos.push(novoProduto);
    }
    this.salvarCarrinho();
  }

  removerProduto(produtoId: number): void {
    this.carrinho.produtos = this.carrinho.produtos.filter(p => p.id !== produtoId);
    this.salvarCarrinho();
  }

  listarProdutos(): ProdutoCarrinhoType[] {
    return this.carrinho.produtos;
  }

  limparCarrinho(): void {
    this.carrinho.produtos = [];
    this.salvarCarrinho();
  }

  getQtndTotal(): number {
    return this.carrinho.quantidadeTotal;
  }

  getValorCarrinho(): number {
    return this.carrinho.valorCarrinho;
  }
}