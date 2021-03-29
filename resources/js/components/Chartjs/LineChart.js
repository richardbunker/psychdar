import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

export default function LineChart(props) {
    const chartRef = useRef();

    function cycleColour(index) {
        return index > 5 ? index % 6 : index;
    }

    useEffect(() => {
        const ctx = chartRef.current;
        const lineChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: props.labels,
                datasets: [...props.data]
            },
            options: {
                animation: {
                    duration: 0
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                zeroLineColor: "#718096"
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: "#718096",
                                suggestedMin: props.suggestedMin || "",
                                suggestedMax: props.suggestedMax || ""
                            }
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                zeroLineColor: "#718096"
                            },
                            ticks: {
                                fontColor: "#718096"
                            }
                        }
                    ]
                },
                layout: {
                    padding: {
                        left: 15,
                        right: 15,
                        top: 15,
                        bottom: 5
                    }
                },
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        padding: 10,
                        fontSize: 12,
                        boxWidth: 14,
                        fontColor: "#718096"
                    }
                }
            }
        });
        return () => {
            lineChart.destroy();
        };
    });

    return <canvas ref={chartRef} />;
}
