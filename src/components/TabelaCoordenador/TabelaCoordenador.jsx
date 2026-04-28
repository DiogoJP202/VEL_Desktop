import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowDownAZ,
  FaArrowRotateRight,
  FaArrowUpAZ,
  FaDownload,
  FaEye,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaPlus,
  FaRegCopy,
  FaTrash,
  FaUsers,
} from "react-icons/fa6";
import style from "./estilo.module.css";
import Http from "../RequisicaoHTTP/Http.jsx";
import { apiFetchJson } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { useAuth } from "../../contexts/AuthContext";
import DataState from "../DataState.jsx";
import { showToastError, showToastInfo, showToastSuccess } from "../../services/toast";

const PAGE_SIZE_OPTIONS = [8, 12, 20];
const CONTACT_OPTIONS = [
  { value: "all", label: "Todos os contatos" },
  { value: "complete", label: "Contato completo" },
  { value: "missing_phone", label: "Sem telefone" },
  { value: "missing_email", label: "Sem email" },
];
const SORT_OPTIONS = [
  { value: "nome_asc", label: "Nome (A-Z)", icon: <FaArrowDownAZ aria-hidden /> },
  { value: "nome_desc", label: "Nome (Z-A)", icon: <FaArrowUpAZ aria-hidden /> },
  { value: "cpf_asc", label: "CPF (crescente)", icon: <FaArrowDownAZ aria-hidden /> },
  { value: "cpf_desc", label: "CPF (decrescente)", icon: <FaArrowUpAZ aria-hidden /> },
];

function normalizeCpf(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function normalizeCnpj(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 14);
}

