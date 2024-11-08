import { Input } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import { useState, useRef, useEffect } from "react";

const poppins = Poppins({
    weight: ['300', '500', '700'],
    subsets: ['latin'],
});

interface EnviarEnderecoProps {
    onAddressComplete: (isComplete: boolean) => void;
    setEndereco: (endereco: string) => void;
}

export default function EnviarEndereco({ onAddressComplete, setEndereco }: EnviarEnderecoProps) {
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const numeroRef = useRef<HTMLInputElement>(null);

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let rawValue = value.replace(/\D/g, '');

        if (rawValue.length > 5) {
            value = rawValue.slice(0, 5) + '-' + rawValue.slice(5, 8);
        } else {
            value = rawValue;
        }

        setCep(value);

        if (rawValue.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${rawValue}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setLogradouro(data.logradouro);
                    setBairro(data.bairro);
                    setCidade(data.localidade);
                    setEstado(data.uf);
                    if (numeroRef.current) {
                        numeroRef.current.focus();
                    }
                } else {
                    setLogradouro('');
                    setBairro('');
                    setCidade('');
                    setEstado('');
                }
            } catch (error) {
                // todo: pegar o erro
            }
        }
    };

    const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let rawValue = value.replace(/\D/g, '');
        setNumero(rawValue);
    }

    useEffect(() => {
        const isComplete = cep.length === 9 && numero !== '' && logradouro !== '' && bairro !== '' && cidade !== '' && estado !== '';
        onAddressComplete(isComplete);
        if (isComplete) {
            setEndereco(`${logradouro}, ${numero} - ${bairro}, ${cidade} - ${estado}${complemento ? ` | ${complemento}` : ''}`);
        }
    }, [cep, numero, logradouro, bairro, cidade, estado, complemento, onAddressComplete, setEndereco]);

    return (
        <div className={`carrinho_delivery ${poppins.className}`} style={{ fontWeight: 300 }}>

            <div className={`header_carrinho_delivery`} >
                <h1>Entrega</h1>
            </div>

            <div className="container_opcoes flex flex-col align-center gap-3">
                <div className="flex flex-row gap-3 ">
                    <Input
                        placeholder="CEP"
                        value={cep}
                        onChange={handleCepChange}
                        className="text-center"
                        required
                    />
                    <Input
                        placeholder="Nº"
                        className="w-2/4"
                        max={5}
                        onChange={handleNumeroChange}
                        ref={numeroRef}
                        required
                    />
                    <Input
                        placeholder="Complemento"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                    />
                </div>
                {logradouro && numero && bairro && (
                    <div className="flex flex-col gap-1">
                        <p>{logradouro}, {numero} - {bairro}, {cidade} - {estado} 
                            {
                                complemento && (
                                    <span> | {complemento}</span>
                                )
                            }
                            </p>
                    </div>
                )}
            </div>
        </div>
    );
}