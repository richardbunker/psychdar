import React from "react";
import BarChart from "../../../Chartjs/BarChart";
import { mean, median } from "../../../Stats/Stats";

export default function MedianMeanPerClient(props) {
    const totalConsultations = props.clinician.clients.flatMap(client => {
        let total = 0;
        client.treatments.map(treatment => {
            total = total + treatment.consultation_count;
        });
        return total;
    });

    const meanConsultations = mean(totalConsultations).toFixed(2);

    const medianConsultations = median(totalConsultations);

    return (
        <div style={props.width} className="bg-white rounded p-2">
            <div className="w-full text-base font-semibold text-gray-400 uppercase">
                Median/Mean Consultations Per Client
            </div>
            <div>
                <BarChart
                    labels={["Median", "Mean"]}
                    data={[medianConsultations, meanConsultations]}
                    colour="#C7D2FE"
                    barThickness="100"
                    yAxisLabel="Consultations"
                    xAxisLabel={props.clinician.name}
                />
            </div>
        </div>
    );
}
