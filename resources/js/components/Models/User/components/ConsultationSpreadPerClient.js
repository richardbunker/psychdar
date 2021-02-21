import React from "react";
import BarChart from "../../../Chartjs/BarChart";
import { frequency } from "../../../Stats/Stats";

export default function ConsultationSpreadPerClient(props) {
    const totalConsultations = props.clinician.clients.flatMap(client => {
        let total = 0;
        client.treatments.map(treatment => {
            total = total + treatment.consultation_count;
        });
        return total;
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
                Consultation Spread Per Client
            </div>
            <div>
                <BarChart
                    colour="#C7D2FE"
                    xAxisLabel="Consultation Length (Per Client)"
                    yAxisLabel="Percentage Used (%)"
                    label={"Percentage Used (%)"}
                    labels={Object.keys(frequencyOfTotalConsultations)}
                    data={Object.values(freqPercentage)}
                />
            </div>
        </div>
    );
}
