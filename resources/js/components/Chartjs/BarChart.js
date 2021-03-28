import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

export default function BarChart(props) {
    const chartRef = useRef(null);

    function cycleColour(index) {
        return index > 5 ? index % 6 : index;
    }

    useEffect(() => {
        const ctx = chartRef.current;
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: props.labels,
                datasets: [
                    {
                        label: props.label,
                        data: props.data,
                        fill: false,
                        borderWidth: 1,
                        borderColor: "#718096",
                        backgroundColor: props.colour,
                        barThickness: props.barThickness || "flex"
                    }
                ]
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
                                fontColor: "#718096"
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
    }, [props]);

    return (
        <>
            <canvas ref={chartRef} />
        </>
    );
}
