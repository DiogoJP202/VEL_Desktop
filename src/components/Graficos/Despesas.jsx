import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function Despesas({ valorDespesa, valorGanho, darkMode = false }) {
    const despesa = Number(valorDespesa) || 0;
    const ganho = Number(valorGanho) || 0;
    const total = despesa + ganho;
    const percentualDespesa = total > 0 ? (despesa / total) * 100 : 0;
    const titleColor = darkMode ? '#e2e8f0' : '#0f172a';
    const tooltipBg = darkMode ? 'rgba(15, 23, 42, 0.96)' : 'rgba(255, 255, 255, 0.96)';
    const tooltipColor = darkMode ? '#e2e8f0' : '#0f172a';

    const options = {
        chart: {
            backgroundColor: 'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: `${percentualDespesa.toFixed(2)}%`,
            align: 'center',
            verticalAlign: 'middle',
            y: 60,
            style: {
                color: titleColor,
                fontSize: '1.1em',
                fontWeight: '700'
            }
        },
        colors: darkMode ? ['#fb923c', '#34d399'] : ['#ea580c', '#0ea05f'],
        tooltip: {
            backgroundColor: tooltipBg,
            borderColor: darkMode ? '#334155' : '#cbd5e1',
            style: {
                color: tooltipColor
            },
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: titleColor,
                fontWeight: '600'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Porcentagem',
            innerSize: '50%',
            data: [
                ['Gastos', despesa],
                ['Ganhos', ganho]
            ]
        }]
    }
      
    return( <HighchartsReact highcharts={Highcharts} options={options} /> );
};
