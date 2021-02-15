import React from "react";
import BarChart from "../../../Chartjs/BarChart";
import { mean, median } from "../../../Stats/Stats";

export default function ClinicianMedianMeanPerTreatmentEpisode(props) {
    const totalConsultations = props.clinician.clients.flatMap(client => {
        return client.treatments.map(treatment => {
            return treatment.consultation_count;
        });
    });

    const meanConsultations = mean(totalConsultations).toFixed(2);

    const medianConsultations = median(totalConsultations);

    return (
        <div style={props.width} className="bg-white rounded p-2">
            <div className="w-full text-base font-semibold text-gray-400 uppercase">
                Median/Mean Consultations Per Treatment Episode
            </div>
            <div>
                <BarChart
                    labels={["Median", "Mean"]}
                    data={[medianConsultations, meanConsultations]}
                    colour="#FBCFE8"
                    barThickness="100"
                    yAxisLabel="Consultations"
                    xAxisLabel={props.clinician.name}
                />
            </div>
        </div>
    );
}
