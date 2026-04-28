import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaFileCirclePlus, FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";
import { Container } from "./contratoempresa";

const STORAGE_KEY = "vel:contratos:empresa:v2";
const SORT_OPTIONS = [
  { value: "fim_asc", label: "Vencimento mais próximo" },
  { value: "fim_desc", label: "Vencimento mais distante" },
  { value: "valor_desc", label: "Maior valor mensal" },
  { value: "nome_asc", label: "Cliente (A-Z)" },
];
const STATUS_OPTIONS = [
  { value: "todos", label: "Todos os status" },
  { value: "ativo", label: "Ativo" },
  { value: "vencendo", label: "Vencendo" },
  { value: "vencido", label: "Vencido" },
];
const TIPO_OPTIONS = [
  { value: "todos", label: "Todos os tipos" },
  { value: "Restaurante", label: "Restaurante" },
  { value: "Operação de entrega", label: "Operação de entrega" },
  { value: "Dark kitchen", label: "Dark kitchen" },
];
const PAGE_SIZE_OPTIONS = [8, 12, 20];

const seedContracts = [
  {
    id: "CE-001",
    cliente: "Restaurante da Cida",
    cnpj: "12.345.678/0001-01",
    tipo: "Restaurante",
    inicio: "2025-06-01",
    fim: "2026-07-15",
    valorMensal: 690,
    renovacao: "Automática",
  },
  {
    id: "CE-002",
    cliente: "La Luna Culinária",
    cnpj: "98.123.456/0001-51",
    tipo: "Restaurante",
    inicio: "2025-08-20",
    fim: "2026-05-10",
    valorMensal: 810,
    renovacao: "Manual",
  },
  {
    id: "CE-003",
    cliente: "Chefs Garden",
    cnpj: "55.111.222/0001-39",
    tipo: "Dark kitchen",
    inicio: "2025-04-10",
    fim: "2026-04-29",
    valorMensal: 740,
    renovacao: "Automática",
  },
  {
    id: "CE-004",
    cliente: "LeveMoto Dom Casmurro",
    cnpj: "44.333.222/0001-99",
    tipo: "Operação de entrega",
    inicio: "2025-02-01",
    fim: "2026-09-01",
    valorMensal: 1280,
    renovacao: "Automática",
  },
  {
    id: "CE-005",
    cliente: "Quincas Borba Grill",
    cnpj: "67.890.123/0001-77",
    tipo: "Restaurante",
    inicio: "2024-09-01",
    fim: "2026-01-19",
    valorMensal: 590,
    renovacao: "Manual",
  },
  {
    id: "CE-006",
    cliente: "Living MotoClube",
    cnpj: "39.555.111/0001-11",
    tipo: "Operação de entrega",
    inicio: "2024-11-15",
    fim: "2025-12-01",
    valorMensal: 930,
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
    cliente: "",
    cnpj: "",
    tipo: "Restaurante",
    inicio: start,
    fim: end,
    valorMensal: "",
    renovacao: "Automática",
  };
}

