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
                        label: props.dataset1Label,
                        data: props.dataset1Data,
                        fill: false,
                        borderWidth: 1,
                        borderColor: "#718096",
                        backgroundColor: props.dataset1Colour,
                        order: 0
                    },
                    {
                        label: props.dataset2Label,
                        data: props.dataset2Data,
                        type: props.dataset2Type,
                        fill: false,
                        pointRadius: 5,
                        borderWidth: 1,
                        borderColor: "#718096",
                        backgroundColor: props.dataset2Colour,
                        lineTension: 0.3,
                        order: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                drawOnChartArea: false,
                                color: "#718096",
                                zeroLineColor: "#718096"
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: "#718096"
                            }
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                drawOnChartArea: false,
                                color: "#718096",
                                zeroLineColor: "#718096"
                            },
                            ticks: {
                                fontColor: "#718096",
                                beginAtZero: true
                            }
                        }
                    ]
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 0
                    }
                },
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        padding: 10,
                        fontSize: 12,
                        boxWidth: 14,
                        fontColor: "#718096"
                    }
                }
            }
        });
    }, []);

    return (
        <>
            <canvas ref={chartRef} />
        </>
    );
}
