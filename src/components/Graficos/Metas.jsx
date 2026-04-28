import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Metas({ valores, darkMode = false }) {
  const hasTouchSupport = typeof window !== "undefined" && "ontouchstart" in window;
  const baseText = darkMode ? "#dbeafe" : "#0f172a";
  const mutedText = darkMode ? "#a9bfd3" : "#475569";
  const gridColor = darkMode ? "#334155" : "#dbe3ec";
  const tooltipBg = darkMode ? "rgba(15, 23, 42, 0.96)" : "rgba(255, 255, 255, 0.96)";
  const baseColor = darkMode ? "#60a5fa" : "#0369a1";
  const chartData = Array.isArray(valores)
    ? valores
        .map((valor) => [new Date(valor.data).getTime(), Number(valor.ganho) || 0])
        .filter(([timestamp]) => Number.isFinite(timestamp))
        .sort((a, b) => a[0] - b[0])
    : [];

  const options = {
    chart: {
      zooming: {
        type: "x",
      },
      backgroundColor: "transparent",
    },
    title: {
      text: "Faturamento Mensal",
      align: "left",
      style: {
        color: baseText,
      },
    },
    subtitle: {
      text: !hasTouchSupport
        ? "Clique e puxe o grafico para ampliar"
        : "Toque e arraste o grafico para ampliar",
      align: "left",
      style: {
        color: mutedText,
      },
    },
    xAxis: {
      type: "datetime",
      lineColor: gridColor,
      tickColor: gridColor,
      labels: {
        style: {
          color: mutedText,
        },
      },
    },
    yAxis: {
      gridLineColor: gridColor,
      labels: {
        style: {
          color: mutedText,
        },
      },
      title: {
        text: "Ganhos mensais",
        style: {
          color: baseText,
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      style: {
        color: baseText,
      },
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, baseColor],
            [1, Highcharts.color(baseColor).setOpacity(0).get("rgba")],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 2,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        type: "area",
        name: "Faturamento - R$",
        color: baseColor,
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