function applyCpfMask(value) {
  const digits = normalizeCpf(value);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatCpf(value) {
  const digits = normalizeCpf(value);
  if (digits.length !== 11) {
    return value || "--";
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function applyPhoneMask(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) {
    return "--";
  }
  return applyPhoneMask(digits);
}

function normalizeName(raw) {
  return String(raw?.nome || raw?.NOME || raw?.Nome || "").trim();
}

function normalizePhone(raw) {
  return String(raw?.telefone || raw?.TELEFONE || raw?.Telefone || "").trim();
}

function normalizeEmail(raw) {
  return String(raw?.email || raw?.EMAIL || "").trim();
}

function normalizeCoordinator(raw, index) {
  const idCpf = normalizeCpf(raw?.idCpf || raw?.idcpf || raw?.cpf);
  const nome = normalizeName(raw);
  const telefone = normalizePhone(raw);
  const email = normalizeEmail(raw);
  const idCnpj = String(raw?.idCnpj || raw?.id_cnpj || "").trim();

  return {
    key: `${idCpf || "sem-cpf"}-${index}`,
    idCpf,
    cpfLabel: formatCpf(idCpf),
    nome: nome || "Sem nome",
    telefone,
    telefoneLabel: formatPhone(telefone),
    email: email || "--",
    idCnpj,
  };
}

function buildCsv(items) {
  const headers = ["Nome", "CPF", "Telefone", "Email", "ID CNPJ"];
  const rows = items.map((item) => [item.nome, item.cpfLabel, item.telefoneLabel, item.email, item.idCnpj || "--"]);
  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(";"))
    .join("\n");
}

function hasPhone(item) {
  return String(item?.telefone || "").replace(/\D/g, "").length >= 10;
}

function hasEmail(item) {
  return String(item?.email || "").includes("@");
}

function hasCompleteContact(item) {
  return hasPhone(item) && hasEmail(item);
}

function buildPaginationWindow(totalPages, currentPage) {
  const size = 5;
  const safeCurrent = Math.max(1, Math.min(currentPage, totalPages));
  const half = Math.floor(size / 2);
  let start = Math.max(1, safeCurrent - half);
  let end = Math.min(totalPages, start + size - 1);

  if (end - start + 1 < size) {
    start = Math.max(1, end - size + 1);
  }

  const windowPages = [];
  for (let page = start; page <= end; page += 1) {
    windowPages.push(page);
  }

  return windowPages;
}

function CoordinatorModal({
  mode,
  coordinator,
  formData,
  isSubmitting,
  onClose,
  onEdit,
  onChange,
  onSubmit,
}) {
  if (!mode) {
    return null;
  }

  const isView = mode === "view";
  const title =
    mode === "create"
      ? "Novo coordenador"
      : mode === "edit"
        ? "Editar coordenador"
        : "Perfil do coordenador";

  return (
    <div className={style.modalOverlay} role="dialog" aria-modal="true">
      <button type="button" className={style.modalBackdrop} onClick={onClose} aria-label="Fechar" />
      <article className={style.modalCard}>
        <header className={style.modalHeader}>
          <h3>{title}</h3>
          <button type="button" onClick={onClose} disabled={isSubmitting}>
            Fechar
          </button>
        </header>

        {isView ? (
          <>
            <div className={style.viewGrid}>
              <div>
                <span>Nome</span>
                <strong>{coordinator?.nome || "--"}</strong>
              </div>
              <div>
                <span>CPF</span>
                <strong>{coordinator?.cpfLabel || "--"}</strong>
              </div>
              <div>
                <span>Telefone</span>
                <strong>{coordinator?.telefoneLabel || "--"}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{coordinator?.email || "--"}</strong>
              </div>
            </div>
            <footer className={style.modalFooter}>
              <button type="button" className={style.secondaryBtn} onClick={onClose}>
                Fechar
              </button>
              <button type="button" className={style.primaryBtn} onClick={onEdit}>
                Editar dados
              </button>
            </footer>
          </>
        ) : (
          <form className={style.modalForm} onSubmit={onSubmit}>
            <label htmlFor="nome">
              Nome
              <input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={onChange}
                placeholder="Nome completo"
                required
              />
            </label>

            <label htmlFor="cpf">
              CPF
              <input
                id="cpf"
                type="text"
                value={formData.cpf}
                onChange={onChange}
                placeholder="000.000.000-00"
                maxLength={14}
                readOnly={mode === "edit"}
                className={mode === "edit" ? style.readOnlyInput : ""}
                required
              />
            </label>

            <label htmlFor="telefone">
              Telefone
              <input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={onChange}
                placeholder="(11) 99999-9999"
                maxLength={16}
              />
            </label>

            <label htmlFor="email">
              Email
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                placeholder="coordenador@empresa.com"
                required
              />
            </label>

            <label htmlFor="senha">
              Senha {mode === "edit" ? "(opcional)" : ""}
              <input
                id="senha"
                type="password"
                value={formData.senha}
                onChange={onChange}
                placeholder={mode === "edit" ? "Preencha somente para trocar" : "Defina uma senha"}
                minLength={6}
                required={mode === "create"}
              />
            </label>

            <footer className={style.modalFooter}>
              <button type="button" className={style.secondaryBtn} onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </button>
              <button type="submit" className={style.primaryBtn} disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </footer>
          </form>
        )}
      </article>
    </div>
  );
}

function DeleteModal({ coordinator, isSubmitting, onCancel, onConfirm }) {
  if (!coordinator) {
    return null;
  }

  return (
    <div className={style.modalOverlay} role="dialog" aria-modal="true">
      <button type="button" className={style.modalBackdrop} onClick={onCancel} aria-label="Fechar" />
      <article className={style.modalCard}>
        <header className={style.modalHeader}>
          <h3>Remover coordenador</h3>
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Fechar
          </button>
        </header>

        <p className={style.confirmText}>
          Voce esta prestes a remover <strong>{coordinator.nome}</strong> ({coordinator.cpfLabel}).
          Esta acao nao pode ser desfeita.
        </p>

        <footer className={style.modalFooter}>
          <button type="button" className={style.secondaryBtn} onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </button>
          <button type="button" className={style.dangerBtn} onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? "Removendo..." : "Confirmar remocao"}
          </button>
        </footer>
      </article>
    </div>
  );
}

