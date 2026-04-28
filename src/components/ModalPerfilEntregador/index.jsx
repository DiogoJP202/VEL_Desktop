import React, { useEffect, useState } from "react";
import style from "./estilo.module.css";
import Http from "../RequisicaoHTTP/Http.jsx";
import { apiFetch } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { showToastSuccess } from "../../services/toast";
import { useAuth } from "../../contexts/AuthContext";

function normalizeCpf(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function applyPhoneMask(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getTurnoLabel(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "1" || normalized === "manha" || normalized === "manhã") return "Manhã";
  if (normalized === "2" || normalized === "tarde") return "Tarde";
  if (normalized === "3" || normalized === "noite") return "Noite";
  return "Não informado";
}

function isOnlineStatus(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "online" || normalized === "true" || normalized === "ativo";
  }
  return false;
}

function getInitials(name) {
  return String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "NV";
}

export default function ModalPerfilEntregador({ isOpen, onClose, entregador }) {
  const { userId } = useAuth();
  const [mode, setMode] = useState("view");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalCpf, setOriginalCpf] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    contaBancaria: "",
    turno: "1",
  });

  useEffect(() => {
    if (!entregador) {
      return;
    }

    const cpf = String(entregador.idCpf || "");
    setOriginalCpf(cpf);
    setFormData({
      nome: entregador.nome || "",
      cpf,
      telefone: entregador.telefone || "",
      email: entregador.email || "",
      contaBancaria: entregador.contaBancaria || "",
      turno: String(entregador.turno ?? "1"),
    });
    setMode("view");
  }, [entregador]);

  if (!isOpen || !entregador) {
    return null;
  }

  const online = isOnlineStatus(entregador.status);
  const initials = getInitials(formData.nome);
  const turnoLabel = getTurnoLabel(formData.turno);

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }
    setMode("view");
    onClose();
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "telefone") {
      setFormData((current) => ({ ...current, telefone: applyPhoneMask(value) }));
      return;
    }
    setFormData((current) => ({ ...current, [id]: value }));
  };

  const salvarAlteracoes = async (event) => {
    event.preventDefault();

    const cpfSemMascara = normalizeCpf(originalCpf || formData.cpf);
    if (!cpfSemMascara) {
      return;
    }

    const payload = {
      idCnpj: userId,
      nome: formData.nome.trim(),
      idCpf: cpfSemMascara,
      telefone: formData.telefone.trim(),
      email: formData.email.trim(),
      contaBancaria: formData.contaBancaria.trim(),
      turno: formData.turno,
    };

    try {
      setIsSubmitting(true);
      const requisicao = await apiFetch(`/entregador/editar/${cpfSemMascara}`, Http("PUT", payload));
      if (requisicao.ok) {
        showToastSuccess("Perfil atualizado com sucesso.");
        setMode("view");
        return;
      }
      let responsePayload = null;
      try {
        responsePayload = await requisicao.json();
      } catch {
        responsePayload = null;
      }

      const error = new Error(responsePayload?.message || `Status ${requisicao.status}`);
      error.status = requisicao.status;
      error.payload = responsePayload;
      throw error;
    } catch (error) {
      notifyApiError(error, "Erro ao atualizar entregador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.modalBackdrop} role="presentation" onClick={closeModal}>
      <dialog className={style.modalContainer} open onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={style.modalCloseButton}
          onClick={closeModal}
          disabled={isSubmitting}
          aria-label="Fechar perfil"
        >
          ×
        </button>

        <header className={style.modalHeader}>
          <div className={style.avatar}>{initials}</div>
          <div className={style.headerInfo}>
            <h2>{mode === "edit" ? "Editar entregador" : "Perfil do entregador"}</h2>
            <p>ID: {formData.cpf || "--"}</p>
          </div>
          <span className={`${style.statusBadge} ${online ? style.online : style.offline}`}>
            {online ? "Online" : "Offline"}
          </span>
        </header>

        {mode === "view" ? (
          <>
            <section className={style.infoGrid}>
              <article>
                <span>Nome</span>
                <strong>{formData.nome || "--"}</strong>
              </article>
              <article>
                <span>CPF</span>
                <strong>{formData.cpf || "--"}</strong>
              </article>
              <article>
                <span>Telefone</span>
                <strong>{formData.telefone || "--"}</strong>
              </article>
              <article>
                <span>E-mail</span>
                <strong>{formData.email || "--"}</strong>
              </article>
              <article>
                <span>Conta bancária</span>
                <strong>{formData.contaBancaria || "--"}</strong>
              </article>
              <article>
                <span>Turno</span>
                <strong>{turnoLabel}</strong>
              </article>
            </section>

            <footer className={style.modalActions}>
              <button type="button" className={style.secondaryButton} onClick={closeModal}>
                Fechar
              </button>
              <button type="button" className={style.primaryButton} onClick={() => setMode("edit")} disabled={isSubmitting}>
                Editar dados
              </button>
            </footer>
          </>
        ) : (
          <form className={style.modalForm} onSubmit={salvarAlteracoes}>
            <div className={style.formGrid}>
              <label htmlFor="nome">
                Nome completo
                <input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome do entregador"
                  required
                />
              </label>

              <label htmlFor="cpf">
                CPF
                <input id="cpf" type="text" value={formData.cpf} readOnly className={style.readOnlyInput} />
              </label>

              <label htmlFor="telefone">
                Telefone
                <input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                />
              </label>

              <label htmlFor="email">
                E-mail
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="entregador@email.com"
                />
              </label>

              <label htmlFor="contaBancaria">
                Conta bancária
                <input
                  id="contaBancaria"
                  type="text"
                  value={formData.contaBancaria}
                  onChange={handleChange}
                  placeholder="Banco / agência / conta"
                />
              </label>

              <label htmlFor="turno">
                Turno
                <select id="turno" value={formData.turno} onChange={handleChange}>
                  <option value="1">Manhã</option>
                  <option value="2">Tarde</option>
                  <option value="3">Noite</option>
                </select>
              </label>
            </div>

            <footer className={style.modalActions}>
              <button type="button" className={style.secondaryButton} onClick={() => setMode("view")} disabled={isSubmitting}>
                Cancelar
              </button>
              <button type="submit" className={style.primaryButton} disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </button>
            </footer>
          </form>
        )}
      </dialog>
    </div>
  );
}
