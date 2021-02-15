import React, { useRef, useEffect } from "react";
import Chart from "chart.js";

export default function HorzBarChart(props) {
    const chartRef = useRef(null);

    function cycleColour(index) {
        return index > 5 ? index % 6 : index;
    }

    // const clinicianFirstNames = props.clinicians.map(clinician => {
    //     return clinician.first_name;
    // });

    // const clinicianClientCount = props.clinicians.map(clinician => {
    //     return clinician.clients.length;
    // });

    useEffect(() => {
        const ctx = chartRef.current;
        new Chart(
            ctx, {
            type: "horizontalBar",
            data: {
                labels: props.labels,
                datasets: [
                    {
                        label: props.label,
                        data: props.data,
                        fill: false,
                        borderWidth: 1,
                        borderColor: "#718096",
                        backgroundColor: function(context) {
                            var index = context.dataIndex;
                            return props.colours[cycleColour(index)];
                        }
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
                    display: false,
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
    }, []);

    return (
        <>
            <canvas ref={chartRef} />
        </>
    );
}
