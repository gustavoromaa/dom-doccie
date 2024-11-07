import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { SaboresType } from "../../models/sabores";
import Image from "next/image";
import BtnAdicionarCarrinho from "../Botoes/BtnAdicionarCarrinho";
import { useState } from "react";

export default function ModalProduto({ id, categoria, nome, descricao, precoUnitario, cor_principal, imagem, alt, onClose, isOpen }: SaboresType & { onClose: (event?: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, isOpen: boolean }) {

    const [quantidade, setQuantidade] = useState(1);
    const [cooldown, setCooldown] = useState(false);

    const incrementar = () => {
        setQuantidade(quantidade + 1);
    }

    const decrementar = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        }
    }

    const handleClose = () => {
        onClose();

    }

    const produto = { id, categoria, nome, descricao, precoUnitario, cor_principal, imagem, alt };

    return (
        <Modal 
            isOpen={isOpen && !cooldown}
            onClose={handleClose}
            backdrop='opaque'
            
            closeButton={true}
            className="z-50"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                </ModalHeader>
                <ModalBody className="flex flex-row gap-4 p-4" style={{ height: '500px' }}>
                    <div className="modal_img shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,0,0,0.15)]" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: cor_principal, borderRadius: '10px', padding: '10px', width: '320px', height: '320px' }}>
                        <Image
                            src={`/produtos/${imagem}.png`}
                            alt={alt}
                            width={300}
                            height={300}
                            className="card_image"
                            style={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '100%' }}
                        />
                    </div>
                    <div className="modal_info flex flex-col gap-3" style={{ flex: '1', justifyContent: 'center' }}>
                        <div className="modal_info_header flex flex-col items-center gap-1 self-center">
                            <h1 className="text-2xl font-bold text-center">{nome}</h1>
                        </div>
                        <div className="modal_info_body flex flex-col items-center gap-1" style={{ flex: '1', justifyContent: 'center' }}>
                            <p className="text-lg text-gray-700 text-center">{descricao}</p>
                            <p className="text-xl font-semibold text-gray-900" style={{ color: cor_principal, fontSize: '24px', fontWeight: 'bold' }}>
                                R${precoUnitario.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-end bg-transparent">
                    <div className="containerContador">
                        <div className="contador">
                            <button onClick={decrementar} className={`menos`}>-</button>
                            <span>{quantidade}</span>
                            <button onClick={incrementar} className={`mais`}>+</button>
                        </div>
                    </div>
                    <BtnAdicionarCarrinho produto={produto} onClick={handleClose} quantidade={quantidade} mostrarValor={true} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}