export default function TabelaCoordenador() {
  const { userId } = useAuth();
  const companyId = useMemo(() => {
    const digits = normalizeCnpj(userId);
    return digits || String(userId ?? "").trim();
  }, [userId]);

  const [coordenadores, setCoordenadores] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("nome_asc");
  const [contactFilter, setContactFilter] = useState("all");
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalMode, setModalMode] = useState(null);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchCoordenadores = useCallback(async () => {
    if (!companyId) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await apiFetchJson(`/coordenador/idcnpj/${companyId}`);
      const list = Array.isArray(response) ? response : [];
      setCoordenadores(list.map((item, index) => normalizeCoordinator(item, index)));
      setLastUpdate(new Date());
    } catch (error) {
      setErrorMessage(error.message || "Falha ao carregar coordenadores.");
      notifyApiError(error, "Erro ao carregar coordenadores.");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchCoordenadores();
  }, [fetchCoordenadores]);

  const stats = useMemo(() => {
    const total = coordenadores.length;
    const withPhone = coordenadores.filter(hasPhone).length;
    const withEmail = coordenadores.filter(hasEmail).length;
    const completeContact = coordenadores.filter(hasCompleteContact).length;

    return { total, withPhone, withEmail, completeContact };
  }, [coordenadores]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();

    const rows = coordenadores.filter((item) => {
      const matchSearch =
        !term
        || item.nome.toLowerCase().includes(term)
        || item.cpfLabel.toLowerCase().includes(term)
        || item.email.toLowerCase().includes(term)
        || item.telefoneLabel.toLowerCase().includes(term);

      const matchContact =
        contactFilter === "all"
        || (contactFilter === "complete" && hasCompleteContact(item))
        || (contactFilter === "missing_phone" && !hasPhone(item))
        || (contactFilter === "missing_email" && !hasEmail(item));

      return matchSearch && matchContact;
    });

    const sorted = [...rows];
    sorted.sort((a, b) => {
      if (sortBy === "nome_desc") {
        return b.nome.localeCompare(a.nome, "pt-BR");
      }
      if (sortBy === "cpf_asc") {
        return a.idCpf.localeCompare(b.idCpf, "pt-BR");
      }
      if (sortBy === "cpf_desc") {
        return b.idCpf.localeCompare(a.idCpf, "pt-BR");
      }
      return a.nome.localeCompare(b.nome, "pt-BR");
    });

    return sorted;
  }, [coordenadores, search, sortBy, contactFilter]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredRows.length / pageSize)), [filteredRows.length, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, pageSize, contactFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [currentPage, filteredRows, pageSize]);

  const paginationWindow = useMemo(
    () => buildPaginationWindow(totalPages, currentPage),
    [totalPages, currentPage],
  );

  const openCreateModal = () => {
    setSelectedCoordinator(null);
    setFormData({ nome: "", cpf: "", telefone: "", email: "", senha: "" });
    setModalMode("create");
  };

  const openViewModal = (coordinator) => {
    setSelectedCoordinator(coordinator);
    setModalMode("view");
  };

  const openEditModal = (coordinator) => {
    setSelectedCoordinator(coordinator);
    setFormData({
      nome: coordinator.nome || "",
      cpf: formatCpf(coordinator.idCpf),
      telefone: coordinator.telefoneLabel === "--" ? "" : coordinator.telefoneLabel,
      email: coordinator.email === "--" ? "" : coordinator.email,
      senha: "",
    });
    setModalMode("edit");
  };

  const closeMainModal = (force = false) => {
    if (isSubmitting && !force) {
      return;
    }
    setModalMode(null);
    setSelectedCoordinator(null);
  };

  const handleFormChange = (event) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cpfDigits = normalizeCpf(formData.cpf);
    if (cpfDigits.length !== 11) {
      showToastError("CPF invalido. Informe 11 digitos.");
      return;
    }

    if (modalMode === "create" && coordenadores.some((item) => item.idCpf === cpfDigits)) {
      showToastError("Ja existe coordenador cadastrado com este CPF.");
      return;
    }

    const payload = {
      idCpf: cpfDigits,
      nome: formData.nome.trim(),
      telefone: formData.telefone.trim(),
      email: formData.email.trim().toLowerCase(),
      idCnpj: companyId,
    };

    const password = formData.senha.trim();
    if (password) {
      payload.senha = password;
    }

    try {
      setIsSubmitting(true);

      if (modalMode === "create") {
        if (!password) {
          showToastInfo("Informe uma senha para o novo coordenador.");
          return;
        }
        await apiFetchJson("/coordenador/adicionar", Http("POST", payload));
        showToastSuccess("Coordenador cadastrado com sucesso.");
      } else {
        await apiFetchJson("/coordenador/editar", Http("PUT", payload));
        showToastSuccess("Coordenador atualizado com sucesso.");
      }

      closeMainModal(true);
      await fetchCoordenadores();
    } catch (error) {
      notifyApiError(error, "Erro ao salvar coordenador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setIsSubmitting(true);
      await apiFetchJson("/coordenador/apagar", Http("DELETE", { idCpf: deleteTarget.idCpf }));
      showToastSuccess("Coordenador removido com sucesso.");
      setDeleteTarget(null);
      await fetchCoordenadores();
    } catch (error) {
      notifyApiError(error, "Erro ao remover coordenador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCpf = async (cpf) => {
    const value = normalizeCpf(cpf);
    if (!value || !navigator?.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      showToastInfo("CPF copiado.");
    } catch {
      showToastError("Nao foi possivel copiar o CPF.");
    }
  };

  const exportCsv = () => {
    if (filteredRows.length === 0) {
      showToastInfo("Nao ha dados para exportar.");
      return;
    }

    const csvContent = buildCsv(filteredRows);
    const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `coordenadores-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearch("");
    setSortBy("nome_asc");
    setContactFilter("all");
    setPageSize(PAGE_SIZE_OPTIONS[0]);
    setCurrentPage(1);
  };

  const sortOption = SORT_OPTIONS.find((item) => item.value === sortBy);
  const rangeStart = filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, filteredRows.length);
  const showTable = !loading && !errorMessage && filteredRows.length > 0;
  const hasActiveFilters = Boolean(search.trim()) || sortBy !== "nome_asc" || contactFilter !== "all";

  return (
    <div className={style.wrapper}>
      <header className={style.hero}>
        <div>
          <h1>Coordenadores</h1>
          <p>Gerencie a coordenacao com busca inteligente, filtros, exportacao e cadastro rapido.</p>
          <small>Ultima atualizacao: {lastUpdate ? lastUpdate.toLocaleTimeString("pt-BR") : "--"}</small>
        </div>

        <div className={style.heroActions}>
          <button type="button" className={style.ghostBtn} onClick={fetchCoordenadores} disabled={loading}>
            <FaArrowRotateRight aria-hidden />
            Atualizar
          </button>
          <button type="button" className={style.primaryBtn} onClick={openCreateModal}>
            <FaPlus aria-hidden />
            Novo coordenador
          </button>
        </div>
      </header>

      <section className={style.statsGrid}>
        <article className={`${style.statCard} ${style.blue}`}>
          <span>Total</span>
          <strong>{stats.total}</strong>
          <small>Coordenadores cadastrados</small>
        </article>
        <article className={`${style.statCard} ${style.teal}`}>
          <span>Com telefone</span>
          <strong>{stats.withPhone}</strong>
          <small>Registros com contato telefonico</small>
        </article>
        <article className={`${style.statCard} ${style.green}`}>
          <span>Com email</span>
          <strong>{stats.withEmail}</strong>
          <small>Registros com email valido</small>
        </article>
        <article className={`${style.statCard} ${style.orange}`}>
          <span>Contato completo</span>
          <strong>{stats.completeContact}</strong>
          <small>Telefone + email preenchidos</small>
        </article>
      </section>

      <section className={style.panel}>
        <div className={style.panelHeader}>
          <h2>
            <FaUsers aria-hidden />
            Lista de coordenadores
          </h2>

          <div className={style.panelActions}>
            {hasActiveFilters ? (
              <button type="button" className={style.ghostBtn} onClick={clearFilters}>
                Limpar filtros
              </button>
            ) : null}
            <button type="button" className={style.ghostBtn} onClick={exportCsv}>
              <FaDownload aria-hidden />
              Exportar CSV
            </button>
          </div>
        </div>

        <div className={style.filters}>
          <label className={style.searchField} htmlFor="coordenadorSearch">
            <FaMagnifyingGlass aria-hidden />
            <input
              id="coordenadorSearch"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, CPF, telefone ou email"
            />
          </label>

          <label htmlFor="coordenadorSort">
            Ordenacao
            <select id="coordenadorSort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="coordenadorContactFilter">
            Qualidade de contato
            <select
              id="coordenadorContactFilter"
              value={contactFilter}
              onChange={(event) => setContactFilter(event.target.value)}
            >
              {CONTACT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="coordenadorPageSize">
            Itens por pagina
            <select
              id="coordenadorPageSize"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className={style.sortHint}>
            {sortOption?.icon}
            <span>{sortOption?.label || "Ordenado"}</span>
          </div>
        </div>

        <DataState
          loading={loading}
          error={errorMessage}
          empty={!loading && !errorMessage && filteredRows.length === 0}
          emptyMessage="Nenhum coordenador encontrado para os filtros aplicados."
          errorMessage="Nao foi possivel carregar os coordenadores."
          onRetry={fetchCoordenadores}
        />

        {showTable ? (
          <>
            <div className={style.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.map((coordinator) => (
                    <tr key={coordinator.key}>
                      <td>{coordinator.nome}</td>
                      <td>{coordinator.cpfLabel}</td>
                      <td>{coordinator.telefoneLabel}</td>
                      <td>{coordinator.email}</td>
                      <td>
                        <div className={style.rowActions}>
                          <button
                            type="button"
                            onClick={() => copyCpf(coordinator.idCpf)}
                            title="Copiar CPF"
                          >
                            <FaRegCopy aria-hidden />
                          </button>
                          <button
                            type="button"
                            onClick={() => openViewModal(coordinator)}
                            title="Ver perfil"
                          >
                            <FaEye aria-hidden />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(coordinator)}
                            title="Editar"
                          >
                            <FaPenToSquare aria-hidden />
                          </button>
                          <button
                            type="button"
                            className={style.dangerAction}
                            onClick={() => setDeleteTarget(coordinator)}
                            title="Remover"
                          >
                            <FaTrash aria-hidden />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className={style.tableFooter}>
              <p>
                Exibindo {rangeStart}-{rangeEnd} de {filteredRows.length} registro(s)
              </p>

              <div className={style.pagination}>
                <button
                  type="button"
                  onClick={() => setCurrentPage((current) => Math.max(1, current - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>

                {paginationWindow.map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={page === currentPage ? style.activePage : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((current) => Math.min(totalPages, current + 1))}
                  disabled={currentPage === totalPages}
                >
                  Proxima
                </button>
              </div>
            </footer>
          </>
        ) : null}
      </section>

      <CoordinatorModal
        mode={modalMode}
        coordinator={selectedCoordinator}
        formData={formData}
        isSubmitting={isSubmitting}
        onClose={() => closeMainModal()}
        onEdit={() => selectedCoordinator && openEditModal(selectedCoordinator)}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />

      <DeleteModal
        coordinator={deleteTarget}
        isSubmitting={isSubmitting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
