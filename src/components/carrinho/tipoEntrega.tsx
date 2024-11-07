import { MdOutlineDeliveryDining } from "react-icons/md";

export default function TipoEntrega({icone, titulo, descricao, ativo, onClick}: {icone: any, titulo: string, ativo: boolean, descricao: string, onClick: () => void}) {
    return (
        <div onClick={onClick} className={`${ativo ? 'active' : ''}`}>
            <div className="delivery">
                <div className="header_icons">
                    <div className="moto">
                        {icone}
                    </div>

                    <div className="checkbox">
                        <div className="checkbox_border">
                            <div className="checkbox_fill">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h1popcoes">
                    <h1>{titulo}</h1>
                    <p>{descricao}</p>
                </div>
            </div>
        </div>
    )
}