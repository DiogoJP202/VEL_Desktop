import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { FaChartLine, FaHelmetSafety, FaMoneyBillTrendUp, FaRotate } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import formatarNumeroBR from "../../components/FormatarNumeroBR/FormatarNumeroBR.jsx";
import { Container } from "./dashboard.ts";
import GlobalStyle from "../../components/globalStyles";
import { apiFetchJson } from "../../services/httpClient";
import { notifyApiError } from "../../services/uiFeedback";
import { useAuth } from "../../contexts/AuthContext";
import LoadingScreen from "../../components/LoadingScreen.jsx";
import DataState from "../../components/DataState.jsx";
import { setPageSeo } from "../../utils/seo";

const Despesas = lazy(() => import("../../components/Graficos/Despesas"));
const FaturamentoMensal = lazy(() => import("../../components/Graficos/FaturamentoMensal"));
const Metas = lazy(() => import("../../components/Graficos/Metas"));
const THEME_STORAGE_KEY = "vel:settings:v1";

function getIsDarkMode() {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed.darkMode === "boolean") {
      return parsed.darkMode;
    }
  } catch {
    // sem acao
  }
  return document.body.classList.contains("vel-dark-mode");
}

const PERIODS = [
  { id: "today", label: "Hoje" },
  { id: "week", label: "Esta semana" },
  { id: "month", label: "Este mês" },
  { id: "all", label: "Todo período" },
];

