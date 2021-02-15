import React from "react";
import { frequency } from "../../../Stats/Stats";
import BarChart from "../../../Chartjs/BarChart";

export default function ConsultationSpreadPerClient(props) {
    const totalPerClient = props.clinicians.flatMap(clinician => {
        return clinician.clients.map(client => {
            let total = 0;
            client.treatments.map(treatment => {
                total = total + treatment.consultation_count;
            });
            return total;
        });
    });

    const frequencyOfTotalConsultations = totalPerClient.reduce(frequency, {});

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
        <div style={props.width} className="bg-white rounded p-2">
            <div className="w-full text-base font-semibold text-gray-400 uppercase">
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
