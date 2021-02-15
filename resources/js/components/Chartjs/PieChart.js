import React, { useRef, useEffect } from "react"
import Chart from "chart.js"

export default function PieChart(props) {
        
    const chartRef = useRef();

        const cycleColour = index => {
            return index > 5 ? index % 6 : index;
        }

        useEffect(() => {
            const ctx = chartRef.current;
            new Chart(ctx, {
                type: "pie",
                data: {
                    labels: props.labels,
                    datasets: [
                        {
                            label: "",
                            data: props.data,
                            borderColor: "#fff",
                            borderWidth: 1,
                            backgroundColor: function(context) {
                                var index = context.dataIndex;
                                return props.colours[cycleColour(index)];
                            }
                        }
                    ]
                },
                options: {
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 10,
                            bottom: 0
                        }
                    },
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 20,
                            fontSize: 12,
                            boxWidth: 14,
                            fontColor: "#718096"
                        }
                    }
                }
            });
        }, []);

        return  (
            <canvas ref={chartRef} />
        );
}