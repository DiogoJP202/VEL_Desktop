import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "./estilo.module.css";
import iconePerfil from "../../assets/images/icons/ShareIcon.png";
import ModalAddEntregador from "../ModalAddEntregador/index";
import ModalPerfilEntregador from "../ModalPerfilEntregador/index";
import { apiFetchJson } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { useAuth } from "../../contexts/AuthContext";
import DataState from "../DataState.jsx";

const STATUS_OPTIONS = [
  { value: "todos", label: "Todos os status" },
  { value: "online", label: "Somente online" },
  { value: "offline", label: "Somente offline" },
];

const TURNO_OPTIONS = [
  { value: "todos", label: "Todos os turnos" },
  { value: "1", label: "Manhã" },
  { value: "2", label: "Tarde" },
  { value: "3", label: "Noite" },
];

const ORDENACAO_OPTIONS = [
  { value: "nome_asc", label: "Nome (A-Z)" },
  { value: "nome_desc", label: "Nome (Z-A)" },
  { value: "status_desc", label: "Online primeiro" },
  { value: "id_asc", label: "ID crescente" },
  { value: "turno_asc", label: "Turno (1-3)" },
];

const ITENS_POR_PAGINA_OPTIONS = [8, 12, 20];

function isOnlineStatus(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value === 1;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "online" || normalized === "true" || normalized === "ativo";
  }
  return false;
}

function normalizeTurno(turno) {
  const normalized = String(turno ?? "").trim().toLowerCase();
  if (normalized === "1" || normalized === "manha" || normalized === "manhã") {
    return { value: "1", label: "Manhã" };
  }
  if (normalized === "2" || normalized === "tarde") {
    return { value: "2", label: "Tarde" };
  }
  if (normalized === "3" || normalized === "noite") {
    return { value: "3", label: "Noite" };
  }
  return { value: "0", label: "Não informado" };
}

function buildPaginationWindow(totalPages, currentPage) {
  const windowSize = 5;
  const safeCurrent = Math.max(1, Math.min(currentPage, totalPages));
  const half = Math.floor(windowSize / 2);

  let start = Math.max(1, safeCurrent - half);
  let end = Math.min(totalPages, start + windowSize - 1);

  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }

  const pages = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}

function buildCsvValue(value) {
  const safe = String(value ?? "").replaceAll('"', '""');
  return `"${safe}"`;
}

