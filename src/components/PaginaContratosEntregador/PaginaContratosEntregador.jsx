import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaFileCirclePlus, FaFilter, FaMagnifyingGlass, FaUserCheck } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";
import { Container } from "./contratoentregador.ts";

const STORAGE_KEY = "vel:contratos:entregador:v2";
const SORT_OPTIONS = [
  { value: "fim_asc", label: "Vencimento mais próximo" },
  { value: "fim_desc", label: "Vencimento mais distante" },
  { value: "valor_desc", label: "Maior valor base" },
  { value: "nome_asc", label: "Entregador (A-Z)" },
];
const STATUS_OPTIONS = [
  { value: "todos", label: "Todos os status" },
  { value: "ativo", label: "Ativo" },
  { value: "vencendo", label: "Vencendo" },
  { value: "vencido", label: "Vencido" },
];
const MODALIDADE_OPTIONS = [
  { value: "todos", label: "Todas as modalidades" },
  { value: "Moto", label: "Moto" },
  { value: "Bike", label: "Bike" },
  { value: "Carro", label: "Carro" },
];
const PAGE_SIZE_OPTIONS = [8, 12, 20];

const seedContracts = [
  {
    id: "CT-1001",
    entregador: "Douglas dos Santos",
    cpf: "123.456.789-00",
    idEmpresa: "E-01",
    modalidade: "Moto",
    inicio: "2025-07-01",
    fim: "2026-06-30",
    valorBase: 1450,
    renovacao: "Automática",
  },
  {
    id: "CT-1002",
    entregador: "Loney Silva",
    cpf: "987.654.321-00",
    idEmpresa: "E-01",
    modalidade: "Bike",
    inicio: "2025-11-10",
    fim: "2026-05-08",
    valorBase: 1180,
    renovacao: "Manual",
  },
  {
    id: "CT-1003",
    entregador: "André Costa",
    cpf: "331.210.120-89",
    idEmpresa: "E-03",
    modalidade: "Moto",
    inicio: "2024-08-01",
    fim: "2026-01-25",
    valorBase: 1320,
    renovacao: "Automática",
  },
  {
    id: "CT-1004",
    entregador: "Don Carlos",
    cpf: "500.900.120-98",
    idEmpresa: "E-06",
    modalidade: "Carro",
    inicio: "2025-02-15",
    fim: "2025-11-28",
    valorBase: 1590,
    renovacao: "Manual",
  },
  {
    id: "CT-1005",
    entregador: "Jefferson Souza Silva",
    cpf: "612.000.920-74",
    idEmpresa: "E-03",
    modalidade: "Moto",
    inicio: "2025-01-01",
    fim: "2026-09-01",
    valorBase: 1410,
    renovacao: "Automática",
  },
  {
    id: "CT-1006",
    entregador: "Doubly Souza Silva",
    cpf: "123.000.111-44",
    idEmpresa: "E-05",
    modalidade: "Bike",
    inicio: "2024-12-01",
    fim: "2025-10-30",
    valorBase: 1050,
    renovacao: "Manual",
  },
];

