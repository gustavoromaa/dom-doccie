import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";

export default function ModalNovoNome({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (name: string) => void }) {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
        if (event.target.value.trim()) {
            setError('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (userName.trim()) {
            onSubmit(userName);
            onClose();
        } else {
            setError('Por favor, digite um nome válido.');
        }
    };

    return (
        <Modal 
            isOpen={isOpen}
            placement="center"
            onClose={() => {}}
            backdrop='opaque'
            hideCloseButton={true}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Para continuar seu pedido...</ModalHeader>
                <ModalBody>
                    <p className="mb-4">Notamos que você ainda não se identificou, por favor, digite seu nome para continuar.</p>
                    <Input
                        autoFocus
                        label="Nome"
                        placeholder="Digite seu nome"
                        variant="bordered"
                        value={userName}
                        className='mb-5'
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        isRequired={true}
                        isInvalid={!!error}
                        errorMessage={error}
                    />
                </ModalBody>
                <ModalFooter className="flex justify-end bg-transparent">
                    <Button color="primary" className="bg-rosa-claro" onPress={handleSubmit}>
                        Enviar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}