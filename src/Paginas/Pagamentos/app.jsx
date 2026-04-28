import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaCalendarDay,
  FaCalendarWeek,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
  FaClockRotateLeft,
  FaFilter,
  FaMagnifyingGlass,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa6";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import formatarNumeroBR from "../../components/FormatarNumeroBR/FormatarNumeroBR.jsx";
import { Container } from "./pagamentos.ts";
import GlobalStyle from "../../components/globalStyles";
import { apiFetchJson } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { useAuth } from "../../contexts/AuthContext";
import DataState from "../../components/DataState.jsx";

const SORT_OPTIONS = [
  { value: "data_desc", label: "Mais recentes" },
  { value: "data_asc", label: "Mais antigos" },
  { value: "valor_desc", label: "Maior valor" },
  { value: "valor_asc", label: "Menor valor" },
  { value: "nome_asc", label: "Nome (A-Z)" },
];

const FILTER_OPTIONS = [
  { value: "todos", label: "Todos" },
  { value: "ate100", label: "Até R$ 100" },
  { value: "de100a500", label: "R$ 100 a R$ 500" },
  { value: "acima500", label: "Acima de R$ 500" },
];

const RESULT_OPTIONS = [
  { value: "todos", label: "Todos os resultados" },
  { value: "positivo", label: "Líquido positivo" },
  { value: "negativo", label: "Líquido negativo" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50];

function getCurrentYearMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function parseIsoDate(value) {
  if (!value || typeof value !== "string") {
    return null;
  }
  const normalized = value.includes("T") ? value : `${value}T00:00:00`;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateBR(date) {
  if (!date) {
    return "--/--/----";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatMoney(value) {
  return `R$ ${formatarNumeroBR(Number(value) || 0)}`;
}

function isSameDay(date, baseDate) {
  return (
    date.getDate() === baseDate.getDate()
    && date.getMonth() === baseDate.getMonth()
    && date.getFullYear() === baseDate.getFullYear()
  );
}

function getWeekBounds(referenceDate) {
  const base = new Date(referenceDate);
  const day = base.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const start = new Date(base);
  start.setDate(base.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

function getStatusInfo(registro) {
  if (registro.lucro >= 0) {
    return { label: "Saudável", tone: "ok" };
  }
  return { label: "Atenção", tone: "warn" };
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

function StatsCard({ title, value, hint, icon, tone = "blue" }) {
  return (
    <article className={`statsCard ${tone}`}>
      <header>
        <span>{title}</span>
        <i>{icon}</i>
      </header>
      <strong>{value}</strong>
      <small>{hint}</small>
    </article>
  );
}

function DailyTrendChart({ points }) {
  if (!points || points.length === 0) {
    return <div className="chartFallback">Sem dados para gerar tendência.</div>;
  }

  const width = 860;
  const height = 230;
  const padding = { top: 18, right: 18, bottom: 34, left: 44 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const stepX = points.length > 1 ? innerWidth / (points.length - 1) : innerWidth;

  const getX = (index) => padding.left + index * stepX;
  const getY = (value) => padding.top + (1 - value / maxValue) * innerHeight;

  const linePoints = points.map((point, index) => `${getX(index)},${getY(point.value)}`).join(" ");

  const areaPath = [
    `M ${getX(0)} ${padding.top + innerHeight}`,
    ...points.map((point, index) => `L ${getX(index)} ${getY(point.value)}`),
    `L ${getX(points.length - 1)} ${padding.top + innerHeight}`,
    "Z",
  ].join(" ");

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const value = maxValue * ratio;
    return {
      y: getY(value),
      value,
    };
  });

  return (
    <svg className="trendChart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Tendência diária de pagamentos dos últimos 30 dias">
      {yTicks.map((tick) => (
        <g key={tick.y}>
          <line x1={padding.left} y1={tick.y} x2={width - padding.right} y2={tick.y} className="gridLine" />
          <text x={6} y={tick.y + 4} className="axisLabel">
            {formatarNumeroBR(Math.round(tick.value))}
          </text>
        </g>
      ))}

      <path d={areaPath} className="trendArea" />
      <polyline points={linePoints} className="trendLine" />

      {points.map((point, index) => {
        if (index % 5 !== 0 && index !== points.length - 1) {
          return null;
        }
        return (
          <text key={point.key} x={getX(index)} y={height - 10} textAnchor="middle" className="axisLabel">
            {point.label}
          </text>
        );
      })}
    </svg>
  );
}

function App() {
  const { userId } = useAuth();

  const [listaEntregadores, setListaEntregadores] = useState([]);
  const [listaFaturamento, setListaFaturamento] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState(getCurrentYearMonth);
  const [busca, setBusca] = useState("");
  const [filtroValor, setFiltroValor] = useState("todos");
  const [filtroResultado, setFiltroResultado] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("data_desc");
  const [registroDetalhe, setRegistroDetalhe] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

  const fetchPagamentosData = useCallback(async () => {
    if (userId === null || userId === undefined) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const [entregadores, faturamentos] = await Promise.all([
        apiFetchJson(`/entregador/${userId}`),
        apiFetchJson(`/faturamento/${userId}`),
      ]);

      setListaEntregadores(Array.isArray(entregadores) ? entregadores : []);
      setListaFaturamento(Array.isArray(faturamentos) ? faturamentos : []);
      setUltimaAtualizacao(new Date());
    } catch (error) {
      setErrorMessage(error.message || "Falha ao carregar pagamentos.");
      notifyApiError(error, "Erro na requisição de dados. Tente recarregar a página.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPagamentosData();
  }, [fetchPagamentosData]);

  const registrosNormalizados = useMemo(() => {
    return listaFaturamento.map((item, index) => {
      const date = parseIsoDate(item.data);
      const ganho = Number(item.ganho) || 0;
      const despesa = Number(item.despesa) || 0;
      const lucro = ganho - despesa;

      const entregadorNome = item.entregador?.nome || "Sem entregador";
      const idCpf = item.entregador?.idCpf;
      const entregadorId = idCpf ? `#${idCpf}` : "--";
      const yearMonth = date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        : "";

      return {
        key: `${idCpf || "sem-id"}-${item.data || "sem-data"}-${index}`,
        date,
        dateLabel: formatDateBR(date),
        yearMonth,
        ganho,
        despesa,
        lucro,
        entregadorNome,
        entregadorId,
      };
    });
  }, [listaFaturamento]);

  const registrosDoMes = useMemo(() => {
    if (!mesSelecionado) {
      return registrosNormalizados;
    }
    return registrosNormalizados.filter((registro) => registro.yearMonth === mesSelecionado);
  }, [mesSelecionado, registrosNormalizados]);

  const registrosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    const filtrados = registrosDoMes.filter((registro) => {
      const matchSearch = termo.length === 0
        || registro.entregadorNome.toLowerCase().includes(termo)
        || registro.entregadorId.toLowerCase().includes(termo)
        || registro.dateLabel.includes(termo);

      if (!matchSearch) {
        return false;
      }

      if (filtroValor === "ate100" && registro.ganho > 100) {
        return false;
      }
      if (filtroValor === "de100a500" && (registro.ganho < 100 || registro.ganho > 500)) {
        return false;
      }
      if (filtroValor === "acima500" && registro.ganho <= 500) {
        return false;
      }

      if (filtroResultado === "positivo" && registro.lucro < 0) {
        return false;
      }
      if (filtroResultado === "negativo" && registro.lucro >= 0) {
        return false;
      }

      return true;
    });

    const sorted = [...filtrados];
    sorted.sort((a, b) => {
      if (ordenacao === "data_asc") {
        return (a.date?.getTime() || 0) - (b.date?.getTime() || 0);
      }
      if (ordenacao === "valor_desc") {
        return b.ganho - a.ganho;
      }
      if (ordenacao === "valor_asc") {
        return a.ganho - b.ganho;
      }
      if (ordenacao === "nome_asc") {
        return a.entregadorNome.localeCompare(b.entregadorNome, "pt-BR");
      }
      return (b.date?.getTime() || 0) - (a.date?.getTime() || 0);
    });

    return sorted;
  }, [busca, filtroResultado, filtroValor, ordenacao, registrosDoMes]);

  const resumoMes = useMemo(() => {
    return registrosDoMes.reduce(
      (acc, item) => {
        acc.ganho += item.ganho;
        acc.despesa += item.despesa;
        acc.lucro += item.lucro;
        acc.registros += 1;
        return acc;
      },
      { ganho: 0, despesa: 0, lucro: 0, registros: 0 },
    );
  }, [registrosDoMes]);

  const resumoHojeSemana = useMemo(() => {
    const now = new Date();
    const { start, end } = getWeekBounds(now);

    let ganhoHoje = 0;
    let ganhoSemana = 0;

    registrosNormalizados.forEach((item) => {
      if (!item.date) {
        return;
      }
      if (isSameDay(item.date, now)) {
        ganhoHoje += item.ganho;
      }
      if (item.date >= start && item.date <= end) {
        ganhoSemana += item.ganho;
      }
    });

    return { ganhoHoje, ganhoSemana };
  }, [registrosNormalizados]);

  const tendenciaDiaria = useMemo(() => {
    const end = new Date();
    end.setHours(0, 0, 0, 0);

    const start = new Date(end);
    start.setDate(end.getDate() - 29);

    const dailyMap = new Map();
    registrosNormalizados.forEach((registro) => {
      if (!registro.date) {
        return;
      }

      const current = new Date(registro.date);
      current.setHours(0, 0, 0, 0);
      if (current < start || current > end) {
        return;
      }

      const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;
      dailyMap.set(key, (dailyMap.get(key) || 0) + registro.ganho);
    });

    const points = [];
    let total = 0;

    for (let i = 0; i < 30; i += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const value = dailyMap.get(key) || 0;
      total += value;
      points.push({
        key,
        label: `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`,
        value,
      });
    }

    const melhorDia = points.reduce(
      (best, point) => (point.value > best.value ? point : best),
      { key: "", label: "--/--", value: 0 },
    );

    return {
      points,
      total,
      media: total / 30,
      melhorDia,
    };
  }, [registrosNormalizados]);

  const ticketMedio = resumoMes.registros > 0 ? resumoMes.ganho / resumoMes.registros : 0;
  const taxaDespesas = resumoMes.ganho > 0 ? Math.round((resumoMes.despesa / resumoMes.ganho) * 100) : 0;

  const rankingEntregadores = useMemo(() => {
    const mapa = new Map();

    registrosDoMes.forEach((registro) => {
      const key = `${registro.entregadorNome}-${registro.entregadorId}`;
      const atual = mapa.get(key) || {
        key,
        nome: registro.entregadorNome,
        id: registro.entregadorId,
        ganho: 0,
        lucro: 0,
        registros: 0,
      };

      atual.ganho += registro.ganho;
      atual.lucro += registro.lucro;
      atual.registros += 1;
      mapa.set(key, atual);
    });

    return [...mapa.values()].sort((a, b) => b.ganho - a.ganho).slice(0, 5);
  }, [registrosDoMes]);

  const totalPaginas = useMemo(() => {
    return Math.max(1, Math.ceil(registrosFiltrados.length / itensPorPagina));
  }, [registrosFiltrados.length, itensPorPagina]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroValor, filtroResultado, ordenacao, mesSelecionado, itensPorPagina]);

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas);
    }
  }, [paginaAtual, totalPaginas]);

  const registrosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return registrosFiltrados.slice(inicio, fim);
  }, [itensPorPagina, paginaAtual, registrosFiltrados]);

  const janelaPaginacao = useMemo(() => buildPaginationWindow(totalPaginas, paginaAtual), [paginaAtual, totalPaginas]);

  const exportCsv = () => {
    if (registrosFiltrados.length === 0) {
      return;
    }

    const headers = ["Nome", "ID", "Data", "Receita", "Despesa", "Líquido", "Status"];
    const lines = registrosFiltrados.map((registro) => {
      const status = getStatusInfo(registro);
      return [
        registro.entregadorNome,
        registro.entregadorId,
        registro.dateLabel,
        registro.ganho.toFixed(2),
        registro.despesa.toFixed(2),
        registro.lucro.toFixed(2),
        status.label,
      ].join(";");
    });

    const csvContent = [headers.join(";"), ...lines].join("\n");
    const blob = new Blob([`﻿${csvContent}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `pagamentos_${mesSelecionado || "geral"}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const limparFiltros = () => {
    setBusca("");
    setFiltroValor("todos");
    setFiltroResultado("todos");
    setOrdenacao("data_desc");
  };

  const inicioAtual = registrosFiltrados.length === 0 ? 0 : (paginaAtual - 1) * itensPorPagina + 1;
  const fimAtual = Math.min(paginaAtual * itensPorPagina, registrosFiltrados.length);

  return (
    <Container>
      <GlobalStyle />
      <MenuLateral pagina="Pagamentos" />

      <main className="pagamentosMain">
        <DataState
          loading={loading}
          error={errorMessage}
          empty={!loading && !errorMessage && listaFaturamento.length === 0}
          emptyMessage="Nenhum pagamento encontrado para o período."
          errorMessage="Não foi possível carregar os pagamentos."
          onRetry={fetchPagamentosData}
        />

        {!loading && !errorMessage ? (
          <section className="pagamentosGrid">
            <header className="heroCard">
              <div>
                <h1>Pagamentos</h1>
                <p>
                  Controle de repasses por entregador com filtros rápidos, status de líquido e exportação para análise.
                </p>
                <small>
                  Última atualização: {ultimaAtualizacao ? ultimaAtualizacao.toLocaleTimeString("pt-BR") : "--"}
                </small>
              </div>

              <div className="heroActions">
                <label htmlFor="mesFiltro">Mês de referência</label>
                <input
                  id="mesFiltro"
                  type="month"
                  value={mesSelecionado}
                  onChange={(event) => setMesSelecionado(event.target.value)}
                />
                <button type="button" onClick={fetchPagamentosData}>
                  <FaClockRotateLeft aria-hidden />
                  Atualizar
                </button>
              </div>
            </header>

            <StatsCard
              title="Receita hoje"
              value={formatMoney(resumoHojeSemana.ganhoHoje)}
              hint="Somatório dos ganhos de hoje"
              icon={<FaCalendarDay aria-hidden />}
              tone="blue"
            />
            <StatsCard
              title="Receita da semana"
              value={formatMoney(resumoHojeSemana.ganhoSemana)}
              hint="Período de segunda a domingo"
              icon={<FaCalendarWeek aria-hidden />}
              tone="teal"
            />
            <StatsCard
              title="Líquido do mês"
              value={formatMoney(resumoMes.lucro)}
              hint={`Despesas representam ${taxaDespesas}% da receita`}
              icon={<FaArrowTrendUp aria-hidden />}
              tone={resumoMes.lucro >= 0 ? "green" : "orange"}
            />
            <StatsCard
              title="Ticket médio"
              value={formatMoney(ticketMedio)}
              hint={`${resumoMes.registros} registro(s) no mês`}
              icon={<FaMoneyBillWave aria-hidden />}
              tone="purple"
            />

            <article className="panel trendPanel">
              <div className="panelHead">
                <h2>
                  <FaChartLine aria-hidden />
                  Tendência diária (últimos 30 dias)
                </h2>
              </div>

              <DailyTrendChart points={tendenciaDiaria.points} />

              <div className="trendResume">
                <p>
                  Total no período: <strong>{formatMoney(tendenciaDiaria.total)}</strong>
                </p>
                <p>
                  Média diária: <strong>{formatMoney(tendenciaDiaria.media)}</strong>
                </p>
                <p>
                  Melhor dia: <strong>{tendenciaDiaria.melhorDia.label}</strong> ({formatMoney(tendenciaDiaria.melhorDia.value)})
                </p>
              </div>
            </article>

            <article className="panel rankingPanel">
              <div className="panelHead">
                <h2>
                  <FaUsers aria-hidden />
                  Top entregadores ({mesSelecionado || "geral"})
                </h2>
              </div>

              <ul className="rankingList">
                {rankingEntregadores.length === 0 ? (
                  <li className="emptyLine">Sem dados para o mês selecionado.</li>
                ) : null}

                {rankingEntregadores.map((item, index) => (
                  <li key={item.key}>
                    <div>
                      <strong>
                        #{index + 1} {item.nome}
                      </strong>
                      <small>
                        {item.id} - {item.registros} registro(s)
                      </small>
                    </div>
                    <span>{formatMoney(item.ganho)}</span>
                  </li>
                ))}
              </ul>

              <div className="extraInfo">
                <p>
                  <FaArrowTrendDown aria-hidden />
                  Despesas do mês: <strong>{formatMoney(resumoMes.despesa)}</strong>
                </p>
                <p>
                  Receita filtrada atual: <strong>{formatMoney(registrosFiltrados.reduce((acc, item) => acc + item.ganho, 0))}</strong>
                </p>
                <p>
                  Entregadores ativos no sistema: <strong>{listaEntregadores.length}</strong>
                </p>
              </div>
            </article>

            <article className="panel tablePanel">
              <div className="panelHead">
                <h2>
                  <FaFilter aria-hidden />
                  Filtros e listagem
                </h2>
                <div className="headActions">
                  <button type="button" onClick={exportCsv} disabled={registrosFiltrados.length === 0}>
                    Exportar CSV
                  </button>
                  <button type="button" className="ghost" onClick={limparFiltros}>
                    Limpar filtros
                  </button>
                </div>
              </div>

              <div className="filtersRow">
                <label className="searchField" htmlFor="buscaPagamento">
                  <FaMagnifyingGlass aria-hidden />
                  <input
                    id="buscaPagamento"
                    type="search"
                    placeholder="Buscar por nome, ID ou data"
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                  />
                </label>

                <select value={filtroValor} onChange={(event) => setFiltroValor(event.target.value)}>
                  {FILTER_OPTIONS.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select value={filtroResultado} onChange={(event) => setFiltroResultado(event.target.value)}>
                  {RESULT_OPTIONS.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select value={ordenacao} onChange={(event) => setOrdenacao(event.target.value)}>
                  {SORT_OPTIONS.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>Entregador</th>
                      <th>ID</th>
                      <th>Data</th>
                      <th>Receita</th>
                      <th>Despesa</th>
                      <th>Líquido</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosPaginados.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="emptyCell">
                          Nenhum registro para os filtros aplicados.
                        </td>
                      </tr>
                    ) : null}

                    {registrosPaginados.map((registro) => {
                      const status = getStatusInfo(registro);
                      return (
                        <tr key={registro.key}>
                          <td>{registro.entregadorNome}</td>
                          <td>{registro.entregadorId}</td>
                          <td>{registro.dateLabel}</td>
                          <td>{formatMoney(registro.ganho)}</td>
                          <td>{formatMoney(registro.despesa)}</td>
                          <td className={registro.lucro >= 0 ? "liquidoPositivo" : "liquidoNegativo"}>
                            {formatMoney(registro.lucro)}
                          </td>
                          <td>
                            <span className={`statusTag ${status.tone}`}>{status.label}</span>
                          </td>
                          <td>
                            <button type="button" className="btnDetalhes" onClick={() => setRegistroDetalhe(registro)}>
                              Ver
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <footer className="tableFooter">
                <p>
                  Exibindo {inicioAtual}-{fimAtual} de {registrosFiltrados.length} registro(s)
                </p>

                <div className="tableFooterActions">
                  <label>
                    Itens por página
                    <select value={itensPorPagina} onChange={(event) => setItensPorPagina(Number(event.target.value))}>
                      {PAGE_SIZE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="paginationControls">
                    <button type="button" onClick={() => setPaginaAtual((current) => Math.max(1, current - 1))} disabled={paginaAtual === 1}>
                      <FaChevronLeft aria-hidden />
                    </button>

                    {janelaPaginacao.map((page) => (
                      <button
                        type="button"
                        key={page}
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
                      <FaChevronRight aria-hidden />
                    </button>
                  </div>
                </div>
              </footer>
            </article>
          </section>
        ) : null}
      </main>

      {registroDetalhe ? (
        <div className="modalOverlay" role="dialog" aria-modal="true">
          <button type="button" className="modalBackdrop" onClick={() => setRegistroDetalhe(null)} aria-label="Fechar" />
          <article className="modalCard">
            <header>
              <h2>Detalhes do pagamento</h2>
              <button type="button" onClick={() => setRegistroDetalhe(null)}>
                Fechar
              </button>
            </header>

            <div className="modalGrid">
              <div>
                <span>Entregador</span>
                <strong>{registroDetalhe.entregadorNome}</strong>
              </div>
              <div>
                <span>ID</span>
                <strong>{registroDetalhe.entregadorId}</strong>
              </div>
              <div>
                <span>Data</span>
                <strong>{registroDetalhe.dateLabel}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{getStatusInfo(registroDetalhe).label}</strong>
              </div>
            </div>

            <div className="modalMetrics">
              <div>
                <p>Receita</p>
                <strong>{formatMoney(registroDetalhe.ganho)}</strong>
              </div>
              <div>
                <p>Despesa</p>
                <strong>{formatMoney(registroDetalhe.despesa)}</strong>
              </div>
              <div>
                <p>Líquido</p>
                <strong className={registroDetalhe.lucro >= 0 ? "liquidoPositivo" : "liquidoNegativo"}>
                  {formatMoney(registroDetalhe.lucro)}
                </strong>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </Container>
  );
}

export default App;

