

// Chart styling
const options = {
    maintainAspectRatio: false,
    // Add plugin to display numbers at every data point
    plugins: {
        datalabels: {
            display: true,
            color: '#555555',
            align: 'top',
            offset: 10,
            font: { size: 15 },
            padding: 10,
            // Add % sign to numbers
            formatter: (val) => {
                return val + ' %';
            }
        }
    },
    title: {
        display: false,
    },
    legend: {
        display: false,
    },
    layout: {
        padding: {
            left: 20,
            right: 20,
            top: 50,
            bottom: 50
        }
    },
    scales: {
        yAxes: [
            {
                ticks: { display: false },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }
        ],
        xAxes: [
            {
                gridLines: {
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: false
                }
            },
        ]
    }
};


export default options;