function parseDate(value) {
  if (!value) {
    return null;
  }
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateBR(value) {
  const date = parseDate(value);
  if (!date) {
    return "--/--/----";
  }
  return date.toLocaleDateString("pt-BR");
}

function formatMoney(value) {
  return `R$ ${new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value) || 0)}`;
}

function getStatusInfo(endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = parseDate(endDate);
  if (!end) {
    return { status: "ativo", label: "Ativo", tone: "ok", daysLeft: null };
  }

  const daysLeft = Math.floor((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) {
    return { status: "vencido", label: "Vencido", tone: "danger", daysLeft };
  }
  if (daysLeft <= 30) {
    return { status: "vencendo", label: "Vencendo", tone: "warn", daysLeft };
  }
  return { status: "ativo", label: "Ativo", tone: "ok", daysLeft };
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

function getInitialContracts() {
  if (typeof window === "undefined") {
    return seedContracts;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return seedContracts;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : seedContracts;
  } catch {
    return seedContracts;
  }
}

function getDefaultFormState() {
  const today = new Date();
  const start = today.toISOString().slice(0, 10);
  const endDate = new Date(today);
  endDate.setFullYear(today.getFullYear() + 1);
  const end = endDate.toISOString().slice(0, 10);

  return {
    entregador: "",
    cpf: "",
    idEmpresa: "",
    modalidade: "Moto",
    inicio: start,
    fim: end,
    valorBase: "",
    renovacao: "Automática",
  };
}

export default function PaginaContratosEntregador() {
  const [contratos, setContratos] = useState(getInitialContracts);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroModalidade, setFiltroModalidade] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("fim_asc");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(8);
  const [detalhe, setDetalhe] = useState(null);
  const [novoContratoAberto, setNovoContratoAberto] = useState(false);
  const [formData, setFormData] = useState(getDefaultFormState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contratos));
  }, [contratos]);

  const contratosNormalizados = useMemo(() => {
    return contratos.map((item) => ({
      ...item,
      statusInfo: getStatusInfo(item.fim),
    }));
  }, [contratos]);

  const resumo = useMemo(() => {
    const total = contratosNormalizados.length;
    const ativos = contratosNormalizados.filter((item) => item.statusInfo.status === "ativo").length;
    const vencendo = contratosNormalizados.filter((item) => item.statusInfo.status === "vencendo").length;
    const vencidos = contratosNormalizados.filter((item) => item.statusInfo.status === "vencido").length;
    const folhaBase = contratosNormalizados.reduce((acc, item) => acc + (Number(item.valorBase) || 0), 0);
    return { total, ativos, vencendo, vencidos, folhaBase };
  }, [contratosNormalizados]);

  const contratosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const filtered = contratosNormalizados.filter((item) => {
      const matchBusca = !termo
        || item.id.toLowerCase().includes(termo)
        || item.entregador.toLowerCase().includes(termo)
        || item.cpf.toLowerCase().includes(termo)
        || item.idEmpresa.toLowerCase().includes(termo);

      const matchStatus = filtroStatus === "todos" || item.statusInfo.status === filtroStatus;
      const matchModalidade = filtroModalidade === "todos" || item.modalidade === filtroModalidade;

      return matchBusca && matchStatus && matchModalidade;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (ordenacao) {
        case "fim_desc":
          return (parseDate(b.fim)?.getTime() || 0) - (parseDate(a.fim)?.getTime() || 0);
        case "valor_desc":
          return Number(b.valorBase) - Number(a.valorBase);
        case "nome_asc":
          return a.entregador.localeCompare(b.entregador, "pt-BR");
        case "fim_asc":
        default:
          return (parseDate(a.fim)?.getTime() || 0) - (parseDate(b.fim)?.getTime() || 0);
      }
    });
    return sorted;
  }, [busca, contratosNormalizados, filtroModalidade, filtroStatus, ordenacao]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroStatus, filtroModalidade, ordenacao, itensPorPagina]);

  const totalPaginas = Math.max(1, Math.ceil(contratosFiltrados.length / itensPorPagina));

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas);
    }
  }, [paginaAtual, totalPaginas]);

  const contratosPaginados = useMemo(() => {
    const start = (paginaAtual - 1) * itensPorPagina;
    return contratosFiltrados.slice(start, start + itensPorPagina);
  }, [contratosFiltrados, itensPorPagina, paginaAtual]);

  const paginasVisiveis = useMemo(
    () => buildPaginationWindow(totalPaginas, paginaAtual),
    [totalPaginas, paginaAtual],
  );

  const faixaAtual = useMemo(() => {
    if (contratosFiltrados.length === 0) {
      return "0-0";
    }
    const inicio = (paginaAtual - 1) * itensPorPagina + 1;
    const fim = Math.min(paginaAtual * itensPorPagina, contratosFiltrados.length);
    return `${inicio}-${fim}`;
  }, [contratosFiltrados.length, itensPorPagina, paginaAtual]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleCreateContract = (event) => {
    event.preventDefault();

    if (!formData.entregador.trim() || !formData.cpf.trim() || !formData.idEmpresa.trim() || !formData.inicio || !formData.fim) {
      return;
    }

    const valor = Number(formData.valorBase);
    if (!Number.isFinite(valor) || valor <= 0) {
      return;
    }

    const nextId = `CT-${String(1000 + contratos.length + 1)}`;
    const novo = {
      id: nextId,
      entregador: formData.entregador.trim(),
      cpf: formData.cpf.trim(),
      idEmpresa: formData.idEmpresa.trim(),
      modalidade: formData.modalidade,
      inicio: formData.inicio,
      fim: formData.fim,
      valorBase: valor,
      renovacao: formData.renovacao,
    };

    setContratos((current) => [novo, ...current]);
    setFormData(getDefaultFormState());
    setNovoContratoAberto(false);
  };

  const handleDownload = (contrato) => {
    const content = [
      "VEL - Contrato Entregador",
      `ID: ${contrato.id}`,
      `Entregador: ${contrato.entregador}`,
      `CPF: ${contrato.cpf}`,
      `ID Empresa: ${contrato.idEmpresa}`,
      `Modalidade: ${contrato.modalidade}`,
      `Início: ${formatDateBR(contrato.inicio)}`,
      `Fim: ${formatDateBR(contrato.fim)}`,
      `Valor base: ${formatMoney(contrato.valorBase)}`,
      `Renovação: ${contrato.renovacao}`,
      `Status: ${contrato.statusInfo.label}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${contrato.id}-${contrato.entregador.replaceAll(" ", "-").toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Container>
      <MenuLateral pagina="Contrato" />

      <main className="contratosMain">
        <div className="contratosGrid">
          <section className="heroCard">
            <div>
              <h1>Contratos de entregadores</h1>
              <p>
                Gerencie vínculos por entregador, status de vencimento e valor base com filtros,
                visualização rápida e cadastro direto.
              </p>
            </div>

            <div className="heroActions">
              <button type="button" onClick={() => setNovoContratoAberto(true)}>
                <FaFileCirclePlus />
                Novo contrato
              </button>
            </div>
          </section>

          <section className="tabsCard">
            <Link to="/contratoempregador" className="tab">Empresa</Link>
            <button type="button" className="tab active">Entregador</button>
          </section>

          <article className="metricCard">
            <span>Total de vínculos</span>
            <strong>{resumo.total}</strong>
          </article>

          <article className="metricCard">
            <span>Ativos</span>
            <strong>{resumo.ativos}</strong>
          </article>

          <article className="metricCard">
            <span>Vencendo em até 30 dias</span>
            <strong>{resumo.vencendo}</strong>
          </article>

          <article className="metricCard">
            <span>Folha base mensal</span>
            <strong>{formatMoney(resumo.folhaBase)}</strong>
          </article>

          <section className="panel">
            <div className="panelHead">
              <h2>Vínculos ativos e históricos</h2>
              <span>{contratosFiltrados.length} contrato(s)</span>
            </div>

            <div className="filtersRow">
              <label className="searchField" htmlFor="buscaContratoEntregador">
                <FaMagnifyingGlass />
                <input
                  id="buscaContratoEntregador"
                  type="search"
                  placeholder="Buscar por ID, entregador, CPF ou empresa"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                />
              </label>

              <label htmlFor="statusContratoEntregador">
                <FaFilter />
                <select
                  id="statusContratoEntregador"
                  value={filtroStatus}
                  onChange={(event) => setFiltroStatus(event.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="modalidadeContratoEntregador">
                <FaUserCheck />
                <select
                  id="modalidadeContratoEntregador"
                  value={filtroModalidade}
                  onChange={(event) => setFiltroModalidade(event.target.value)}
                >
                  {MODALIDADE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="ordenacaoContratoEntregador">
                <FaCalendarCheck />
                <select
                  id="ordenacaoContratoEntregador"
                  value={ordenacao}
                  onChange={(event) => setOrdenacao(event.target.value)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Entregador</th>
                    <th>CPF</th>
                    <th>ID Empresa</th>
                    <th>Modalidade</th>
                    <th>Vigência</th>
                    <th>Valor base</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contratosPaginados.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="emptyRow">Nenhum contrato encontrado com os filtros aplicados.</td>
                    </tr>
                  ) : null}

                  {contratosPaginados.map((contrato) => (
                    <tr key={contrato.id}>
                      <td>{contrato.id}</td>
                      <td>{contrato.entregador}</td>
                      <td>{contrato.cpf}</td>
                      <td>{contrato.idEmpresa}</td>
                      <td>{contrato.modalidade}</td>
                      <td>{`${formatDateBR(contrato.inicio)} - ${formatDateBR(contrato.fim)}`}</td>
                      <td>{formatMoney(contrato.valorBase)}</td>
                      <td>
                        <span className={`statusTag ${contrato.statusInfo.tone}`}>{contrato.statusInfo.label}</span>
                      </td>
                      <td>
                        <div className="actions">
                          <button type="button" className="iconBtn" onClick={() => handleDownload(contrato)} title="Baixar contrato">
                            <PiFileArrowDownDuotone />
                          </button>
                          <button type="button" className="iconBtn" onClick={() => setDetalhe(contrato)} title="Ver detalhes">
                            <IoMdEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className="tableFooter">
              <label htmlFor="itensPaginaContratoEntregador">
                Itens por página
                <select
                  id="itensPaginaContratoEntregador"
                  value={itensPorPagina}
                  onChange={(event) => setItensPorPagina(Number(event.target.value))}
                >
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <span>
                Exibindo {faixaAtual} de {contratosFiltrados.length}
              </span>

              <div className="pagination">
                <button type="button" onClick={() => setPaginaAtual((current) => Math.max(1, current - 1))} disabled={paginaAtual === 1}>
                  Anterior
                </button>

                {paginasVisiveis.map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={page === paginaAtual ? "active" : ""}
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
          </section>
        </div>
      </main>

      {novoContratoAberto ? (
        <div className="modalBackdrop" role="presentation" onClick={() => setNovoContratoAberto(false)}>
          <dialog className="modalCard" open onClick={(event) => event.stopPropagation()}>
            <button type="button" className="closeBtn" onClick={() => setNovoContratoAberto(false)} aria-label="Fechar modal">
              ×
            </button>
            <h3>Novo contrato de entregador</h3>

            <form className="formGrid" onSubmit={handleCreateContract}>
              <label htmlFor="entregadorNovoContrato">
                Entregador
                <input
                  id="entregadorNovoContrato"
                  name="entregador"
                  type="text"
                  value={formData.entregador}
                  onChange={handleFormChange}
                  placeholder="Nome completo"
                  required
                />
              </label>

              <label htmlFor="cpfNovoContrato">
                CPF
                <input
                  id="cpfNovoContrato"
                  name="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={handleFormChange}
                  placeholder="000.000.000-00"
                  required
                />
              </label>

              <label htmlFor="empresaNovoContrato">
                ID empresa
                <input
                  id="empresaNovoContrato"
                  name="idEmpresa"
                  type="text"
                  value={formData.idEmpresa}
                  onChange={handleFormChange}
                  placeholder="E-01"
                  required
                />
              </label>

              <label htmlFor="modalidadeNovoContrato">
                Modalidade
                <select id="modalidadeNovoContrato" name="modalidade" value={formData.modalidade} onChange={handleFormChange}>
                  {MODALIDADE_OPTIONS.filter((item) => item.value !== "todos").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="valorNovoContrato">
                Valor base mensal (R$)
                <input
                  id="valorNovoContrato"
                  name="valorBase"
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.valorBase}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label htmlFor="inicioNovoContrato">
                Início
                <input
                  id="inicioNovoContrato"
                  name="inicio"
                  type="date"
                  value={formData.inicio}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label htmlFor="fimNovoContrato">
                Fim
                <input
                  id="fimNovoContrato"
                  name="fim"
                  type="date"
                  value={formData.fim}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label htmlFor="renovacaoNovoContrato" className="fullRow">
                Renovação
                <select id="renovacaoNovoContrato" name="renovacao" value={formData.renovacao} onChange={handleFormChange}>
                  <option value="Automática">Automática</option>
                  <option value="Manual">Manual</option>
                </select>
              </label>

              <div className="formActions fullRow">
                <button type="button" className="ghost" onClick={() => setNovoContratoAberto(false)}>
                  Cancelar
                </button>
                <button type="submit" className="primary">
                  Salvar contrato
                </button>
              </div>
            </form>
          </dialog>
        </div>
      ) : null}

      {detalhe ? (
        <div className="modalBackdrop" role="presentation" onClick={() => setDetalhe(null)}>
          <dialog className="modalCard detail" open onClick={(event) => event.stopPropagation()}>
            <button type="button" className="closeBtn" onClick={() => setDetalhe(null)} aria-label="Fechar detalhes">
              ×
            </button>
            <h3>Detalhes do contrato</h3>

            <div className="detailGrid">
              <div>
                <span>ID</span>
                <strong>{detalhe.id}</strong>
              </div>
              <div>
                <span>Entregador</span>
                <strong>{detalhe.entregador}</strong>
              </div>
              <div>
                <span>CPF</span>
                <strong>{detalhe.cpf}</strong>
              </div>
              <div>
                <span>ID empresa</span>
                <strong>{detalhe.idEmpresa}</strong>
              </div>
              <div>
                <span>Modalidade</span>
                <strong>{detalhe.modalidade}</strong>
              </div>
              <div>
                <span>Início</span>
                <strong>{formatDateBR(detalhe.inicio)}</strong>
              </div>
              <div>
                <span>Fim</span>
                <strong>{formatDateBR(detalhe.fim)}</strong>
              </div>
              <div>
                <span>Valor base</span>
                <strong>{formatMoney(detalhe.valorBase)}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{detalhe.statusInfo.label}</strong>
              </div>
            </div>
          </dialog>
        </div>
      ) : null}
    </Container>
  );
}