export default function TabelaEntregador() {
  const { userId } = useAuth();

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalPerfilOpen, setIsModalPerfilOpen] = useState(false);
  const [selectedEntregador, setSelectedEntregador] = useState(null);

  const [listaEntregadores, setListaEntregadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [turnoFiltro, setTurnoFiltro] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("nome_asc");
  const [itensPorPagina, setItensPorPagina] = useState(ITENS_POR_PAGINA_OPTIONS[0]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const fetchEntregadores = useCallback(async () => {
    if (userId === null || userId === undefined) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const informacoes = await apiFetchJson(`/entregador/${userId}`);
      setListaEntregadores(Array.isArray(informacoes) ? informacoes : []);
      setUltimaAtualizacao(new Date());
    } catch (error) {
      setErrorMessage(error.message || "Falha ao carregar entregadores.");
      notifyApiError(error, "Erro na requisição de dados. Tente recarregar a página.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEntregadores();
  }, [fetchEntregadores]);

  const registros = useMemo(() => {
    return listaEntregadores.map((entregador, index) => {
      const id = String(entregador?.idCpf ?? "");
      const turno = normalizeTurno(entregador?.turno);
      const isOnline = isOnlineStatus(entregador?.status);
      return {
        id: id || `sem-id-${index}`,
        nome: entregador?.nome || "Sem nome",
        idCpf: id || "--",
        telefone: entregador?.telefone || "--",
        email: entregador?.email || "--",
        contaBancaria: entregador?.contaBancaria || "--",
        turnoValue: turno.value,
        turnoLabel: turno.label,
        isOnline,
        statusLabel: isOnline ? "Online" : "Offline",
        raw: entregador,
      };
    });
  }, [listaEntregadores]);

  const resumo = useMemo(() => {
    const total = registros.length;
    const online = registros.filter((item) => item.isOnline).length;
    const offline = total - online;
    const turnos = { "1": 0, "2": 0, "3": 0 };

    registros.forEach((item) => {
      if (turnos[item.turnoValue] !== undefined) {
        turnos[item.turnoValue] += 1;
      }
    });

    return {
      total,
      online,
      offline,
      manha: turnos["1"],
      tarde: turnos["2"],
      noite: turnos["3"],
    };
  }, [registros]);

  const registrosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const filtered = registros.filter((item) => {
      const matchBusca = !termo
        || item.nome.toLowerCase().includes(termo)
        || item.idCpf.toLowerCase().includes(termo)
        || item.telefone.toLowerCase().includes(termo)
        || item.email.toLowerCase().includes(termo);

      const matchStatus = statusFiltro === "todos"
        || (statusFiltro === "online" && item.isOnline)
        || (statusFiltro === "offline" && !item.isOnline);

      const matchTurno = turnoFiltro === "todos" || item.turnoValue === turnoFiltro;

      return matchBusca && matchStatus && matchTurno;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (ordenacao) {
        case "nome_desc":
          return b.nome.localeCompare(a.nome, "pt-BR");
        case "status_desc":
          return Number(b.isOnline) - Number(a.isOnline) || a.nome.localeCompare(b.nome, "pt-BR");
        case "id_asc":
          return a.idCpf.localeCompare(b.idCpf, "pt-BR");
        case "turno_asc":
          return Number(a.turnoValue || 0) - Number(b.turnoValue || 0) || a.nome.localeCompare(b.nome, "pt-BR");
        case "nome_asc":
        default:
          return a.nome.localeCompare(b.nome, "pt-BR");
      }
    });

    return sorted;
  }, [busca, ordenacao, registros, statusFiltro, turnoFiltro]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, statusFiltro, turnoFiltro, ordenacao, itensPorPagina]);

  const totalPaginas = Math.max(1, Math.ceil(registrosFiltrados.length / itensPorPagina));

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas);
    }
  }, [paginaAtual, totalPaginas]);

  const registrosPaginados = useMemo(() => {
    const start = (paginaAtual - 1) * itensPorPagina;
    return registrosFiltrados.slice(start, start + itensPorPagina);
  }, [itensPorPagina, paginaAtual, registrosFiltrados]);

  const paginasVisiveis = useMemo(
    () => buildPaginationWindow(totalPaginas, paginaAtual),
    [totalPaginas, paginaAtual],
  );

  const faixaAtual = useMemo(() => {
    if (registrosFiltrados.length === 0) {
      return "0-0";
    }
    const inicio = (paginaAtual - 1) * itensPorPagina + 1;
    const fim = Math.min(paginaAtual * itensPorPagina, registrosFiltrados.length);
    return `${inicio}-${fim}`;
  }, [itensPorPagina, paginaAtual, registrosFiltrados.length]);

  const ultimaAtualizacaoFormatada = useMemo(() => {
    if (!ultimaAtualizacao) {
      return "--";
    }
    return ultimaAtualizacao.toLocaleTimeString("pt-BR");
  }, [ultimaAtualizacao]);

  const openAddModal = () => setIsModalAddOpen(true);

  const closeAddModal = () => {
    setIsModalAddOpen(false);
    fetchEntregadores();
  };

  const openProfileModal = (registro) => {
    setSelectedEntregador(registro.raw);
    setIsModalPerfilOpen(true);
  };

  const closeProfileModal = () => {
    setIsModalPerfilOpen(false);
    setSelectedEntregador(null);
    fetchEntregadores();
  };

  const exportarCsv = () => {
    if (registrosFiltrados.length === 0) {
      return;
    }

    const headers = ["Nome", "ID", "Telefone", "E-mail", "Conta bancária", "Turno", "Status"];
    const linhas = registrosFiltrados.map((item) => [
      item.nome,
      item.idCpf,
      item.telefone,
      item.email,
      item.contaBancaria,
      item.turnoLabel,
      item.statusLabel,
    ]);

    const csv = [headers, ...linhas]
      .map((line) => line.map((value) => buildCsvValue(value)).join(";"))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `entregadores-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={style.conteiner}>
      <section className={style.heroCard}>
        <div>
          <h2>Gestão de entregadores</h2>
          <p>
            Controle cadastros, disponibilidade e contato da equipe com filtros rápidos,
            exportação e navegação por páginas.
          </p>
          <small>Última atualização: {ultimaAtualizacaoFormatada}</small>
        </div>

        <div className={style.heroActions}>
          <button type="button" className={style.botaoGhost} onClick={fetchEntregadores}>
            Atualizar
          </button>
          <button
            type="button"
            className={style.botaoGhost}
            onClick={exportarCsv}
            disabled={registrosFiltrados.length === 0}
          >
            Exportar CSV
          </button>
          <button type="button" className={style.botaoAdicionar} onClick={openAddModal}>
            + Novo cadastro
          </button>
        </div>
      </section>

      <section className={style.statsGrid}>
        <article className={style.statCard}>
          <span>Total</span>
          <strong>{resumo.total}</strong>
          <small>Entregadores cadastrados</small>
        </article>
        <article className={`${style.statCard} ${style.statOnline}`}>
          <span>Online</span>
          <strong>{resumo.online}</strong>
          <small>Disponíveis agora</small>
        </article>
        <article className={`${style.statCard} ${style.statOffline}`}>
          <span>Offline</span>
          <strong>{resumo.offline}</strong>
          <small>Fora de operação</small>
        </article>
        <article className={style.statCard}>
          <span>Turnos</span>
          <strong>{`${resumo.manha}/${resumo.tarde}/${resumo.noite}`}</strong>
          <small>Manhã / Tarde / Noite</small>
        </article>
      </section>

      <section className={style.panel}>
        <div className={style.panelHead}>
          <h3>Lista de entregadores</h3>
          <p>{registrosFiltrados.length} resultado(s) com os filtros atuais.</p>
        </div>

        <div className={style.filtersRow}>
          <label className={style.searchField} htmlFor="buscaEntregador">
            Buscar por nome, ID, telefone ou e-mail
            <input
              id="buscaEntregador"
              type="search"
              value={busca}
              placeholder="Ex.: João, 12345678900, (11) 99999-9999..."
              onChange={(event) => setBusca(event.target.value)}
            />
          </label>

          <label htmlFor="statusFiltroEntregador">
            Status
            <select
              id="statusFiltroEntregador"
              value={statusFiltro}
              onChange={(event) => setStatusFiltro(event.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="turnoFiltroEntregador">
            Turno
            <select
              id="turnoFiltroEntregador"
              value={turnoFiltro}
              onChange={(event) => setTurnoFiltro(event.target.value)}
            >
              {TURNO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="ordenacaoEntregador">
            Ordenação
            <select
              id="ordenacaoEntregador"
              value={ordenacao}
              onChange={(event) => setOrdenacao(event.target.value)}
            >
              {ORDENACAO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <DataState
          loading={loading}
          error={errorMessage}
          empty={!loading && !errorMessage && registros.length === 0}
          emptyMessage="Nenhum entregador cadastrado ainda."
          errorMessage="Não foi possível carregar os entregadores."
          onRetry={fetchEntregadores}
        />

        {!loading && !errorMessage ? (
          <>
            <div className={style.tableWrap}>
              <table className={style.tabelaEntregadores}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>ID</th>
                    <th>Telefone</th>
                    <th>Turno</th>
                    <th>Status</th>
                    <th>Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  {registrosPaginados.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={style.emptyRow}>
                        Nenhum entregador encontrado com os filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    registrosPaginados.map((registro) => (
                      <tr key={registro.id}>
                        <td>{registro.nome}</td>
                        <td>{registro.idCpf}</td>
                        <td>{registro.telefone}</td>
                        <td>{registro.turnoLabel}</td>
                        <td>
                          <span
                            className={`${style.statusTag} ${
                              registro.isOnline ? style.statusOnline : style.statusOffline
                            }`}
                          >
                            <i />
                            {registro.statusLabel}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={style.botaoPerfil}
                            onClick={() => openProfileModal(registro)}
                            title="Ver perfil do entregador"
                          >
                            <img src={iconePerfil} alt="Perfil" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <footer className={style.footerTabela}>
              <label htmlFor="itensPaginaEntregador">
                Itens por página
                <select
                  id="itensPaginaEntregador"
                  value={itensPorPagina}
                  onChange={(event) => setItensPorPagina(Number(event.target.value))}
                >
                  {ITENS_POR_PAGINA_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <span>
                Exibindo {faixaAtual} de {registrosFiltrados.length}
              </span>

              <div className={style.pagination}>
                <button
                  type="button"
                  onClick={() => setPaginaAtual((current) => Math.max(1, current - 1))}
                  disabled={paginaAtual === 1}
                >
                  Anterior
                </button>

                {paginasVisiveis.map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={page === paginaAtual ? style.paginationAtiva : ""}
                    onClick={() => setPaginaAtual(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setPaginaAtual((current) => Math.min(totalPaginas, current + 1))}
                  disabled={paginaAtual === totalPaginas}
                >
                  Próxima
                </button>
              </div>
            </footer>
          </>
        ) : null}
      </section>

      <ModalAddEntregador isOpen={isModalAddOpen} onClose={closeAddModal} />
      <ModalPerfilEntregador
        isOpen={isModalPerfilOpen}
        onClose={closeProfileModal}
        entregador={selectedEntregador}
      />
    </div>
  );
}