export default function PaginaContratosEmpresa() {
  const [contratos, setContratos] = useState(getInitialContracts);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
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
    return contratos.map((item) => {
      const statusInfo = getStatusInfo(item.fim);
      return {
        ...item,
        statusInfo,
      };
    });
  }, [contratos]);

  const resumo = useMemo(() => {
    const total = contratosNormalizados.length;
    const ativos = contratosNormalizados.filter((item) => item.statusInfo.status === "ativo").length;
    const vencendo = contratosNormalizados.filter((item) => item.statusInfo.status === "vencendo").length;
    const vencidos = contratosNormalizados.filter((item) => item.statusInfo.status === "vencido").length;
    const totalMensal = contratosNormalizados.reduce((acc, item) => acc + (Number(item.valorMensal) || 0), 0);

    return {
      total,
      ativos,
      vencendo,
      vencidos,
      totalMensal,
    };
  }, [contratosNormalizados]);

  const contratosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const filtered = contratosNormalizados.filter((item) => {
      const matchBusca = !termo
        || item.id.toLowerCase().includes(termo)
        || item.cliente.toLowerCase().includes(termo)
        || item.cnpj.toLowerCase().includes(termo);

      const matchStatus = filtroStatus === "todos" || item.statusInfo.status === filtroStatus;
      const matchTipo = filtroTipo === "todos" || item.tipo === filtroTipo;

      return matchBusca && matchStatus && matchTipo;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (ordenacao) {
        case "fim_desc":
          return (parseDate(b.fim)?.getTime() || 0) - (parseDate(a.fim)?.getTime() || 0);
        case "valor_desc":
          return Number(b.valorMensal) - Number(a.valorMensal);
        case "nome_asc":
          return a.cliente.localeCompare(b.cliente, "pt-BR");
        case "fim_asc":
        default:
          return (parseDate(a.fim)?.getTime() || 0) - (parseDate(b.fim)?.getTime() || 0);
      }
    });
    return sorted;
  }, [busca, contratosNormalizados, filtroStatus, filtroTipo, ordenacao]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroStatus, filtroTipo, ordenacao, itensPorPagina]);

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

    if (!formData.cliente.trim() || !formData.cnpj.trim() || !formData.inicio || !formData.fim) {
      return;
    }

    const valor = Number(formData.valorMensal);
    if (!Number.isFinite(valor) || valor <= 0) {
      return;
    }

    const nextId = `CE-${String(contratos.length + 1).padStart(3, "0")}`;
    const novo = {
      id: nextId,
      cliente: formData.cliente.trim(),
      cnpj: formData.cnpj.trim(),
      tipo: formData.tipo,
      inicio: formData.inicio,
      fim: formData.fim,
      valorMensal: valor,
      renovacao: formData.renovacao,
    };

    setContratos((current) => [novo, ...current]);
    setFormData(getDefaultFormState());
    setNovoContratoAberto(false);
  };

  const handleDownload = (contrato) => {
    const status = contrato.statusInfo?.label || "Ativo";
    const content = [
      "VEL - Contrato Empresa",
      `ID: ${contrato.id}`,
      `Cliente: ${contrato.cliente}`,
      `CNPJ: ${contrato.cnpj}`,
      `Tipo: ${contrato.tipo}`,
      `Início: ${formatDateBR(contrato.inicio)}`,
      `Fim: ${formatDateBR(contrato.fim)}`,
      `Valor mensal: ${formatMoney(contrato.valorMensal)}`,
      `Renovação: ${contrato.renovacao}`,
      `Status: ${status}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${contrato.id}-${contrato.cliente.replaceAll(" ", "-").toLowerCase()}.txt`;
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
              <h1>Contratos da empresa</h1>
              <p>
                Controle ciclo de contratos, vencimentos e valores mensais com filtros rápidos,
                visualização detalhada e cadastro direto.
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
            <button type="button" className="tab active">Empresa</button>
            <Link to="/contratoentregador" className="tab">Entregador</Link>
          </section>

          <article className="metricCard">
            <span>Total de contratos</span>
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
            <span>MRR contratado</span>
            <strong>{formatMoney(resumo.totalMensal)}</strong>
          </article>

          <section className="panel">
            <div className="panelHead">
              <h2>Meus contratos</h2>
              <span>{contratosFiltrados.length} contrato(s)</span>
            </div>

            <div className="filtersRow">
              <label className="searchField" htmlFor="buscaContratoEmpresa">
                <FaMagnifyingGlass />
                <input
                  id="buscaContratoEmpresa"
                  type="search"
                  placeholder="Buscar por ID, cliente ou CNPJ"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                />
              </label>

              <label htmlFor="statusContratoEmpresa">
                <FaFilter />
                <select
                  id="statusContratoEmpresa"
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

              <label htmlFor="tipoContratoEmpresa">
                <FaFilter />
                <select
                  id="tipoContratoEmpresa"
                  value={filtroTipo}
                  onChange={(event) => setFiltroTipo(event.target.value)}
                >
                  {TIPO_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="ordenacaoContratoEmpresa">
                <FaCalendarCheck />
                <select
                  id="ordenacaoContratoEmpresa"
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
                    <th>Cliente</th>
                    <th>CNPJ</th>
                    <th>Tipo</th>
                    <th>Vigência</th>
                    <th>Valor mensal</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contratosPaginados.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="emptyRow">Nenhum contrato encontrado com os filtros aplicados.</td>
                    </tr>
                  ) : null}

                  {contratosPaginados.map((contrato) => (
                    <tr key={contrato.id}>
                      <td>{contrato.id}</td>
                      <td>{contrato.cliente}</td>
                      <td>{contrato.cnpj}</td>
                      <td>{contrato.tipo}</td>
                      <td>{`${formatDateBR(contrato.inicio)} - ${formatDateBR(contrato.fim)}`}</td>
                      <td>{formatMoney(contrato.valorMensal)}</td>
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
              <label htmlFor="itensPaginaContratoEmpresa">
                Itens por página
                <select
                  id="itensPaginaContratoEmpresa"
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
            <h3>Novo contrato de empresa</h3>

            <form className="formGrid" onSubmit={handleCreateContract}>
              <label htmlFor="clienteNovoContrato">
                Cliente
                <input
                  id="clienteNovoContrato"
                  name="cliente"
                  type="text"
                  value={formData.cliente}
                  onChange={handleFormChange}
                  placeholder="Nome do cliente"
                  required
                />
              </label>

              <label htmlFor="cnpjNovoContrato">
                CNPJ
                <input
                  id="cnpjNovoContrato"
                  name="cnpj"
                  type="text"
                  value={formData.cnpj}
                  onChange={handleFormChange}
                  placeholder="00.000.000/0001-00"
                  required
                />
              </label>

              <label htmlFor="tipoNovoContrato">
                Tipo
                <select id="tipoNovoContrato" name="tipo" value={formData.tipo} onChange={handleFormChange}>
                  {TIPO_OPTIONS.filter((item) => item.value !== "todos").map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="valorNovoContrato">
                Valor mensal (R$)
                <input
                  id="valorNovoContrato"
                  name="valorMensal"
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.valorMensal}
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
                <span>Cliente</span>
                <strong>{detalhe.cliente}</strong>
              </div>
              <div>
                <span>CNPJ</span>
                <strong>{detalhe.cnpj}</strong>
              </div>
              <div>
                <span>Tipo</span>
                <strong>{detalhe.tipo}</strong>
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
                <span>Valor mensal</span>
                <strong>{formatMoney(detalhe.valorMensal)}</strong>
              </div>
              <div>
                <span>Renovação</span>
                <strong>{detalhe.renovacao}</strong>
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
