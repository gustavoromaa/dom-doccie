import { AiOutlineSend } from "react-icons/ai";
import { useCarrinho } from "../../context/CarrinhoContext";

export default function BtnEnviarPedido({ endereco, canClick }: { endereco?: string, canClick: boolean }) {

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
        `➡️ *Modo de envio:* ${tipoEntrega} \n` +
        (tipoEntrega === 'Entrega' ? `➡️ *Endereço:* ${endereco}\n\n` : '')

    function onClick() {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send/?phone=554198335776&text=${encodedMessage}`, '_blank');
    }

    return (
        <div className="btnSend" style={{backgroundColor: canClick ? 'var(--rosa-claro)' : '#D3D3D3'}}>
            <button className="btnEnviarPedido" onClick={onClick} disabled={!canClick} style={{ cursor: canClick ? 'pointer' : 'not-allowed' , }}>
                <span style={{ fontSize: 26 }}><AiOutlineSend /></span> Enviar pedido
            </button>
        </div>
    );
}