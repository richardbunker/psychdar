import React from "react";
import { frequency } from "../../../Stats/Stats";
import BarChart from "../../../Chartjs/BarChart";

export default function ConsultationSpreadPerTreatmentEpisode(props) {
    const totalConsultations = props.clinician.clients.flatMap(client => {
        return client.treatments.map(treatment => {
            return treatment.consultation_count;
        });
    });

    const frequencyOfTotalConsultations = totalConsultations.reduce(
        frequency,
        {}
    );

    const freqPercentage = Object.keys(frequencyOfTotalConsultations).map(
        (key, index) => {
            return (
                (frequencyOfTotalConsultations[key] /
                    Object.keys(frequencyOfTotalConsultations).length) *
                100
            ).toFixed(2);
        }
    );

    return (
        <div style={props.width} className="bg-white py-4">
            <div className="w-full text-lg text-gray-600 text-center">
                Consultation Spread Per Treatment Episode
            </div>
            <div>
                <BarChart
                    colour="#FBCFE8"
                    xAxisLabel="Consultation Length (Per Treatment Episode)"
                    yAxisLabel="Percentage Used (%)"
                    label={"Percentage Used (%)"}
                    labels={Object.keys(frequencyOfTotalConsultations)}
                    data={Object.values(freqPercentage)}
                />
            </div>
        </div>
    );
}
