import React, { useCallback, useEffect, useMemo, useState } from "react";
import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";
import formatarNumeroBR from "../../components/FormatarNumeroBR/FormatarNumeroBR.jsx";
import { Container } from "./faturamento.ts";
import { apiFetchJson } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { useAuth } from "../../contexts/AuthContext";
import DataState from "../DataState.jsx";

const SORT_OPTIONS = [
  { value: "data_desc", label: "Mais recentes" },
  { value: "data_asc", label: "Mais antigos" },
  { value: "receita_desc", label: "Maior receita" },
  { value: "receita_asc", label: "Menor receita" },
  { value: "liquido_desc", label: "Maior líquido" },
  { value: "nome_asc", label: "Nome (A-Z)" },
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

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "--";
  }
  return `${formatarNumeroBR(Number(value).toFixed(2))}%`;
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

function DailyRevenueChart({ points }) {
  if (!points || points.length === 0) {
    return <div className="chartFallback">Sem dados no mês selecionado para gerar tendência diária.</div>;
  }

  const width = 920;
  const height = 240;
  const padding = { top: 20, right: 18, bottom: 36, left: 50 };
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
    <svg className="trendChart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Tendência diária de faturamento">
      {yTicks.map((tick) => (
        <g key={tick.y}>
          <line x1={padding.left} y1={tick.y} x2={width - padding.right} y2={tick.y} className="gridLine" />
          <text x={8} y={tick.y + 4} className="axisLabel">
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

function MetricsCard({ title, value, hint, tone = "blue" }) {
  return (
    <article className={`metricCard ${tone}`}>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </article>
  );
}

export default function PaginaFaturamento() {
  const { userId } = useAuth();

  const [listaEntregadores, setListaEntregadores] = useState([]);
  const [listaFaturamento, setListaFaturamento] = useState([]);

  const [mesSelecionado, setMesSelecionado] = useState(getCurrentYearMonth);
  const [busca, setBusca] = useState("");
  const [filtroResultado, setFiltroResultado] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("data_desc");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);
  const [registroDetalhe, setRegistroDetalhe] = useState(null);

  const fetchFaturamentoData = useCallback(async () => {
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
      setErrorMessage(error.message || "Falha ao carregar faturamento.");
      notifyApiError(error, "Erro na requisição de dados. Tente recarregar a página.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFaturamentoData();
  }, [fetchFaturamentoData]);

  const registrosNormalizados = useMemo(() => {
    return listaFaturamento.map((item, index) => {
      const date = parseIsoDate(item.data);
      const receita = Number(item.ganho) || 0;
      const despesa = Number(item.despesa) || 0;
      const liquido = receita - despesa;

      const entregadorNome = item.entregador?.nome || "Sem entregador";
      const idCpf = item.entregador?.idCpf;
      const entregadorId = idCpf ? `#${idCpf}` : "--";
      const yearMonth = date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        : "";

      const margem = receita > 0 ? (liquido / receita) * 100 : null;

      return {
        id: `${idCpf || "na"}-${item.data || "sem-data"}-${index}`,
        date,
        yearMonth,
        dateLabel: formatDateBR(date),
        receita,
        despesa,
        liquido,
        margem,
        entregadorNome,
        entregadorId,
      };
    });
  }, [listaFaturamento]);

  const registrosMes = useMemo(() => {
    if (!mesSelecionado) {
      return registrosNormalizados;
    }
    return registrosNormalizados.filter((registro) => registro.yearMonth === mesSelecionado);
  }, [mesSelecionado, registrosNormalizados]);

  const resumoGlobal = useMemo(() => {
    const today = new Date();
    const weekBounds = getWeekBounds(today);

    let receitaHoje = 0;
    let receitaSemana = 0;

    registrosNormalizados.forEach((registro) => {
      if (!registro.date) {
        return;
      }
      if (isSameDay(registro.date, today)) {
        receitaHoje += registro.receita;
      }
      if (registro.date >= weekBounds.start && registro.date <= weekBounds.end) {
        receitaSemana += registro.receita;
      }
    });

    return { receitaHoje, receitaSemana };
  }, [registrosNormalizados]);

  const resumoMes = useMemo(() => {
    const receita = registrosMes.reduce((acc, registro) => acc + registro.receita, 0);
    const despesa = registrosMes.reduce((acc, registro) => acc + registro.despesa, 0);
    const liquido = receita - despesa;
    const ticket = registrosMes.length > 0 ? receita / registrosMes.length : 0;
    const margem = receita > 0 ? (liquido / receita) * 100 : null;

    return {
      receita,
      despesa,
      liquido,
      ticket,
      margem,
      registros: registrosMes.length,
    };
  }, [registrosMes]);

  const registrosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    const filtered = registrosMes.filter((registro) => {
      const matchBusca = !termo
        || registro.entregadorNome.toLowerCase().includes(termo)
        || registro.entregadorId.toLowerCase().includes(termo)
        || registro.dateLabel.toLowerCase().includes(termo);

      const matchResultado = filtroResultado === "todos"
        || (filtroResultado === "positivo" && registro.liquido >= 0)
        || (filtroResultado === "negativo" && registro.liquido < 0);

      return matchBusca && matchResultado;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (ordenacao) {
        case "data_asc":
          return (a.date?.getTime() || 0) - (b.date?.getTime() || 0);
        case "receita_desc":
          return b.receita - a.receita;
        case "receita_asc":
          return a.receita - b.receita;
        case "liquido_desc":
          return b.liquido - a.liquido;
        case "nome_asc":
          return a.entregadorNome.localeCompare(b.entregadorNome, "pt-BR");
        case "data_desc":
        default:
          return (b.date?.getTime() || 0) - (a.date?.getTime() || 0);
      }
    });

    return sorted;
  }, [busca, filtroResultado, ordenacao, registrosMes]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [mesSelecionado, busca, filtroResultado, ordenacao, itensPorPagina]);

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

  const tendenciaDiaria = useMemo(() => {
    const map = new Map();

    registrosMes.forEach((registro) => {
      if (!registro.date) {
        return;
      }
      const dayKey = registro.date.toISOString().slice(0, 10);
      const current = map.get(dayKey) || 0;
      map.set(dayKey, current + registro.receita);
    });

    const points = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => {
        const [year, month, day] = key.split("-");
        return {
          key,
          value,
          label: `${day}/${month}`,
          date: `${day}/${month}/${year}`,
        };
      });

    const total = points.reduce((acc, point) => acc + point.value, 0);
    const media = points.length > 0 ? total / points.length : 0;
    const melhorDia = points.length > 0
      ? points.reduce((best, point) => (point.value > best.value ? point : best), points[0])
      : null;

    return { points, total, media, melhorDia };
  }, [registrosMes]);

  const rankingEntregadores = useMemo(() => {
    const map = new Map();

    registrosMes.forEach((registro) => {
      const key = `${registro.entregadorNome}-${registro.entregadorId}`;
      const current = map.get(key) || {
        nome: registro.entregadorNome,
        id: registro.entregadorId,
        receita: 0,
        despesa: 0,
        liquido: 0,
      };
      current.receita += registro.receita;
      current.despesa += registro.despesa;
      current.liquido += registro.liquido;
      map.set(key, current);
    });

    return Array.from(map.values())
      .sort((a, b) => b.receita - a.receita)
      .slice(0, 6);
  }, [registrosMes]);

  const ultimaAtualizacaoFormatada = useMemo(() => {
    if (!ultimaAtualizacao) {
      return "--";
    }
    return ultimaAtualizacao.toLocaleTimeString("pt-BR");
  }, [ultimaAtualizacao]);

  const exportarCsv = () => {
    if (registrosFiltrados.length === 0) {
      return;
    }

    const headers = ["Data", "Entregador", "ID", "Receita", "Despesa", "Líquido", "Margem"];
    const linhas = registrosFiltrados.map((registro) => [
      registro.dateLabel,
      registro.entregadorNome,
      registro.entregadorId,
      registro.receita.toFixed(2),
      registro.despesa.toFixed(2),
      registro.liquido.toFixed(2),
      registro.margem === null ? "" : registro.margem.toFixed(2),
    ]);

    const csv = [headers, ...linhas]
      .map((line) => line.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(";"))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `faturamento-${mesSelecionado || "geral"}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Container>
      <MenuLateral pagina="Faturamento" />

      <main className="faturamentoMain">
        <div className="faturamentoGrid">
          <section className="heroCard">
            <div>
              <h1>Faturamento</h1>
              <p>
                Painel consolidado de receitas, despesas e margem por período, com filtros rápidos,
                tendência diária e exportação para análise.
              </p>
              <small>Última atualização: {ultimaAtualizacaoFormatada}</small>
            </div>

            <div className="heroActions">
              <label htmlFor="faturamentoMes">Mês de referência</label>
              <input
                id="faturamentoMes"
                type="month"
                value={mesSelecionado}
                onChange={(event) => setMesSelecionado(event.target.value)}
              />
              <button type="button" onClick={fetchFaturamentoData}>Atualizar</button>
              <button type="button" onClick={exportarCsv} disabled={registrosFiltrados.length === 0}>
                Exportar CSV
              </button>
            </div>
          </section>

          <MetricsCard
            title="Receita de hoje"
            value={formatMoney(resumoGlobal.receitaHoje)}
            hint="Somatório de ganhos no dia atual"
            tone="blue"
          />
          <MetricsCard
            title="Receita da semana"
            value={formatMoney(resumoGlobal.receitaSemana)}
            hint="Período de segunda a domingo"
            tone="teal"
          />
          <MetricsCard
            title="Receita do mês"
            value={formatMoney(resumoMes.receita)}
            hint={`${resumoMes.registros} registro(s) no mês`}
            tone="green"
          />
          <MetricsCard
            title="Despesas do mês"
            value={formatMoney(resumoMes.despesa)}
            hint="Custos acumulados no período selecionado"
            tone="orange"
          />
          <MetricsCard
            title="Líquido do mês"
            value={formatMoney(resumoMes.liquido)}
            hint={`Margem: ${formatPercent(resumoMes.margem)}`}
            tone={resumoMes.liquido >= 0 ? "green" : "red"}
          />
          <MetricsCard
            title="Ticket médio"
            value={formatMoney(resumoMes.ticket)}
            hint="Receita média por registro no mês"
            tone="purple"
          />

          <section className="panel trendPanel">
            <div className="panelHead">
              <h2>Tendência diária de receita</h2>
              <span>{mesSelecionado || "Período geral"}</span>
            </div>

            <DailyRevenueChart points={tendenciaDiaria.points} />

            <div className="trendResume">
              <p>
                Total no mês: <strong>{formatMoney(tendenciaDiaria.total)}</strong>
              </p>
              <p>
                Média por dia: <strong>{formatMoney(tendenciaDiaria.media)}</strong>
              </p>
              <p>
                Melhor dia:
                <strong>
                  {" "}
                  {tendenciaDiaria.melhorDia
                    ? `${tendenciaDiaria.melhorDia.date} (${formatMoney(tendenciaDiaria.melhorDia.value)})`
                    : "--"}
                </strong>
              </p>
            </div>
          </section>

          <section className="panel rankingPanel">
            <div className="panelHead">
              <h2>Top entregadores no mês</h2>
            </div>

            <ul className="rankingList">
              {rankingEntregadores.length === 0 ? (
                <li className="emptyLine">Sem dados para o mês selecionado.</li>
              ) : null}
              {rankingEntregadores.map((item, index) => (
                <li key={`${item.nome}-${index}`}>
                  <div>
                    <span>{index + 1}º</span>
                    <strong>{item.nome}</strong>
                    <small>{item.id}</small>
                  </div>
                  <p>{formatMoney(item.receita)}</p>
                </li>
              ))}
            </ul>

            <p className="rankingFooter">
              Entregadores ativos no sistema: <strong>{listaEntregadores.length}</strong>
            </p>
          </section>

          <section className="panel tablePanel">
            <div className="panelHead">
              <h2>Lançamentos do período</h2>
              <span>{registrosFiltrados.length} item(ns)</span>
            </div>

            <div className="filtersRow">
              <label className="searchField" htmlFor="buscaFaturamento">
                <input
                  id="buscaFaturamento"
                  type="search"
                  placeholder="Buscar por entregador, ID ou data"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                />
              </label>

              <select value={filtroResultado} onChange={(event) => setFiltroResultado(event.target.value)}>
                {RESULT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select value={ordenacao} onChange={(event) => setOrdenacao(event.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="ghost"
                onClick={() => {
                  setBusca("");
                  setFiltroResultado("todos");
                  setOrdenacao("data_desc");
                }}
              >
                Limpar filtros
              </button>
            </div>

            <DataState
              loading={loading}
              error={errorMessage}
              empty={!loading && !errorMessage && registrosNormalizados.length === 0}
              emptyMessage="Nenhum faturamento encontrado ainda."
              errorMessage="Não foi possível carregar o faturamento."
              onRetry={fetchFaturamentoData}
            />

            {!loading && !errorMessage ? (
              <>
                <div className="tableWrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Entregador</th>
                        <th>ID</th>
                        <th>Receita</th>
                        <th>Despesa</th>
                        <th>Líquido</th>
                        <th>Margem</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrosPaginados.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="emptyRow">Nenhum lançamento encontrado para os filtros aplicados.</td>
                        </tr>
                      ) : null}

                      {registrosPaginados.map((registro) => (
                        <tr key={registro.id}>
                          <td>{registro.dateLabel}</td>
                          <td>{registro.entregadorNome}</td>
                          <td>{registro.entregadorId}</td>
                          <td>{formatMoney(registro.receita)}</td>
                          <td>{formatMoney(registro.despesa)}</td>
                          <td>
                            <span className={`resultadoTag ${registro.liquido >= 0 ? "positivo" : "negativo"}`}>
                              {formatMoney(registro.liquido)}
                            </span>
                          </td>
                          <td>{formatPercent(registro.margem)}</td>
                          <td>
                            <button type="button" className="btnDetalhes" onClick={() => setRegistroDetalhe(registro)}>
                              Detalhes
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <footer className="tableFooter">
                  <label htmlFor="itensPagina">Itens por página</label>
                  <select
                    id="itensPagina"
                    value={itensPorPagina}
                    onChange={(event) => setItensPorPagina(Number(event.target.value))}
                  >
                    {PAGE_SIZE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <span>
                    Exibindo {faixaAtual} de {registrosFiltrados.length}
                  </span>

                  <div className="paginationControls">
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
              </>
            ) : null}
          </section>
        </div>
      </main>

      {registroDetalhe ? (
        <div className="detailBackdrop" role="presentation" onClick={() => setRegistroDetalhe(null)}>
          <div className="detailModal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setRegistroDetalhe(null)} aria-label="Fechar detalhes">
              ×
            </button>

            <h3>Detalhes do lançamento</h3>

            <div className="detailGrid">
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
                <span>Receita</span>
                <strong>{formatMoney(registroDetalhe.receita)}</strong>
              </div>
              <div>
                <span>Despesa</span>
                <strong>{formatMoney(registroDetalhe.despesa)}</strong>
              </div>
              <div>
                <span>Líquido</span>
                <strong className={registroDetalhe.liquido >= 0 ? "positive" : "negative"}>{formatMoney(registroDetalhe.liquido)}</strong>
              </div>
              <div>
                <span>Margem</span>
                <strong>{formatPercent(registroDetalhe.margem)}</strong>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Container>
  );
}