function parseIsoDate(input) {
  if (!input || typeof input !== "string") {
    return null;
  }
  const normalized = input.includes("T") ? input : `${input}T00:00:00`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getWeekBounds(referenceDate) {
  const day = referenceDate.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(referenceDate);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + diffToMonday);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function isInPeriod(date, period) {
  const now = new Date();
  if (period === "all") {
    return true;
  }
  if (period === "today") {
    return isSameDay(date, now);
  }
  if (period === "month") {
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }
  const { start, end } = getWeekBounds(now);
  return date >= start && date <= end;
}

function getStatusInfo(entregadores = []) {
  const online = entregadores.filter((item) => Boolean(item.status)).length;
  const total = entregadores.length;
  return {
    total,
    online,
    offline: Math.max(total - online, 0),
    availability: total > 0 ? Math.round((online / total) * 100) : 0,
  };
}

function InsightCard({ title, value, hint, icon, tone = "blue" }) {
  return (
    <article className={`insightCard ${tone}`}>
      <header>
        <p>{title}</p>
        <span className="insightIcon">{icon}</span>
      </header>
      <strong>{value}</strong>
      <small>{hint}</small>
    </article>
  );
}

function App() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [listaEntregadores, setListaEntregadores] = useState([]);
  const [listaFaturamento, setListaFaturamento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode);

  useEffect(() => {
    setPageSeo({
      title: "Dashboard — VEL",
      description: "Acompanhe faturamento, custos e desempenho da operação em tempo real.",
      htmlLang: "pt-BR",
    });
  }, []);

  const fetchDashboardData = useCallback(async () => {
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
    } catch (error) {
      setErrorMessage(error.message || "Falha ao carregar o dashboard.");
      notifyApiError(error, "Erro na requisição de dados. Tente recarregar a página.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const syncTheme = () => setIsDarkMode(getIsDarkMode());
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("storage", syncTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const faturamentoFiltrado = useMemo(() => {
    return listaFaturamento.filter((item) => {
      const date = parseIsoDate(item.data);
      if (!date) {
        return false;
      }
      return isInPeriod(date, selectedPeriod);
    });
  }, [listaFaturamento, selectedPeriod]);

  const metrics = useMemo(() => {
    const summary = faturamentoFiltrado.reduce(
      (acc, item) => {
        const ganho = Number(item.ganho) || 0;
        const despesa = Number(item.despesa) || 0;
        acc.ganho += ganho;
        acc.despesa += despesa;
        acc.lucro += ganho - despesa;
        acc.registros += 1;
        return acc;
      },
      { ganho: 0, despesa: 0, lucro: 0, registros: 0 },
    );
    const ticket = summary.registros > 0 ? summary.ganho / summary.registros : 0;
    return { ...summary, ticket };
  }, [faturamentoFiltrado]);

  const statusInfo = useMemo(() => getStatusInfo(listaEntregadores), [listaEntregadores]);

  const rankingDias = useMemo(() => {
    const byDate = new Map();
    listaFaturamento.forEach((item) => {
      const dt = parseIsoDate(item.data);
      if (!dt) {
        return;
      }
      const key = dt.toISOString().slice(0, 10);
      const current = byDate.get(key) || { ganho: 0, despesa: 0 };
      current.ganho += Number(item.ganho) || 0;
      current.despesa += Number(item.despesa) || 0;
      byDate.set(key, current);
    });
    return [...byDate.entries()]
      .map(([date, value]) => ({
        date,
        ganho: value.ganho,
        despesa: value.despesa,
        lucro: value.ganho - value.despesa,
      }))
      .sort((a, b) => b.ganho - a.ganho)
      .slice(0, 5);
  }, [listaFaturamento]);

  const topDia = rankingDias[0];
  const chartFallback = <LoadingScreen compact label="Carregando gráfico..." />;
  const emptyDashboard = !loading && !errorMessage && listaEntregadores.length === 0 && listaFaturamento.length === 0;

  return (
    <Container>
      <GlobalStyle />
      <MenuLateral pagina="Dashboard" />

      <main className="dashboardMain">
        <DataState
          loading={loading}
          error={errorMessage}
          empty={emptyDashboard}
          emptyMessage="Ainda não há dados suficientes para montar o dashboard."
          errorMessage="Não foi possível carregar o dashboard."
          onRetry={fetchDashboardData}
        />

        {!loading && !errorMessage ? (
          <section className="dashboardGrid">
            <header className="heroCard">
              <div>
                <h1>Dashboard Operacional</h1>
                <p>Visão consolidada da receita, dos custos e da disponibilidade da equipe de entregas.</p>
              </div>
              <div className="heroActions">
                <div className="periodSwitch" role="group" aria-label="Período de análise">
                  {PERIODS.map((period) => (
                    <button
                      key={period.id}
                      type="button"
                      className={selectedPeriod === period.id ? "periodBtn active" : "periodBtn"}
                      onClick={() => setSelectedPeriod(period.id)}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
                <button type="button" className="refreshBtn" onClick={fetchDashboardData}>
                  <FaRotate aria-hidden />
                  Atualizar
                </button>
              </div>
            </header>

            <InsightCard
              title="Faturamento"
              value={`R$ ${formatarNumeroBR(metrics.ganho)}`}
              hint={`${metrics.registros} registro(s) no período`}
              icon={<FaMoneyBillTrendUp aria-hidden />}
              tone="green"
            />
            <InsightCard
              title="Despesas"
              value={`R$ ${formatarNumeroBR(metrics.despesa)}`}
              hint={`Margem atual: ${metrics.ganho > 0 ? Math.round((metrics.lucro / metrics.ganho) * 100) : 0}%`}
              icon={<FaChartLine aria-hidden />}
              tone="orange"
            />
            <InsightCard
              title="Lucro estimado"
              value={`R$ ${formatarNumeroBR(metrics.lucro)}`}
              hint={`Ticket médio: R$ ${formatarNumeroBR(metrics.ticket)}`}
              icon={<FaChartLine aria-hidden />}
              tone="blue"
            />
            <InsightCard
              title="Entregadores"
              value={`${statusInfo.online}/${statusInfo.total}`}
              hint={`${statusInfo.availability}% disponíveis agora`}
              icon={<FaHelmetSafety aria-hidden />}
              tone="purple"
            />

            <article className="panel panelLarge">
              <div className="panelHead">
                <h2>Faturamento semanal vs meta</h2>
                <button type="button" onClick={() => navigate("/faturamento")}>
                  Ver faturamento detalhado
                </button>
              </div>
              <Suspense fallback={chartFallback}>
                <FaturamentoMensal darkMode={isDarkMode} />
              </Suspense>
            </article>

            <article className="panel panelCompact">
              <div className="panelHead">
                <h2>Distribuição de custos</h2>
              </div>
              <p className="valueHighlight">R$ {formatarNumeroBR(metrics.despesa)}</p>
              <Suspense fallback={chartFallback}>
                <Despesas valorDespesa={metrics.despesa} valorGanho={metrics.ganho} darkMode={isDarkMode} />
              </Suspense>
            </article>

            <article className="panel panelWide">
              <div className="panelHead">
                <h2>Tendência de faturamento</h2>
              </div>
              <Suspense fallback={chartFallback}>
                <Metas valores={listaFaturamento} darkMode={isDarkMode} />
              </Suspense>
            </article>

            <article className="panel rankingPanel">
              <div className="panelHead">
                <h2>Top 5 dias de receita</h2>
              </div>
              {topDia ? <p className="rankingHint">Melhor dia: {topDia.date} com R$ {formatarNumeroBR(topDia.ganho)}</p> : null}
              <ul className="rankingList">
                {rankingDias.length === 0 ? <li>Nenhum dado de faturamento ainda.</li> : null}
                {rankingDias.map((dia) => (
                  <li key={dia.date}>
                    <div>
                      <strong>{dia.date}</strong>
                      <small>Lucro: R$ {formatarNumeroBR(dia.lucro)}</small>
                    </div>
                    <span>R$ {formatarNumeroBR(dia.ganho)}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="panel statusPanel">
              <div className="panelHead">
                <h2>Status dos entregadores</h2>
                <button type="button" onClick={() => navigate("/entregadores")}>
                  Gerir entregadores
                </button>
              </div>
              <ul className="statusList">
                {listaEntregadores.map((entregador) => (
                  <li key={entregador.idCpf} className={entregador.status ? "online" : "offline"}>
                    <div>
                      <strong>{entregador.nome}</strong>
                      <small>ID: #{entregador.idCpf}</small>
                    </div>
                    <span>{entregador.status ? "Online" : "Offline"}</span>
                  </li>
                ))}
                {listaEntregadores.length === 0 ? <li className="emptyLine">Nenhum entregador cadastrado.</li> : null}
              </ul>
            </article>
          </section>
        ) : null}
      </main>
    </Container>
  );
}

export default App;
