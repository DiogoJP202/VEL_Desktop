import React from "react";
import style from "./estilo.module.css";
import Http from "../RequisicaoHTTP/Http";
import { apiFetch } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { showToastSuccess } from "../../services/toast";
import { useAuth } from "../../contexts/AuthContext";

function applyCpfMask(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function applyPhoneMask(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function normalizeCpf(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

export default function ModalAddEntregador({ isOpen, onClose }) {
  const { userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    contaBancaria: "",
    turno: "1",
  });

  const resetForm = React.useCallback(() => {
    setFormData({
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      contaBancaria: "",
      turno: "1",
    });
  }, []);

  const closeModal = React.useCallback(() => {
    if (isSubmitting) {
      return;
    }
    resetForm();
    onClose();
  }, [isSubmitting, onClose, resetForm]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "cpf") {
      setFormData((current) => ({ ...current, cpf: applyCpfMask(value) }));
      return;
    }

    if (id === "telefone") {
      setFormData((current) => ({ ...current, telefone: applyPhoneMask(value) }));
      return;
    }

    setFormData((current) => ({ ...current, [id]: value }));
  };

  const enviarDados = (event) => {
    event.preventDefault();

    const cpfSemMascara = normalizeCpf(formData.cpf);
    if (cpfSemMascara.length !== 11) {
      return;
    }

    const newUser = {
      idCnpj: userId,
      nome: formData.nome.trim(),
      idCpf: cpfSemMascara,
      senha: cpfSemMascara,
      telefone: formData.telefone.trim(),
      email: formData.email.trim(),
      contaBancaria: formData.contaBancaria.trim(),
      turno: Number(formData.turno),
      status: true,
    };

    enviaEntregadores(Http("POST", newUser));
  };

  const enviaEntregadores = async (dados) => {
    try {
      setIsSubmitting(true);
      const requisicao = await apiFetch("/entregador/adicionar", dados);
      if (requisicao.ok) {
        showToastSuccess("Entregador cadastrado com sucesso.");
        resetForm();
        onClose();
        return;
      }
      let payload = null;
      try {
        payload = await requisicao.json();
      } catch {
        payload = null;
      }

      const error = new Error(payload?.message || `Status ${requisicao.status}`);
      error.status = requisicao.status;
      error.payload = payload;
      throw error;
    } catch (error) {
      notifyApiError(error, "Erro ao cadastrar entregador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const iniciais = formData.nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() || "")
    .join("") || "NV";

  return (
    <div className={style.modalBackdrop} role="presentation" onClick={closeModal}>
      <dialog className={style.modalContainer} open onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={style.modalCloseButton}
          onClick={closeModal}
          disabled={isSubmitting}
          aria-label="Fechar cadastro"
        >
          ×
        </button>

        <header className={style.modalHeader}>
          <div className={style.avatar}>{iniciais}</div>
          <div>
            <h2>Novo entregador</h2>
            <p>Preencha os dados para cadastrar e disponibilizar no painel de operação.</p>
          </div>
        </header>

        <form className={style.modalForm} onSubmit={enviarDados}>
          <div className={style.formGrid}>
            <label htmlFor="nome">
              Nome completo
              <input
                required
                type="text"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex.: João da Silva"
              />
            </label>

            <label htmlFor="cpf">
              CPF
              <input
                required
                type="text"
                id="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                maxLength={14}
              />
            </label>

            <label htmlFor="telefone">
              Telefone
              <input
                required
                type="tel"
                id="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                maxLength={16}
              />
            </label>

            <label htmlFor="email">
              E-mail
              <input
                required
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="entregador@email.com"
              />
            </label>

            <label htmlFor="contaBancaria">
              Conta bancária
              <input
                required
                type="text"
                id="contaBancaria"
                value={formData.contaBancaria}
                onChange={handleChange}
                placeholder="Banco / agência / conta"
              />
            </label>

            <label htmlFor="turno">
              Turno
              <select name="turno" id="turno" value={formData.turno} onChange={handleChange}>
                <option value="1">Manhã</option>
                <option value="2">Tarde</option>
                <option value="3">Noite</option>
              </select>
            </label>
          </div>

          <footer className={style.modalActions}>
            <button type="button" className={style.secondaryButton} onClick={closeModal} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className={style.primaryButton} disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Cadastrar entregador"}
            </button>
          </footer>
        </form>
      </dialog>
    </div>
  );
}
