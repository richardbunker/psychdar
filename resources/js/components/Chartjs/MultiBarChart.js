import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

export default function MultiBarChart(props) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current;
        const multiBarChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: props.labels,
                datasets: [...props.dataSets]
            },
            options: {
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
                            },
                            scaleLabel: {
                                display: true,
                                labelString: props.yAxisLabel || ""
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
                            },
                            scaleLabel: {
                                display: true,
                                labelString: props.xAxisLabel || ""
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
                    display: false,
                    position: "bottom",
                    labels: {
                        padding: 10,
                        fontSize: 12,
                        boxWidth: 14,
                        fontColor: "#718096"
                    }
                },
                animation: {
                    duration: 0
                }
            }
        });
        return () => {
            multiBarChart.destroy();
        };
    }, [props]);

    return (
        <>
            <canvas ref={chartRef} />
        </>
    );
}
