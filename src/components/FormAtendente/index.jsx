import React, { useState } from 'react';
import style from './estilo.module.css';
import ModalConfirmar from '../ModalConfirmar/index';
import Http from "../../components/RequisicaoHTTP/Http"
import { apiFetchJson } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { showToastSuccess } from "../../services/toast";
import { useAuth } from "../../contexts/AuthContext";

export default function FormAtendente() {
    const { userId } = useAuth();
    const [isModalConfirmarOpen, setIsModalConfirmarOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        endereco: "",
        valor: "",
        descricao: "",
        formaPagamento: "2",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((current) => ({ ...current, [id]: value }));
    };

    const enviaInformacoes = async event => {
        event.preventDefault();

        const pedido = {
            nome: formData.nome,
            telefone: formData.telefone,
            endereco: formData.endereco,
            valor: Number(formData.valor),
            descricao: formData.descricao,
            formaPagamento: Number(formData.formaPagamento),
            idUsuario: Number(userId),
        }

        try{
            setIsSubmitting(true);
            await apiFetchJson(`/pedido/adicionar/${pedido.idUsuario}`, Http("POST", pedido));
            showToastSuccess("Pedido enviado com sucesso!");
            setFormData({
                nome: "",
                telefone: "",
                endereco: "",
                valor: "",
                descricao: "",
                formaPagamento: "2",
            });
        } catch(error){
            notifyApiError(error, "Erro ao se comunicar com o servidor. Tente novamente mais tarde.");
        } finally {
            setIsSubmitting(false);
            setIsModalConfirmarOpen(false);
        }
    }

    return (
        <form className={style.conteiner} onSubmit={enviaInformacoes}>
            <div className={style.modalFormConteiner}>
                <div className={style.modalFormGrupo}>
                    <div>
                        <label htmlFor='nome'>Nome do cliente:</label>
                        <input type="text" id='nome' required maxLength={100} value={formData.nome} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='telefone'>Telefone:</label>
                        <input type="tel" id='telefone' required maxLength={14} value={formData.telefone} onChange={handleChange} />
                    </div>
                </div>

                <div className={style.modalFormGrupo}>
                    <div>
                        <label htmlFor='endereco'>Endereço:</label>
                        <input type="text" id='endereco' required maxLength={255} value={formData.endereco} onChange={handleChange} />
                    </div>
                </div>

                <div className={style.modalFormGrupo}>

                    <div>
                        <label htmlFor='valor'>Valor:</label>
                        <input type="number" id='valor' step="0.01" min={1} required maxLength={9} value={formData.valor} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='formaPagamento'>Forma de pagamento:</label>
                        <select name="formaPagamento" value={formData.formaPagamento} id="formaPagamento" maxLength={255} required onChange={handleChange}>
                            <option value="1">Dinheiro</option>
                            <option value="2">PIX</option>
                            <option value="3">Boleto</option>
                            <option value="4">Cartão Débito</option>
                            <option value="5">Cartão Crédito</option>
                        </select>
                    </div>
                </div>

                <div className={style.modalFormGrupo}>
                    <div>
                        <label htmlFor='descricao'>Descrição do pedido:</label>
                        <textarea id='descricao' value={formData.descricao} onChange={handleChange}/>
                    </div>
                </div>

            </div>
            <div className={style.modalBotoes}>
                <button type="button" className={style.modalBotaoEnviar} onClick={()=>setIsModalConfirmarOpen(true)} disabled={isSubmitting}>
                    {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
                </button>
            </div>

            <ModalConfirmar isOpen={isModalConfirmarOpen} onClose={()=>setIsModalConfirmarOpen(false)} />
        </form>
    );
}
