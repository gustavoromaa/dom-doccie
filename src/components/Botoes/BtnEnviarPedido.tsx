import { AiOutlineSend } from "react-icons/ai";
import { useCarrinho } from "../../context/CarrinhoContext";

export default function BtnEnviarPedido() {

    const nome = localStorage.getItem('nome');
    const tipoEntrega = localStorage.getItem('tipoEntrega')!;

    const { produtos, valorCarrinho } = useCarrinho();

    let message = `👋 Olá!\n Me chamo *${nome?.trim()}* e gostaria de fazer um pedido:\n\n` +
        "🍫 Itens\n" +
        produtos.map((produto) => (
            `• ${produto.quantidade} x ${produto.nome} *(R$${produto.precoTotal?.toFixed(2)})*\n`
        )).join('') +
        "\n" +
        `➡️ Valor *total* dos itens: *R$${valorCarrinho.toFixed(2)}*\n\n` +
        `➡️ *Modo de envio:* ${tipoEntrega}\n`

    function onClick() {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send/?phone=554198302447&text=${encodedMessage}`, '_blank');
    }

    return (
        <div>
            <button onClick={onClick}>
                <span style={{ fontSize: 26 }}><AiOutlineSend /></span> Enviar pedido
            </button>
        </div>
    );
}