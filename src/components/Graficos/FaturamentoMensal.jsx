import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function FaturamentoMensal({ darkMode = false }) {
  const baseText = darkMode ? "#dbeafe" : "#0f172a";
  const mutedText = darkMode ? "#a9bfd3" : "#475569";
  const gridColor = darkMode ? "#334155" : "#dbe3ec";
  const tooltipBg = darkMode ? "rgba(15, 23, 42, 0.96)" : "rgba(255, 255, 255, 0.96)";
  const categories = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      categories,
      lineColor: gridColor,
      labels: {
        style: {
          color: mutedText,
        },
      },
    },
    yAxis: {
      min: 0,
      gridLineColor: gridColor,
      labels: {
        style: {
          color: mutedText,
        },
      },
      title: {
        text: "Faturamento",
        style: {
          color: baseText,
        },
      },
    },
    legend: {
      itemStyle: {
        color: baseText,
      },
    },
    tooltip: {
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      style: {
        color: baseText,
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Faturado R$",
        color: darkMode ? "#60a5fa" : "#0369a1",
        data: [12000, 45000, 30000, 400, 25000, 15000, 11000],
      },
      {
        name: "Meta R$",
        color: darkMode ? "#22c55e" : "#16a34a",
        data: [12000, 45000, 30000, 400, 25000, 12000, 5000],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
