import React from "react";
import { median, mean } from "../../../Stats/Stats";
import MixedChart from "../../../Chartjs/MixedChart";

export default function MedianMeanSessionsPerTreatmentEpisode(props) {
    const coloursPink = [
        // "#CCFBF1",
        "#99F6E4",
        "#5EEAD4",
        "#2DD4BF",
        "#14B8A6",
        "#0D9488"
    ];

    const coloursIndigo = [
        // "#CFFAFE",
        "#A5F3FC",
        "#67E8F9",
        "#22D3EE",
        "#06B6D4",
        "#0891B2"
    ];

    const clinicianFirstNames = props.clinicians.map(clinician => {
        return clinician.first_name;
    });

    const medianPerClinician = props.clinicians.flatMap(clinician => {
        const totalPerClinician = clinician.clients.flatMap(client => {
            return client.treatments.map(treatment => {
                return treatment.consultation_count;
            });
        });
        return median(totalPerClinician);
    });

    const meanPerClinician = props.clinicians.flatMap(clinician => {
        const totalPerClinician = clinician.clients.flatMap(client => {
            return client.treatments.map(treatment => {
                return treatment.consultation_count;
            });
        });
        return mean(totalPerClinician).toFixed(2);
    });

    return (
        <div style={props.width} className="bg-white rounded p-2">
            <div className="w-full text-base font-semibold text-gray-400 uppercase">
                Median/Mean Consultations Per Treatment Episode
            </div>
            <div>
                <MixedChart
                    labels={clinicianFirstNames}
                    dataset1Label={"Median"}
                    dataset1Data={medianPerClinician}
                    dataset1Colour="#FDF2F8"
                    dataset2Label={"Mean"}
                    dataset2Data={meanPerClinician}
                    dataset2Colour="#FBCFE8"
                    dataset2Type="bar"
                />
            </div>
        </div>
    );
}
